import React from "react";

interface SearchBarProps {
	placeholder?: string;
	value?: string;
	onChange?: (value: string) => void;
	className?: string;
}

export default function SearchBar({
	placeholder = "検索",
	value,
	onChange,
	className = "",
}: SearchBarProps) {
	return (
		<div
			className={`flex items-center bg-[#EFEFEF] rounded-lg px-3 py-2 ${className}`}
		>
			{/* 検索アイコン */}
			<svg
				className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>

			{/* 検索入力 */}
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400 border-none appearance-none focus:outline-none focus:ring-0 focus:border-none"
				style={{ backgroundColor: "transparent" }}
			/>
		</div>
	);
}
