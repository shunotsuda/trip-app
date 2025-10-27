"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import {
	updateCssVariables,
	loadThemeFromLocalStorage,
	saveThemeConfig,
} from "@/lib/theme/themeUtils";

interface ThemeContextType {
	backgroundImage: string | null;
	mode: "light" | "dark";
	setBackgroundImage: (imageUrl: string | null) => void;
	setMode: (mode: "light" | "dark") => void;
	toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
	children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [backgroundImage, setBackgroundImage] = useState<string | null>(() => {
		const config = loadThemeFromLocalStorage();
		return config.backgroundImage || null;
	});

	const [mode, setMode] = useState<"light" | "dark">(() => {
		const config = loadThemeFromLocalStorage();
		return (config.mode as "light" | "dark") || "light";
	});

	// テーマ/背景変更時にCSS変数を更新
	useEffect(() => {
		updateCssVariables(document.documentElement, {
			mode,
			backgroundImage,
		});
	}, [mode, backgroundImage]);

	// ページフォーカス/可視性変更時にlocalStorageから再同期
	useEffect(() => {
		const syncFromLocalStorage = () => {
			const config = loadThemeFromLocalStorage();

			// stateとlocalStorageが異なる場合のみ更新
			if (config.mode && config.mode !== mode) {
				setMode(config.mode as "light" | "dark");
			}
			if (config.backgroundImage !== backgroundImage) {
				setBackgroundImage(config.backgroundImage || null);
			}

			// CSS変数を即座に同期
			updateCssVariables(document.documentElement, config);
		};

		window.addEventListener("focus", syncFromLocalStorage);
		document.addEventListener("visibilitychange", () => {
			if (!document.hidden) syncFromLocalStorage();
		});
		window.addEventListener("popstate", syncFromLocalStorage);

		return () => {
			window.removeEventListener("focus", syncFromLocalStorage);
			document.removeEventListener("visibilitychange", syncFromLocalStorage);
			window.removeEventListener("popstate", syncFromLocalStorage);
		};
	}, [mode, backgroundImage]);

	// 背景画像を設定・保存
	const handleSetBackgroundImage = (imageUrl: string | null) => {
		console.log("Setting background image:", imageUrl);
		setBackgroundImage(imageUrl);

		// localStorage & Cookie保存
		saveThemeConfig({ backgroundImage: imageUrl });

		console.log("Background image saved:", imageUrl);
	};

	// モードを設定・保存
	const handleSetMode = (newMode: "light" | "dark") => {
		setMode(newMode);

		// localStorage & Cookie保存
		saveThemeConfig({ mode: newMode });
	};

	// モードを切り替え
	const handleToggleMode = () => {
		const newMode = mode === "light" ? "dark" : "light";
		handleSetMode(newMode);
	};

	return (
		<ThemeContext.Provider
			value={{
				backgroundImage,
				mode,
				setBackgroundImage: handleSetBackgroundImage,
				setMode: handleSetMode,
				toggleMode: handleToggleMode,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
