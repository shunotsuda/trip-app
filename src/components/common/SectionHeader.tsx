import React from "react";

interface SectionHeaderProps {
	title: string;
	showViewAll?: boolean;
	onViewAllClick?: () => void;
	className?: string;
}

export default function SectionHeader({
	title,
	showViewAll = false,
	onViewAllClick,
	className = "",
}: SectionHeaderProps) {
	return (
		<div className={`flex items-center justify-between mb-3 ${className}`}>
			{/* セクションタイトル */}
			<h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
				{title}
			</h3>

			{/* すべて見るリンク */}
			{showViewAll && (
				<button
					onClick={onViewAllClick}
					className="text-sm font-medium text-blue-500 hover:text-blue-600"
				>
					すべて見る
				</button>
			)}
		</div>
	);
}
