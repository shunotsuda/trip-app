"use client";

import React from "react";
import { cn } from "@/lib/utils/helpers";
import MaterialIcon from "@/components/ui/MaterialIcon";

interface HamburgerToggleProps {
	/** トグル状態 */
	isOpen: boolean;
	/** クリック時のコールバック */
	onClick: () => void;
	/** 追加のクラス名 */
	className?: string;
	/** アイコンサイズ */
	size?: number;
}

export default function HamburgerToggle({
	isOpen,
	onClick,
	className = "",
	size = 24,
}: HamburgerToggleProps) {
	return (
		<button
			onClick={onClick}
			className={cn(
				"p-1 rounded-full focus-ring-visible",
				"flex items-center justify-center",
				"text-[var(--text-primary)]",
				"bg-[var(--bg-page)]",
				"transition-colors duration-150",
				className
			)}
			aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
			aria-expanded={isOpen}
		>
			<MaterialIcon
				icon={isOpen ? "close" : "menu"}
				size={size}
				className="text-[var(--text-primary)] dim bg-sky-200 transition-transform duration-200 ease-in-out"
			/>
		</button>
	);
}
