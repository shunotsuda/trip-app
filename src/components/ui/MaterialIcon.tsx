/**
 * Material Symbols アイコンコンポーネント
 *
 * Google Material Symbols を使用したアイコン表示コンポーネント。
 * テーマに応じた自動フォント調整とアクセシビリティ対応。
 */

"use client";

import React from "react";
import { IconProps } from "@/types";
import { cn } from "@/lib/utils/helpers";
import { useTheme } from "@/contexts";

/**
 * MaterialIcon のプロパティ定義
 * IconPropsを拡張してアイコン名とインタラクション機能を追加
 */
interface MaterialIconProps extends IconProps {
	/** Material Symbols のアイコン名 */
	icon: string;
	/** クリック時のコールバック関数 */
	onClick?: () => void;
	/** ARIA ラベル（アクセシビリティ対応） */
	ariaLabel?: string;
	/** ホバー時の色変更フラグ */
	enableHover?: boolean;
}

/**
 * MaterialIcon コンポーネント
 *
 * Material Symbols フォントを使用してアイコンを表示。
 * テーマモードに応じたフォント調整や、クリック可能状態の視覚的表現を提供。
 *
 * @param icon - 表示するアイコン名（例: "home", "search", "menu"）
 * @param filled - アイコンの塗りつぶし状態
 * @param size - アイコンサイズ（px）
 * @param onClick - クリック時のコールバック関数
 * @param ariaLabel - アクセシビリティ用のラベル
 * @param enableHover - ホバー効果の有効化フラグ
 * @param className - 追加CSSクラス
 */
export default function MaterialIcon({
	icon,
	filled = false,
	size = 24,
	onClick,
	ariaLabel,
	enableHover = true,
	className,
}: MaterialIconProps) {
	const { mode } = useTheme();

	/**
	 * テーマに応じたフォント調整
	 * ダークモードでは線が太く見えるため、weightとgradientを調整
	 */
	const wght = mode === "dark" ? 100 : 300;
	const grad = mode === "dark" ? -25 : 0;

	/**
	 * インタラクション可能かどうかを判定
	 */
	const isInteractive = Boolean(onClick);

	/**
	 * 基本クラス + 条件付きクラス
	 */
	const iconClasses = cn(
		"material-symbols-outlined select-none",
		"transition-opacity duration-150 ease-in-out", // スムーズな透明度変化
		isInteractive && [
			"cursor-pointer",
			enableHover && "hover:opacity-70", // ホバー時の透明度変化
		],
		// フォーカス可能な場合のアクセシビリティ対応
		isInteractive &&
			"focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm",
		className
	);

	/**
	 * キーボードイベントハンドラー（アクセシビリティ対応）
	 * EnterキーやSpaceキーでもクリックイベントを発火
	 */
	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (!onClick) return;
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onClick();
		}
	};

	return (
		<span
			className={iconClasses}
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
			onClick={onClick}
			onKeyDown={isInteractive ? handleKeyDown : undefined}
			tabIndex={isInteractive ? 0 : undefined}
			role={isInteractive ? "button" : undefined}
			aria-label={ariaLabel || (isInteractive ? `${icon} ボタン` : undefined)}
			suppressHydrationWarning
		>
			{icon}
		</span>
	);
}
