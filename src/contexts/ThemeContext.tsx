"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

interface ThemeContextType {
	background: string;
	backgroundImage: string | null;
	mode: "light" | "dark";
	setBackground: (bg: string) => void;
	setBackgroundImage: (imageUrl: string | null) => void;
	setMode: (mode: "light" | "dark") => void;
	toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
	children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	// localStorageから初期値を読み込む（フラッシュ防止）
	const [background, setBackground] = useState(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("userBackground") || "bg-accent";
		}
		return "bg-accent";
	});

	const [backgroundImage, setBackgroundImage] = useState<string | null>(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("userBackgroundImage");
		}
		return null;
	});

	const [mode, setMode] = useState<"light" | "dark">(() => {
		if (typeof window !== "undefined") {
			const savedMode = localStorage.getItem("userThemeMode") as
				| "light"
				| "dark"
				| null;
			return savedMode || "light";
		}
		return "light";
	});

	// 初回マウント時とmodeが変わったらdata-theme属性を更新
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", mode);
	}, [mode]);

	// 背景色を保存
	const handleSetBackground = (bg: string) => {
		setBackground(bg);
		setBackgroundImage(null); // 色を選んだら画像をクリア
		localStorage.setItem("userBackground", bg);
		localStorage.removeItem("userBackgroundImage");
	};

	// 背景画像を保存
	const handleSetBackgroundImage = (imageUrl: string | null) => {
		setBackgroundImage(imageUrl);
		if (imageUrl) {
			localStorage.setItem("userBackgroundImage", imageUrl);
		} else {
			localStorage.removeItem("userBackgroundImage");
		}
	};

	// モードを保存
	const handleSetMode = (newMode: "light" | "dark") => {
		setMode(newMode);
		localStorage.setItem("userThemeMode", newMode);
	};

	// モードを切り替え
	const handleToggleMode = () => {
		const newMode = mode === "light" ? "dark" : "light";
		handleSetMode(newMode);
	};

	return (
		<ThemeContext.Provider
			value={{
				background,
				backgroundImage,
				mode,
				setBackground: handleSetBackground,
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
