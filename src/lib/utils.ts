import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind CSSクラス名をマージするユーティリティ
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// 日付フォーマット
export function formatDate(date: string | Date): string {
	const d = new Date(date);
	return d.toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

// 相対時間フォーマット
export function formatRelativeTime(date: string | Date): string {
	const d = new Date(date);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

	if (diffInSeconds < 60) return "たった今";
	if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分前`;
	if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}時間前`;
	if (diffInSeconds < 2592000)
		return `${Math.floor(diffInSeconds / 86400)}日前`;

	return formatDate(date);
}

// 文字列の省略
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength) + "...";
}

// デバイス判定
export function isMobile(): boolean {
	if (typeof window === "undefined") return false;
	return window.innerWidth < 768;
}

export function isIOS(): boolean {
	if (typeof navigator === "undefined") return false;
	return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

// スクロール制御
export function scrollToTop(): void {
	window.scrollTo({ top: 0, behavior: "smooth" });
}

export function scrollToElement(
	element: HTMLElement,
	offset: number = 0
): void {
	const elementPosition = element.offsetTop - offset;

	if (isIOS()) {
		window.scrollTo(0, elementPosition);
	} else {
		window.scrollTo({ top: elementPosition, behavior: "smooth" });
	}
}
