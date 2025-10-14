import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwindクラスを安全にマージ */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/** Date生成のヘルパー（無効値を弾く） */
function toDate(input: string | number | Date): Date | null {
	const d = input instanceof Date ? new Date(input) : new Date(input);
	return isNaN(d.getTime()) ? null : d;
}

/** 日付フォーマット（ja-JP / 年月日） */
export function formatDate(date: string | number | Date): string {
	const d = toDate(date);
	if (!d) return "";
	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(d);
}

/** 相対時間（たった今/◯分前/◯時間前/◯日前/◯か月前/◯年前）未来も対応 */
export function formatRelativeTime(date: string | number | Date): string {
	const d = toDate(date);
	if (!d) return "";
	const now = new Date();
	const diffSec = Math.round((d.getTime() - now.getTime()) / 1000); // 未来だと正の値
	const rtf = new Intl.RelativeTimeFormat("ja-JP", { numeric: "auto" });

	const abs = Math.abs(diffSec);
	if (abs < 45)
		return rtf.format(Math.sign(diffSec) * Math.round(diffSec), "second");
	const diffMin = Math.round(diffSec / 60);
	if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute");
	const diffHour = Math.round(diffSec / 3600);
	if (Math.abs(diffHour) < 24) return rtf.format(diffHour, "hour");
	const diffDay = Math.round(diffSec / 86400);
	if (Math.abs(diffDay) < 30) return rtf.format(diffDay, "day");
	const diffMonth = Math.round(diffSec / 2592000); // 30日ざっくり
	if (Math.abs(diffMonth) < 12) return rtf.format(diffMonth, "month");
	const diffYear = Math.round(diffSec / 31536000);
	return rtf.format(diffYear, "year");
}

/** 文字列の省略（絵文字/結合文字を壊さない） */
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;

	// Intl.Segmenter があれば書記素単位で切る
	// @ts-expect-error: Edge 古め等で型がない場合に備える
	if (typeof Intl !== "undefined" && (Intl as unknown).Segmenter) {
		const seg = new Intl.Segmenter("ja", { granularity: "grapheme" });
		const units = Array.from(
			seg.segment(text),
			(s: { segment: string }) => s.segment
		);
		const sliced = units.slice(0, maxLength).join("");
		return sliced + "…";
	}

	// フォールバック: コードポイント単位
	const units = Array.from(text); // サロゲートペア対応
	if (units.length <= maxLength) return text;
	return units.slice(0, maxLength).join("") + "…";
}

/** デバイス判定（SSR安全・メディアクエリ優先） */
export function isMobile(): boolean {
	if (typeof window === "undefined" || typeof window.matchMedia === "undefined")
		return false;
	// Tailwindのmd:768pxに合わせる
	return window.matchMedia("(max-width: 767.98px)").matches;
}

/** iOS判定（iPadOSデスクトップUAにも対応気味） */
export function isIOS(): boolean {
	if (typeof navigator === "undefined") return false;
	const ua = navigator.userAgent || "";
	const platform = (navigator as { platform?: string }).platform || "";
	const touchCapable =
		typeof navigator !== "undefined" &&
		("maxTouchPoints" in navigator
			? navigator.maxTouchPoints > 0
			: "ontouchstart" in window);

	const isClassicIOS = /iPad|iPhone|iPod/.test(ua);
	const isIPadOS13Plus = /Mac/.test(platform) && touchCapable; // iPadOSがMacと名乗るケース
	return isClassicIOS || isIPadOS13Plus;
}

/** ページトップへ（スムース対応） */
export function scrollToTop(): void {
	if (typeof window === "undefined") return;
	window.scrollTo({ top: 0, behavior: "smooth" });
}

/** 要素までスクロール（レイアウトに依存しない計算） */
export function scrollToElement(element: HTMLElement, offset = 0): void {
	if (typeof window === "undefined" || !element) return;
	const rect = element.getBoundingClientRect();
	const absoluteTop = rect.top + window.pageYOffset - offset;
	window.scrollTo({ top: absoluteTop, behavior: "smooth" });
}
