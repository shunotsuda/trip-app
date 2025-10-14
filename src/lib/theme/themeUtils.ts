/**
 * テーマとバックグラウンドのCSS変数更新ユーティリティ
 * SSR、クライアントサイド、スクリプトで共通使用
 */

import { STORAGE_KEYS, COOKIE_KEYS, THEME } from "@/config/constants";

export interface ThemeConfig {
	mode?: string | null;
	backgroundImage?: string | null;
	background?: string | null;
}

/**
 * CSS変数を更新する共通関数
 * @param element - 対象のHTML要素（通常は document.documentElement）
 * @param config - テーマ設定
 */
export function updateCssVariables(
	element: HTMLElement | Element,
	config: ThemeConfig
): void {
	const { mode = "light", backgroundImage, background = "bg-accent" } = config;

	// data-theme属性を設定
	if (mode) {
		element.setAttribute("data-theme", mode);
		if (element === document?.documentElement) {
			(element as HTMLElement).style.colorScheme =
				mode === "dark" ? "dark" : "light";
		}
	}

	// CSS変数を設定
	const style = (element as HTMLElement).style;

	if (backgroundImage) {
		// 画像モード
		style.setProperty("--user-bg-mode", "image");
		style.setProperty("--user-bg-image", `url("${backgroundImage}")`);
		style.setProperty("--user-bg-color", "transparent");
		// オーバーレイ色はCSS変数で自動切り替え（設定不要）
	} else {
		// 色モード
		style.setProperty("--user-bg-mode", "color");
		style.setProperty("--user-bg-image", "none");

		// 背景色をTailwindクラスからCSS変数に変換
		let colorVar: string;
		switch (background) {
			case "bg-accent":
				colorVar = "var(--bg-accent)";
				break;
			case "bg-[var(--text-white)]":
				colorVar = "var(--text-white)";
				break;
			case "bg-[var(--bg-page)]":
				colorVar = "var(--bg-page)";
				break;
			default:
				colorVar = "var(--bg-accent)";
		}
		style.setProperty("--user-bg-color", colorVar);
	}
}

/**
 * localStorageからテーマ設定を読み込む
 * @returns ThemeConfig
 */
export function loadThemeFromLocalStorage(): ThemeConfig {
	if (typeof window === "undefined") {
		return {
			mode: "light",
			backgroundImage: null,
			background: "bg-accent",
		};
	}

	return {
		mode: localStorage.getItem(STORAGE_KEYS.THEME_MODE) || THEME.MODE.LIGHT,
		backgroundImage: localStorage.getItem(STORAGE_KEYS.BACKGROUND_IMAGE),
		background:
			localStorage.getItem(STORAGE_KEYS.BACKGROUND) || THEME.DEFAULT_BACKGROUND,
	};
}

/**
 * テーマ設定をlocalStorageとCookieに保存
 * @param config - 保存するテーマ設定
 */
export function saveThemeConfig(config: Partial<ThemeConfig>): void {
	if (typeof window === "undefined") return;

	const expires = new Date();
	expires.setFullYear(expires.getFullYear() + 1);
	const expireString = expires.toUTCString();

	// localStorage
	if (config.mode !== undefined) {
		localStorage.setItem(
			STORAGE_KEYS.THEME_MODE,
			config.mode || THEME.MODE.LIGHT
		);
		document.cookie = `${COOKIE_KEYS.THEME_MODE}=${
			config.mode || THEME.MODE.LIGHT
		}; expires=${expireString}; path=/; samesite=lax`;
	}

	if (config.backgroundImage !== undefined) {
		if (config.backgroundImage) {
			localStorage.setItem(
				STORAGE_KEYS.BACKGROUND_IMAGE,
				config.backgroundImage
			);
			document.cookie = `${COOKIE_KEYS.BACKGROUND_IMAGE}=${encodeURIComponent(
				config.backgroundImage
			)}; expires=${expireString}; path=/; samesite=lax`;
			// 画像設定時は背景色をクリア
			localStorage.removeItem(STORAGE_KEYS.BACKGROUND);
			document.cookie = `${COOKIE_KEYS.BACKGROUND}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; samesite=lax`;
		} else {
			localStorage.removeItem(STORAGE_KEYS.BACKGROUND_IMAGE);
			document.cookie = `${COOKIE_KEYS.BACKGROUND_IMAGE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; samesite=lax`;
		}
	}

	if (config.background !== undefined) {
		localStorage.setItem(
			STORAGE_KEYS.BACKGROUND,
			config.background || THEME.DEFAULT_BACKGROUND
		);
		document.cookie = `${COOKIE_KEYS.BACKGROUND}=${
			config.background || THEME.DEFAULT_BACKGROUND
		}; expires=${expireString}; path=/; samesite=lax`;
		// 背景色設定時は画像をクリア
		localStorage.removeItem(STORAGE_KEYS.BACKGROUND_IMAGE);
		document.cookie = `${COOKIE_KEYS.BACKGROUND_IMAGE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; samesite=lax`;
	}
}

/**
 * 文字列エスケープ（スクリプト内で使用）
 */
export function escapeQuotes(str: string): string {
	return str.replace(/"/g, '\\"');
}
