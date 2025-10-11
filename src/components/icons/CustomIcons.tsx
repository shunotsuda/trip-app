import React from "react";

interface IconProps {
	className?: string;
}

// 虫眼鏡アイコン（画像の一番左のデザインを完全再現）
export function SearchIcon({ className = "w-7 h-7" }: IconProps) {
	return (
		<svg
			className={className}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<circle cx="11" cy="11" r="8" strokeWidth="1.5" />
			<path d="m21 21-4.35-4.35" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	);
}

export function SearchIconFilled({ className = "w-7 h-7" }: IconProps) {
	return (
		<svg className={className} fill="currentColor" viewBox="0 0 24 24">
			<circle cx="11" cy="11" r="8" />
			<path
				d="m21 21-4.35-4.35"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				fill="none"
			/>
		</svg>
	);
}

// カレンダーアイコン（シンプルなカレンダー）
export function CalendarIcon({ className = "w-7 h-7" }: IconProps) {
	return (
		<svg
			className={className}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<rect
				x="3"
				y="4"
				width="18"
				height="18"
				rx="2"
				ry="2"
				strokeWidth="1.5"
			/>
			<line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.5" />
			<line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.5" />
			<line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5" />
		</svg>
	);
}

export function CalendarIconFilled({ className = "w-7 h-7" }: IconProps) {
	return (
		<svg className={className} fill="currentColor" viewBox="0 0 24 24">
			<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
			<rect x="3" y="10" width="18" height="12" />
			<line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="1.5" />
			<line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="1.5" />
			<line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="1.5" />
		</svg>
	);
}

// マップアイコン（折りたたみ地図）
export function MapIcon({ className = "w-7 h-7" }: IconProps) {
	return (
		<svg
			className={className}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M9 3v15M15 6v15" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	);
}

export function MapIconFilled({ className = "w-7 h-7" }: IconProps) {
	return (
		<svg className={className} fill="currentColor" viewBox="0 0 24 24">
			<path
				d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M9 3v15M15 6v15"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
}

// スワイプアイコン（2枚のカード重ね）
export function SwipeIcon({ className = "w-7 h-7" }: IconProps) {
	return (
		<svg
			className={className}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<rect x="3" y="4" width="14" height="10" rx="2" strokeWidth="1.5" />
			<rect x="7" y="8" width="14" height="10" rx="2" strokeWidth="1.5" />
		</svg>
	);
}

export function SwipeIconFilled({ className = "w-7 h-7" }: IconProps) {
	return (
		<svg className={className} fill="currentColor" viewBox="0 0 24 24">
			<rect x="3" y="4" width="14" height="10" rx="2" />
			<rect x="7" y="8" width="14" height="10" rx="2" />
		</svg>
	);
}
