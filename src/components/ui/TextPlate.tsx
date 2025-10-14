/**
 * TextPlate コンポーネント
 *
 * 背景画像上でテキストが読みにくい場合に使用する、
 * 半透明の背景プレート。ぼかし効果とテーマ対応。
 */

"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils/helpers";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * TextPlate のプロパティ定義
 */
interface TextPlateProps {
	/** プレート内に表示するコンテンツ */
	children: ReactNode;
	/** 使用するHTML要素（デフォルト: div） */
	as?: React.ElementType;
	/** 追加CSSクラス */
	className?: string;
	/** 強制的に有効にする（画像背景以外でも使用したい場合） */
	forceEnable?: boolean;
	// 将来の拡張用: tone調整（濃さ変更機能）
	// tone?: -1 | 0 | 1;
}

/**
 * TextPlate コンポーネント
 *
 * 背景画像の上に配置されたテキストを読みやすくするための、
 * 半透明の背景プレート。backdrop-filterでぼかし効果を追加。
 *
 * 使用例:
 * ```tsx
 * <TextPlate>
 *   <h1>旅行計画</h1>
 *   <p>次の旅行をもっと楽しく</p>
 * </TextPlate>
 * ```
 *
 * @param children - プレート内のコンテンツ
 * @param as - 使用するHTML要素
 * @param className - 追加スタイル
 * @param forceEnable - 強制的に有効にする（画像背景以外でも使用したい場合）
 */
export default function TextPlate({
	children,
	as = "div",
	className = "",
	forceEnable = false,
}: TextPlateProps) {
	const Component = as as React.ElementType;
	const { backgroundImage } = useTheme();

	// 画像背景がある場合のみTextPlateを有効化
	const shouldEnable = forceEnable || !!backgroundImage;

	// 画像背景がない場合は通常のコンテンツを返す
	if (!shouldEnable) {
		return <Component className={className}>{children}</Component>;
	}

	/**
	 * プレートのクラス定義
	 * - 相対位置でコンテンツを包む
	 * - ぼかし効果でガラス的な質感
	 * - テーマに応じた自動色調整
	 */
	const plateClasses = cn(
		// 基本構造
		"relative rounded-xl p-4",

		// ぼかし効果とテーマ対応背景
		"backdrop-blur-sm",
		"bg-white/70 dark:bg-black/25",

		// 境界線（微細な輪郭）
		"outline outline-1 outline-white/10 dark:outline-black/10",

		// カスタムクラス
		className
	);

	return <Component className={plateClasses}>{children}</Component>;
}

/**
 * 使用例とベストプラクティス
 *
 * 1. 基本的な使用:
 * ```tsx
 * <TextPlate>
 *   <h1>見出し</h1>
 * </TextPlate>
 * ```
 *
 * 2. 強制有効化:
 * ```tsx
 * <TextPlate forceEnable={true}>画像背景以外でも使用</TextPlate>
 * ```
 *
 * 3. セマンティックHTML:
 * ```tsx
 * <TextPlate as="section">
 *   <h2>セクション見出し</h2>
 * </TextPlate>
 * ```
 *
 * 注意事項:
 * - backdrop-filterはSafariで重くなる場合があるため、多用は避ける
 * - 画像背景がない場合は自動的に無効化される
 * - forceEnableで強制的に有効化することも可能
 */
