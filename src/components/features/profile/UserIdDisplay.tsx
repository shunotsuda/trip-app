"use client";

import { cn } from "@/lib/utils/helpers";
import MaterialIcon from "@/components/ui/MaterialIcon";

interface UserIdDisplayProps {
	/** ユーザーID */
	userId: string;
	/** 複数アカウントがあるかどうか */
	hasMultipleAccounts?: boolean;
	/** クリック時のコールバック */
	onClick?: () => void;
	/** 追加のクラス名 */
	className?: string;
	/** ドロップダウンが開いているかどうか */
	isOpen?: boolean;
}

export default function UserIdDisplay({
	userId,
	hasMultipleAccounts = false,
	onClick,
	className = "",
	isOpen = false,
}: UserIdDisplayProps) {
	return (
		<div
			className={cn(
				"flex items-center gap-1 cursor-pointer select-none min-w-0",
				"dim",
				className
			)}
			onClick={onClick}
		>
			{/* ユーザーID */}
			<span className="text-lg font-bold text-[var(--text-primary)] truncate min-w-0">
				{userId}
			</span>

			{/* 複数アカウントがある場合のVアイコン */}
			{hasMultipleAccounts && (
				<MaterialIcon
					icon="keyboard_arrow_down"
					size={20}
					className={cn(
						"text-[var(--text-secondary)] flex-shrink-0",
						"transition-transform duration-200 ease-in-out",
						isOpen && "rotate-180"
					)}
				/>
			)}
		</div>
	);
}
