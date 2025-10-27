"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/helpers";
import MaterialIcon from "@/components/ui/MaterialIcon";

interface BackButtonProps {
	/** カスタムクリックハンドラー（指定された場合は自作モード） */
	onClick?: () => void;
	/** ページ戻るモード時のフォールバックルート */
	fallbackRoute?: string;
	/** 追加のクラス名 */
	className?: string;
	/** アイコンサイズ */
	size?: number;
}

export default function BackButton({
	onClick,
	fallbackRoute = "/",
	className = "",
	size = 20,
}: BackButtonProps) {
	const router = useRouter();

	const handleClick = () => {
		if (onClick) {
			// 自作モード：カスタム関数を実行
			onClick();
			return;
		}

		// ページ戻るモード：履歴ベース + フォールバック
		if (window.history.length > 1) {
			router.back();
		} else {
			router.push(fallbackRoute);
		}
	};

	return (
		<button
			onClick={handleClick}
			className={cn(
				"p-2 rounded-full dim",
				"flex items-center justify-center",
				"text-[var(--text-primary)]",
				"transition-colors duration-150",
				"focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
				className
			)}
			aria-label="戻る"
		>
			<MaterialIcon
				icon="arrow_back_ios"
				size={size}
				className="text-[var(--text-primary)]"
			/>
		</button>
	);
}
