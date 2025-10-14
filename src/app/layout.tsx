import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider, LoadingProvider, ThemeProvider } from "@/contexts";
import { ModalContainer } from "@/components/ui/Modal";
import { COOKIE_KEYS, THEME } from "@/config/constants";
import Script from "next/script";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Travel Japan",
	description: "旅行をより楽しく",
	formatDetection: { telephone: false },
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	// maximumScale: 1,
	// userScalable: false,
};

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	// サーバーサイドでCookieから初期値を読み取り
	const cookieStore = await cookies();
	const savedMode =
		cookieStore.get(COOKIE_KEYS.THEME_MODE)?.value || THEME.MODE.LIGHT;
	const savedBackgroundImage = cookieStore.get(
		COOKIE_KEYS.BACKGROUND_IMAGE
	)?.value;
	const savedBackground =
		cookieStore.get(COOKIE_KEYS.BACKGROUND)?.value || THEME.DEFAULT_BACKGROUND;

	// CSS変数の初期値を計算（SSRで適用）
	const initialCssVars: Record<string, string> = {};

	// テーマ設定をCSS変数に変換
	const themeConfig = {
		mode: savedMode,
		backgroundImage: savedBackgroundImage
			? decodeURIComponent(savedBackgroundImage)
			: null,
		background: savedBackground,
	};

	if (themeConfig.backgroundImage) {
		// 画像モード
		initialCssVars["--user-bg-mode"] = "image";
		initialCssVars["--user-bg-image"] = `url("${themeConfig.backgroundImage}")`;
		initialCssVars["--user-bg-color"] = "transparent";
		// オーバーレイ色はCSS変数で自動切り替え（設定不要）
	} else {
		// 色モード
		initialCssVars["--user-bg-mode"] = "color";
		initialCssVars["--user-bg-image"] = "none";
		let colorVar: string;
		switch (savedBackground) {
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
		initialCssVars["--user-bg-color"] = colorVar;
	}

	return (
		<html
			lang="ja"
			suppressHydrationWarning
			data-theme={savedMode}
			style={{
				colorScheme: savedMode === "dark" ? "dark" : "light",
				...initialCssVars,
			}}
		>
			<head>
				{/* Material Symbols 用の最適化 */}
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
				/>

				{/* フォールバック: 初回訪問やCookie-localStorage同期用 */}
				<Script id="early-theme-bg" strategy="beforeInteractive">{`
          (function () {
            try {
              var docEl = document.documentElement;
              
              // 現在のCSS変数値を確認
              var currentTheme = docEl.getAttribute('data-theme') || '';
              var currentBgImage = docEl.style.getPropertyValue('--user-bg-image') || 'none';
              
              // localStorage値を取得
              var savedMode = localStorage.getItem('userThemeMode') || 'light';
              var savedImg = localStorage.getItem('userBackgroundImage');
              var savedBg = localStorage.getItem('userBackground') || 'bg-accent';
              
              // SSR値とlocalStorage値が異なる場合のみ更新（フォールバック）
              var needsUpdate = false;
              
              if (currentTheme !== savedMode) {
                docEl.setAttribute('data-theme', savedMode);
                docEl.style.colorScheme = savedMode === 'dark' ? 'dark' : 'light';
                needsUpdate = true;
              }
              
              var expectedBgImage = savedImg ? 'url("' + savedImg.replace(/"/g,'\\\\"') + '")' : 'none';
              if (currentBgImage !== expectedBgImage) {
                // CSS変数統一更新
                if (savedImg) {
                  // 画像モード
                  docEl.style.setProperty('--user-bg-mode', 'image');
                  docEl.style.setProperty('--user-bg-image', expectedBgImage);
                  docEl.style.setProperty('--user-bg-color', 'transparent');
                  // オーバーレイ色はCSS変数で自動切り替え
                } else {
                  // 色モード
                  docEl.style.setProperty('--user-bg-mode', 'color');
                  docEl.style.setProperty('--user-bg-image', 'none');
                  var colorVar = savedBg === 'bg-accent' ? 'var(--bg-accent)' 
                               : savedBg === 'bg-[var(--text-white)]' ? 'var(--text-white)'
                               : savedBg === 'bg-[var(--bg-page)]' ? 'var(--bg-page)'
                               : 'var(--bg-accent)';
                  docEl.style.setProperty('--user-bg-color', colorVar);
                }
                needsUpdate = true;
              }
              
              // Cookie同期（変更があった場合のみ）
              if (needsUpdate) {
                var expires = new Date();
                expires.setFullYear(expires.getFullYear() + 1);
                var expireString = expires.toUTCString();
                document.cookie = 'userThemeMode=' + savedMode + '; expires=' + expireString + '; path=/; samesite=lax';
                if (savedImg) {
                  document.cookie = 'userBackgroundImage=' + encodeURIComponent(savedImg) + '; expires=' + expireString + '; path=/; samesite=lax';
                } else {
                  document.cookie = 'userBackground=' + savedBg + '; expires=' + expireString + '; path=/; samesite=lax';
                }
              }
            } catch (e) {}
          })();
        `}</Script>

				{/* bfcache対策: ページ復帰時にも同期 */}
				<Script id="pageshow-sync" strategy="beforeInteractive">{`
          window.addEventListener('pageshow', function(event) {
            try {
              // bfcacheからの復帰時のみ同期
              if (event.persisted) {
                var docEl = document.documentElement;
                var savedMode = localStorage.getItem('userThemeMode') || 'light';
                var savedImg = localStorage.getItem('userBackgroundImage');
                var savedBg = localStorage.getItem('userBackground') || 'bg-accent';
                
                // テーマ設定
                docEl.setAttribute('data-theme', savedMode);
                docEl.style.colorScheme = savedMode === 'dark' ? 'dark' : 'light';
                
                // 背景設定（統一ロジック）
                if (savedImg) {
                  // 画像モード
                  docEl.style.setProperty('--user-bg-mode', 'image');
                  docEl.style.setProperty('--user-bg-image', 'url("' + savedImg.replace(/"/g,'\\\\"') + '")');
                  docEl.style.setProperty('--user-bg-color', 'transparent');
                  // オーバーレイ色はCSS変数で自動切り替え
                } else {
                  // 色モード
                  docEl.style.setProperty('--user-bg-mode', 'color');
                  docEl.style.setProperty('--user-bg-image', 'none');
                  var colorVar = savedBg === 'bg-accent' ? 'var(--bg-accent)' 
                               : savedBg === 'bg-[var(--text-white)]' ? 'var(--text-white)'
                               : savedBg === 'bg-[var(--bg-page)]' ? 'var(--bg-page)'
                               : 'var(--bg-accent)';
                  docEl.style.setProperty('--user-bg-color', colorVar);
                }
              }
            } catch (e) {}
          });
        `}</Script>
			</head>

			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning
			>
				<ModalProvider>
					<LoadingProvider>
						<ThemeProvider>
							<div className="relative z-0 bg-transparent">
								{children}
								<ModalContainer />
							</div>
						</ThemeProvider>
					</LoadingProvider>
				</ModalProvider>
			</body>
		</html>
	);
}
