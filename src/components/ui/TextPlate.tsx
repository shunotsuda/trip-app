/**
 * TextPlate コンポーネント
 *
 * 背景画像上でテキストが読みにくい場合に使用する、
 * 半透明の背景プレート。ぼかし効果とテーマ対応。
 */

"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils/helpers";

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
 * <TextPlate tone={0}>
 *   <h1>旅行計画</h1>
 *   <p>次の旅行をもっと楽しく</p>
 * </TextPlate>
 * ```
 *
 * @param children - プレート内のコンテンツ
 * @param as - 使用するHTML要素
 * @param className - 追加スタイル
 * @param tone - 濃さ調整（-1: 薄め、0: 標準、1: 濃いめ）
 */
export default function TextPlate({
	children,
	as = "div",
	className = "",
}: TextPlateProps) {
	const Component = as as React.ElementType;

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
 * 2. 濃さ調整:
 * ```tsx
 * <TextPlate tone={1}>より読みやすく</TextPlate>
 * <TextPlate tone={-1}>控えめに</TextPlate>
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
 * - tone調整は±1の範囲内で使用を推奨
 * - 背景画像なしの場合でも見た目が崩れないよう配慮
 */
