"use client";

import React from "react";

// カードアイテムの型定義
export interface CardItem {
	id: string;
	icon?: React.ReactNode;
	image?: string; // プロフィール画像URL
	title: string;
	subtitle?: string; // サブタイトル（2行目のテキスト）
	description?: string;
	onClick?: () => void;
	showArrow?: boolean;
	className?: string;
}

// カードグループの型定義
export interface CardGroup {
	id: string;
	title?: string;
	description?: string;
	items: CardItem[];
	className?: string;
}

interface CardProps {
	item: CardItem;
}

interface CardGroupProps {
	group: CardGroup;
	className?: string;
}

// 個別カードコンポーネント
export default function Card({ item }: CardProps) {
	const {
		icon,
		image,
		title,
		subtitle,
		description,
		onClick,
		showArrow = true,
		className = "",
	} = item;

	return (
		<div
			className={`
				flex items-center p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer
				${onClick ? "cursor-pointer" : "cursor-default"}
				${className}
			`.trim()}
			onClick={onClick}
		>
			{/* 左側：プロフィール画像またはアイコン */}
			{image ? (
				<div className="flex-shrink-0 w-14 h-14 mr-3">
					<img
						src={image}
						alt={title}
						className="w-full h-full rounded-full object-cover"
					/>
				</div>
			) : icon ? (
				<div className="flex-shrink-0 w-6 h-6 mr-3 flex items-center justify-center">
					{icon}
				</div>
			) : null}

			{/* 中央：タイトル、サブタイトル、説明 */}
			<div className="flex-1 min-w-0">
				<div className="text-base font-medium text-gray-900">{title}</div>
				{subtitle && (
					<div className="text-sm text-gray-600 mt-0.5">{subtitle}</div>
				)}
				{description && (
					<div className="text-sm text-gray-500 mt-1 leading-relaxed">
						{description}
					</div>
				)}
			</div>

			{/* 右側：矢印 */}
			{showArrow && onClick && (
				<div className="flex-shrink-0 ml-3">
					<svg
						className="w-5 h-5 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</div>
			)}
		</div>
	);
}

// カードグループコンポーネント
export function CardGroup({ group, className = "" }: CardGroupProps) {
	const { title, description, items } = group;

	return (
		<div
			className={`bg-white rounded-lg overflow-hidden shadow-sm ${className}`}
		>
			{/* グループヘッダー */}
			{(title || description) && (
				<div className="px-4 py-3 border-b border-gray-100">
					{title && (
						<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
					)}
					{description && (
						<p className="text-sm text-gray-600 mt-1">{description}</p>
					)}
				</div>
			)}

			{/* カードアイテム */}
			<div className="divide-y divide-gray-100">
				{items.map((item, index) => (
					<Card key={item.id} item={item} />
				))}
			</div>
		</div>
	);
}

// 複数カードグループコンポーネント
interface CardGroupsProps {
	groups: CardGroup[];
	className?: string;
}

export function CardGroups({ groups, className = "" }: CardGroupsProps) {
	return (
		<div className={`space-y-4 ${className}`}>
			{groups.map((group) => (
				<CardGroup key={group.id} group={group} />
			))}
		</div>
	);
}
