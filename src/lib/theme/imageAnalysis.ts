/**
 * 画像解析とオーバーレイ調整ユーティリティ
 *
 * 背景画像の輝度・コントラストを解析し、
 * ライト・ダークモード両方の最適なオーバーレイα値を計算
 */

import { STORAGE_KEYS, COOKIE_KEYS } from "@/config/constants";

/**
 * 画像解析結果の型定義
 */
export interface ImageAnalysisResult {
	/** 平均輝度 (0-1) */
	averageLuminance: number;
	/** コントラスト (0-1) */
	contrast: number;
	/** ライトモード用最適α値 */
	overlayAlphaLight: number;
	/** ダークモード用最適α値 */
	overlayAlphaDark: number;
	/** ライトモード用ブレンドモード */
	blendModeLight: "normal" | "screen";
	/** ダークモード用ブレンドモード */
	blendModeDark: "normal" | "multiply";
}

/**
 * 解析結果のメモ化キャッシュ
 * 同じ画像URLに対する再解析を防止
 */
const analysisCache = new Map<string, ImageAnalysisResult>();

/**
 * 数値を指定範囲内にクランプ
 */
function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value));
}

/**
 * RGB値を線形輝度に変換（sRGB → 線形RGB）
 * W3C相対輝度計算用のガンマ補正
 *
 * @param value - RGB値 (0-255)
 * @returns 線形RGB値 (0-1)
 */
function rgbToLinear(value: number): number {
	const normalized = value / 255;
	return normalized <= 0.03928
		? normalized / 12.92
		: Math.pow((normalized + 0.055) / 1.055, 2.4);
}

/**
 * 相対輝度を計算（Y = 0.2126*R + 0.7152*G + 0.0722*B）
 * W3C WCAG 2.0準拠の計算式
 *
 * @param r - 赤成分 (0-255)
 * @param g - 緑成分 (0-255)
 * @param b - 青成分 (0-255)
 * @returns 相対輝度 (0-1)
 */
function calculateLuminance(r: number, g: number, b: number): number {
	const linearR = rgbToLinear(r);
	const linearG = rgbToLinear(g);
	const linearB = rgbToLinear(b);

	return 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
}

/**
 * 画像を低解像度で解析し、輝度・コントラストを取得
 * メモ化により同じURLの再解析を防止
 * CORS/tainted canvas対策でエラー時は既定値で継続
 *
 * @param imageUrl - 解析対象の画像URL（Data URLまたは通常URL）
 * @returns 画像解析結果
 */
export async function analyzeImage(
	imageUrl: string
): Promise<ImageAnalysisResult> {
	// キャッシュチェック
	if (analysisCache.has(imageUrl)) {
		return analysisCache.get(imageUrl)!;
	}

	return new Promise((resolve) => {
		const img = new Image();

		// CORS対応
		if (!imageUrl.startsWith("data:")) {
			img.crossOrigin = "anonymous";
		}

		/**
		 * フォールバック用の既定値で解決
		 * CORS/tainted canvas等のエラー時に使用
		 */
		const safeResolve = (fallback?: Partial<ImageAnalysisResult>) => {
			const result: ImageAnalysisResult = {
				averageLuminance: fallback?.averageLuminance ?? 0.5,
				contrast: fallback?.contrast ?? 0.12,
				overlayAlphaLight: fallback?.overlayAlphaLight ?? 0.35,
				overlayAlphaDark: fallback?.overlayAlphaDark ?? 0.45,
				blendModeLight: fallback?.blendModeLight ?? "normal",
				blendModeDark: fallback?.blendModeDark ?? "normal",
			};
			analysisCache.set(imageUrl, result);
			resolve(result);
		};

		img.onload = () => {
			try {
				// 低解像度キャンバスで高速解析
				const ANALYSIS_SIZE = 32;
				const canvas = document.createElement("canvas");
				canvas.width = ANALYSIS_SIZE;
				canvas.height = ANALYSIS_SIZE;

				const ctx = canvas.getContext("2d");
				if (!ctx) {
					throw new Error("Canvas context not available");
				}

				// 画像を32x32にリサイズして描画
				ctx.drawImage(img, 0, 0, ANALYSIS_SIZE, ANALYSIS_SIZE);
				const imageData = ctx.getImageData(0, 0, ANALYSIS_SIZE, ANALYSIS_SIZE);
				const { data } = imageData;

				// 各ピクセルの輝度を計算
				const pixelCount = ANALYSIS_SIZE * ANALYSIS_SIZE;
				let sum = 0;
				let sum2 = 0;

				for (let i = 0; i < data.length; i += 4) {
					const r = data[i];
					const g = data[i + 1];
					const b = data[i + 2];
					// アルファチャンネル（data[i + 3]）は今回は使用しない

					const luminance = calculateLuminance(r, g, b);
					sum += luminance;
					sum2 += luminance * luminance;
				}

				// 平均輝度を計算
				const averageLuminance = sum / pixelCount;

				// 輝度の分散を計算（コントラスト指標）
				const variance = Math.max(
					0,
					sum2 / pixelCount - averageLuminance * averageLuminance
				);
				const contrast = Math.sqrt(variance);

				// 最適なオーバーレイα値を計算
				const tuned = calculateOptimalOverlay(averageLuminance, contrast);

				const result: ImageAnalysisResult = {
					averageLuminance,
					contrast,
					overlayAlphaLight: tuned.overlayAlphaLight,
					overlayAlphaDark: tuned.overlayAlphaDark,
					blendModeLight: tuned.blendModeLight,
					blendModeDark: tuned.blendModeDark,
				};

				// キャッシュに保存
				analysisCache.set(imageUrl, result);
				resolve(result);
			} catch (error) {
				// CORS/tainted canvas等のエラー時は既定値で継続
				console.warn("画像解析でエラー、既定値を使用:", error);
				safeResolve();
			}
		};

		img.onerror = () => {
			// 画像読み込み失敗時も既定値で継続
			console.warn("画像読み込み失敗、既定値を使用");
			safeResolve();
		};

		img.src = imageUrl;
	});
}

