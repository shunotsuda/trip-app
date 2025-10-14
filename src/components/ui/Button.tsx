/**
 * 汎用ボタンコンポーネント
 *
 * アプリケーション全体で使用される基本的なボタンUI。
 * 複数のバリエーション・サイズに対応し、アクセシビリティを考慮。
 */

import React from "react";
import { ButtonProps } from "@/types";
import { cn } from "@/lib/utils/helpers";

/**
 * 拡張されたボタンプロパティ
 * 基本的なButtonPropsに加えて、ローディング状態等を追加
 */
interface ExtendedButtonProps extends ButtonProps {
	/** ローディング状態表示フラグ */
	isLoading?: boolean;
	/** ローディング時に表示するテキスト */
	loadingText?: string;
	/** フル幅表示フラグ */
	fullWidth?: boolean;
	/** HTML button type属性 */
	type?: "button" | "submit" | "reset";
}

/**
 * Button コンポーネント
 *
 * @param onClick - クリック時のコールバック関数
 * @param disabled - 無効状態フラグ
 * @param variant - ボタンの見た目バリエーション
 * @param size - ボタンのサイズ
 * @param isLoading - ローディング状態
 * @param loadingText - ローディング時表示テキスト
 * @param fullWidth - フル幅表示フラグ
 * @param className - 追加CSSクラス
 * @param children - ボタン内容
 * @param props - その他のHTML button属性
 */
export default function Button({
	onClick,
	disabled = false,
	variant = "primary",
	size = "md",
	isLoading = false,
	loadingText = "処理中...",
	fullWidth = false,
	type = "button",
	className,
	children,
	...props
}: ExtendedButtonProps) {
	// ローディング中または明示的にdisabledの場合は無効化
	const isDisabled = disabled || isLoading;

	/**
	 * ベースクラス: 全バリエーションに共通するスタイル
	 * - フレックスレイアウトでアイコン+テキストを中央配置
	 * - フォーカスリングによるアクセシビリティ対応
	 * - 無効状態の視覚的フィードバック
	 */
	const baseClasses = cn(
		"inline-flex items-center justify-center font-medium rounded-lg",
		"transition-colors duration-150 ease-in-out",
		"focus:outline-none focus:ring-2 focus:ring-offset-2",
		"disabled:opacity-50 disabled:cursor-not-allowed",
		fullWidth && "w-full"
	);

	/**
	 * バリエーション別スタイル定義
	 * アプリのデザインシステムに合わせた色彩設計
	 */
	const variantClasses = {
		primary:
			"bg-gradient-to-r from-purple-400 to-purple-500 text-white hover:from-purple-500 hover:to-purple-600 focus:ring-purple-500",
		secondary:
			"bg-[var(--bg-content)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--bg-hover)] focus:ring-gray-500",
		outline:
			"border border-[var(--border-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover-subtle)] focus:ring-gray-500",
		danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
		ghost:
			"text-[var(--text-secondary)] hover:bg-[var(--bg-hover-subtle)] focus:ring-gray-500",
	};

	/**
	 * サイズ別スタイル定義
	 * タッチデバイスでのユーザビリティを考慮したサイズ設定
	 */
	const sizeClasses = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-6 py-3 text-lg",
		xl: "px-8 py-4 text-xl",
	};

	return (
		<button
			type={type}
			onClick={isDisabled ? undefined : onClick}
			disabled={isDisabled}
			className={cn(
				baseClasses,
				variantClasses[variant],
				sizeClasses[size],
				className
			)}
			{...props}
		>
			{isLoading ? (
				<>
					{/* ローディングスピナー（アイコンフォントまたはSVG） */}
					<span className="mr-2 animate-spin">⚡</span>
					{loadingText}
				</>
			) : (
				children
			)}
		</button>
	);
}
