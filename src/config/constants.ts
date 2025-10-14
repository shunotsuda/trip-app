/**
 * アプリケーション全体で使用する定数
 *
 * このファイルには以下の定数を定義します：
 * - アプリケーション設定
 * - API エンドポイント（将来用）
 * - UI関連の定数
 * - その他のグローバル定数
 */

// ===== アプリケーション情報 =====
export const APP_CONFIG = {
	name: "Travel Japan",
	description: "旅行をより楽しく",
	version: "0.1.0",
} as const;

// ===== テーマ関連定数 =====
export const THEME = {
	MODE: {
		LIGHT: "light",
		DARK: "dark",
	},
	BACKGROUND_TYPES: {
		COLOR: "color",
		IMAGE: "image",
	},
	DEFAULT_BACKGROUND: "bg-accent",
} as const;

// ===== ローカルストレージキー =====
export const STORAGE_KEYS = {
	THEME_MODE: "userThemeMode",
	BACKGROUND: "userBackground",
	BACKGROUND_IMAGE: "userBackgroundImage",
} as const;

// ===== Cookieキー =====
export const COOKIE_KEYS = {
	THEME_MODE: "userThemeMode",
	BACKGROUND: "userBackground",
	BACKGROUND_IMAGE: "userBackgroundImage",
} as const;

// ===== URL パス =====
export const ROUTES = {
	HOME: "/",
	LOGIN: "/login",
	LOGIN_EMAIL: "/login/email",
	FORGOT_PASSWORD: "/login/forgot-password",
	SIGNUP_EMAIL: "/signup/email",
	PROFILE: "/profile",
	SETTINGS: "/settings",
	CALENDAR: "/calendar",
	MAP: "/map",
	SWIPE: "/swipe",
} as const;

// ===== UI関連定数 =====
export const UI = {
	// ブレークポイント（Tailwind CSS準拠）
	BREAKPOINTS: {
		SM: 640,
		MD: 768,
		LG: 1024,
		XL: 1280,
		"2XL": 1536,
	},

	// アニメーション時間
	ANIMATION_DURATION: {
		FAST: 150,
		NORMAL: 300,
		SLOW: 500,
	},

	// z-index階層
	Z_INDEX: {
		DROPDOWN: 1000,
		STICKY: 1020,
		FIXED: 1030,
		MODAL_BACKDROP: 1040,
		MODAL: 1050,
		POPOVER: 1060,
		TOOLTIP: 1070,
	},
} as const;

// ===== バリデーション関連定数 =====
export const VALIDATION = {
	PASSWORD: {
		MIN_LENGTH: 8,
		MAX_LENGTH: 128,
	},
	EMAIL: {
		MAX_LENGTH: 254,
	},
} as const;

// ===== API関連（将来の拡張用） =====
export const API = {
	BASE_URL: process.env.NEXT_PUBLIC_API_URL || "",
	TIMEOUT: 10000, // 10秒
	ENDPOINTS: {
		// 必要に応じて追加
	},
} as const;

// ===== エラーメッセージ =====
export const ERROR_MESSAGES = {
	NETWORK: "ネットワークエラーが発生しました",
	UNKNOWN: "予期しないエラーが発生しました",
	VALIDATION: {
		REQUIRED: "この項目は必須です",
		EMAIL_INVALID: "有効なメールアドレスを入力してください",
		PASSWORD_TOO_SHORT: `パスワードは${VALIDATION.PASSWORD.MIN_LENGTH}文字以上で入力してください`,
		PASSWORD_TOO_LONG: `パスワードは${VALIDATION.PASSWORD.MAX_LENGTH}文字以下で入力してください`,
	},
} as const;

// ===== 成功メッセージ =====
export const SUCCESS_MESSAGES = {
	LOGIN: "ログインしました",
	LOGOUT: "ログアウトしました",
	PROFILE_UPDATED: "プロフィールを更新しました",
	SETTINGS_SAVED: "設定を保存しました",
} as const;
