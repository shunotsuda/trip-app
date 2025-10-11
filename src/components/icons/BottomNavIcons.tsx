import React from "react";

interface IconProps {
	className?: string;
}

// 1. 発見アイコン（虫眼鏡）- 画像の一番左のデザインを完全再現
export function DiscoveryIcon({ className = "w-7 h-7" }: IconProps) {
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

export function DiscoveryIconFilled({ className = "w-7 h-7" }: IconProps) {
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

// 2. スワイプアイコン（2枚のカード重ね）- 画像の2番目のデザインを完コピ
export function SwipeIcon({ className = "w-7 h-7" }: IconProps) {
	return (
		<svg
			className={className}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			{/* 下のカード（奥） */}
			<rect x="3" y="9" width="14" height="9" rx="1" strokeWidth="1.5" />
			{/* 上のカード（手前、右上にずらして重ね） */}
			<rect x="7" y="6" width="14" height="9" rx="1" strokeWidth="1.5" />
		</svg>
	);
}

export function SwipeIconFilled({ className = "w-7 h-7" }: IconProps) {
	return (
		<svg className={className} fill="currentColor" viewBox="0 0 24 24">
			{/* 下のカード（奥） */}
			<rect x="3" y="9" width="14" height="9" rx="1" />
			{/* 上のカード（手前、右上にずらして重ね） */}
			<rect x="7" y="6" width="14" height="9" rx="1" />
		</svg>
	);
}

// 3. マップアイコン（折りたたみ地図）- 画像の3番目のデザインを完コピ
export function MapIcon({ className = "w-7 h-7" }: IconProps) {
	return (
		<svg
			className={className}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			{/* 地図の外枠 */}
			<rect x="3" y="4" width="18" height="16" rx="1" strokeWidth="1.5" />
			{/* 左の縦線 */}
			<line x1="9" y1="4" x2="9" y2="20" strokeWidth="1.5" />
			{/* 右の縦線 */}
			<line x1="15" y1="4" x2="15" y2="20" strokeWidth="1.5" />
			{/* 中央のジグザグ折り目 */}
			<path
				d="M3 8l3-1 3 1 3-1 3 1 3-1"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M3 12l3-1 3 1 3-1 3 1 3-1"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M3 16l3-1 3 1 3-1 3 1 3-1"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function MapIconFilled({ className = "w-7 h-7" }: IconProps) {
	return (
		<svg className={className} fill="currentColor" viewBox="0 0 24 24">
			{/* 地図の外枠 */}
			<rect x="3" y="4" width="18" height="16" rx="1" />
			{/* 左の縦線 */}
			<line x1="9" y1="4" x2="9" y2="20" stroke="white" strokeWidth="1.5" />
			{/* 右の縦線 */}
			<line x1="15" y1="4" x2="15" y2="20" stroke="white" strokeWidth="1.5" />
			{/* 中央のジグザグ折り目 */}
			<path
				d="M3 8l3-1 3 1 3-1 3 1 3-1"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
			<path
				d="M3 12l3-1 3 1 3-1 3 1 3-1"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
			<path
				d="M3 16l3-1 3 1 3-1 3 1 3-1"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
		</svg>
	);
}

// 4. しおりアイコン（ブックマーク）- 画像の4番目のデザインを完全再現
export function BookmarkIcon({ className = "w-7 h-7" }: IconProps) {
	return (
		<svg
			className={className}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function BookmarkIconFilled({ className = "w-7 h-7" }: IconProps) {
	return (
		<svg className={className} fill="currentColor" viewBox="0 0 24 24">
			<path
				d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
