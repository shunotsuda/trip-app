/**
 * Material Symbols アイコンコンポーネント
 *
 * Google Material Symbols を使用したアイコン表示専用コンポーネント。
 * テーマに応じた自動フォント調整。
 * インタラクションが必要な場合は、このコンポーネントをbuttonで囲んでください。
 */

"use client";

import React from "react";
import { IconProps } from "@/types";
import { cn } from "@/lib/utils/helpers";
import { useTheme } from "@/contexts";

/**
 * MaterialIcon のプロパティ定義
 */
interface MaterialIconProps extends IconProps {
	/** Material Symbols のアイコン名 */
	icon: string;
}

/**
 * MaterialIcon コンポーネント
 *
 * Material Symbols フォントを使用してアイコンを表示。
 * テーマモードに応じたフォント調整を提供。
 *
 * @param icon - 表示するアイコン名（例: "home", "search", "menu"）
 * @param filled - アイコンの塗りつぶし状態（デフォルト: false）
 * @param size - アイコンサイズ（px、デフォルト: 24）
 * @param className - 追加CSSクラス（色、余白など）
 *
 * @example
 * // 基本的な使い方
 * <MaterialIcon icon="menu" />
 *
 * @example
 * // ボタンとして使う場合
 * <button onClick={handleClick}>
 *   <MaterialIcon icon="menu" size={24} />
 * </button>
 *
 * @example
 * // 塗りつぶしと色の指定
 * <MaterialIcon icon="favorite" filled={true} className="text-red-500" />
 */
export default function MaterialIcon({
	icon,
	filled = false,
	size = 24,
	className,
}: MaterialIconProps) {
	const { mode } = useTheme();

	/**
	 * テーマに応じたフォント調整
	 * ダークモードでは線が太く見えるため、weightとgradientを調整
	 */
	const wght = mode === "dark" ? 200 : 300;
	const grad = mode === "dark" ? -25 : 0;

	return (
		<span
			className={cn("material-symbols-outlined select-none", className)}
			style={{
				fontSize: `${size}px`,
				fontVariationSettings: filled
					? `'FILL' 1, 'wght' ${wght}, 'GRAD' ${grad}, 'opsz' 24`
					: `'FILL' 0, 'wght' ${wght}, 'GRAD' ${grad}, 'opsz' 24`,
				width: `${size}px`,
				height: `${size}px`,
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
			}}
			suppressHydrationWarning
		>
			{icon}
		</span>
	);
}