/**
 * 輝度・コントラスト情報から最適なオーバーレイ設定を計算
 * テーマ別のブレンドモードを個別に決定
 *
 * @param averageLuminance - 平均輝度 (0-1)
 * @param contrast - コントラスト (0-1)
 * @returns オーバーレイ設定（テーマ別）
 */
function calculateOptimalOverlay(
	averageLuminance: number,
	contrast: number
): Pick<
	ImageAnalysisResult,
	"overlayAlphaLight" | "overlayAlphaDark" | "blendModeLight" | "blendModeDark"
> {
	// 基準α値
	let alphaLight = 0.35; // ライトモード基準
	let alphaDark = 0.45; // ダークモード基準

	// 輝度に応じた調整
	// ライトモード: 明るい画像 → α値を上げる（暗くする）
	// ダークモード: 暗い画像 → α値を下げる（明るくする）
	const lightTarget = 0.85; // ライトモードの目標"明るさ感"
	const darkTarget = 0.15; // ダークモードの目標"暗さ感"

	const lightAdjustment = (lightTarget - averageLuminance) * 0.25;
	const darkAdjustment = (darkTarget - averageLuminance) * 0.35;

	alphaLight += lightAdjustment;
	alphaDark += darkAdjustment;

	// コントラストが高い場合（イルミネーション等）の調整
	if (contrast > 0.18) {
		// 点光源対策でα値を少し上げる
		alphaLight += 0.05;
		alphaDark += 0.05;
	}

	// α値の範囲制限（0.20 - 0.70）
	alphaLight = clamp(alphaLight, 0.2, 0.7);
	alphaDark = clamp(alphaDark, 0.2, 0.7);

	// テーマ別ブレンドモード決定
	// ライトモード: 高コントラスト時は screen（点光源を明るく）
	// ダークモード: 高コントラスト時は multiply（点光源を抑制）
	const blendModeLight: "normal" | "screen" =
		contrast > 0.18 ? "screen" : "normal";
	const blendModeDark: "normal" | "multiply" =
		contrast > 0.18 ? "multiply" : "normal";

	return {
		overlayAlphaLight: Number(alphaLight.toFixed(2)),
		overlayAlphaDark: Number(alphaDark.toFixed(2)),
		blendModeLight,
		blendModeDark,
	};
}

/**
 * 画像解析結果をlocalStorage + Cookieに保存
 * テーマ別のブレンドモードに対応、Secure属性とエンコーディングを追加
 *
 * @param result - 画像解析結果
 */
export function saveImageAnalysisResult(
	result: Pick<
		ImageAnalysisResult,
		| "overlayAlphaLight"
		| "overlayAlphaDark"
		| "blendModeLight"
		| "blendModeDark"
	>
): void {
	if (typeof window === "undefined") return;

	// localStorage に保存
	localStorage.setItem(
		STORAGE_KEYS.BG_OVERLAY_LIGHT,
		String(result.overlayAlphaLight)
	);
	localStorage.setItem(
		STORAGE_KEYS.BG_OVERLAY_DARK,
		String(result.overlayAlphaDark)
	);
	localStorage.setItem(STORAGE_KEYS.BG_BLEND_MODE_LIGHT, result.blendModeLight);
	localStorage.setItem(STORAGE_KEYS.BG_BLEND_MODE_DARK, result.blendModeDark);

	// Cookie にも保存（SSR対応、Secure属性・エンコーディング対応）
	const expires = new Date();
	expires.setFullYear(expires.getFullYear() + 1);
	const expireString = expires.toUTCString();
	const isSecure =
		typeof location !== "undefined" && location.protocol === "https:";
	const secureFlag = isSecure ? " Secure;" : "";

	document.cookie = `${COOKIE_KEYS.BG_OVERLAY_LIGHT}=${encodeURIComponent(
		String(result.overlayAlphaLight)
	)}; expires=${expireString}; path=/; SameSite=Lax;${secureFlag}`;
	document.cookie = `${COOKIE_KEYS.BG_OVERLAY_DARK}=${encodeURIComponent(
		String(result.overlayAlphaDark)
	)}; expires=${expireString}; path=/; SameSite=Lax;${secureFlag}`;
	document.cookie = `${COOKIE_KEYS.BG_BLEND_MODE_LIGHT}=${encodeURIComponent(
		result.blendModeLight
	)}; expires=${expireString}; path=/; SameSite=Lax;${secureFlag}`;
	document.cookie = `${COOKIE_KEYS.BG_BLEND_MODE_DARK}=${encodeURIComponent(
		result.blendModeDark
	)}; expires=${expireString}; path=/; SameSite=Lax;${secureFlag}`;
}

/**
 * 保存された画像解析結果を読み込み
 * テーマ別のブレンドモードを取得
 *
 * @returns 保存されたオーバーレイ設定
 */
export function loadImageAnalysisResult(): Pick<
	ImageAnalysisResult,
	"overlayAlphaLight" | "overlayAlphaDark" | "blendModeLight" | "blendModeDark"
> {
	if (typeof window === "undefined") {
		return {
			overlayAlphaLight: 0.35,
			overlayAlphaDark: 0.45,
			blendModeLight: "normal",
			blendModeDark: "normal",
		};
	}

	const alphaLight = parseFloat(
		localStorage.getItem(STORAGE_KEYS.BG_OVERLAY_LIGHT) || "0.35"
	);
	const alphaDark = parseFloat(
		localStorage.getItem(STORAGE_KEYS.BG_OVERLAY_DARK) || "0.45"
	);
	const blendModeLight = (localStorage.getItem(
		STORAGE_KEYS.BG_BLEND_MODE_LIGHT
	) || "normal") as "normal" | "screen";
	const blendModeDark = (localStorage.getItem(
		STORAGE_KEYS.BG_BLEND_MODE_DARK
	) || "normal") as "normal" | "multiply";

	return {
		overlayAlphaLight: isNaN(alphaLight) ? 0.35 : alphaLight,
		overlayAlphaDark: isNaN(alphaDark) ? 0.45 : alphaDark,
		blendModeLight,
		blendModeDark,
	};
}

/**
 * 画像解析結果をクリア（画像を削除した時用）
 */
export function clearImageAnalysisResult(): void {
	if (typeof window === "undefined") return;

	// localStorage から削除
	localStorage.removeItem(STORAGE_KEYS.BG_OVERLAY_LIGHT);
	localStorage.removeItem(STORAGE_KEYS.BG_OVERLAY_DARK);
	localStorage.removeItem(STORAGE_KEYS.BG_BLEND_MODE_LIGHT);
	localStorage.removeItem(STORAGE_KEYS.BG_BLEND_MODE_DARK);

	// Cookie も削除
	document.cookie = `${COOKIE_KEYS.BG_OVERLAY_LIGHT}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
	document.cookie = `${COOKIE_KEYS.BG_OVERLAY_DARK}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
	document.cookie = `${COOKIE_KEYS.BG_BLEND_MODE_LIGHT}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
	document.cookie = `${COOKIE_KEYS.BG_BLEND_MODE_DARK}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}
