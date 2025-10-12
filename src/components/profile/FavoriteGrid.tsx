"use client";

import React from "react";

interface Favorite {
	id: string;
	// 将来的に追加するプロパティ
}

interface FavoriteGridProps {
	favorites: Favorite[];
}

export default function FavoriteGrid({ favorites }: FavoriteGridProps) {
	// お気に入りが空の場合（現在は常に空）
	if (favorites.length === 0) {
		return (
			<div className="bg-stone-100 text-center py-12">
				<svg
					className="w-16 h-16 text-gray-400 mx-auto mb-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
					/>
				</svg>
				<div className="text-black text-lg mb-2">気になる投稿がありません</div>
				<button className="text-blue-500 text-sm">投稿を探してみよう</button>
			</div>
		);
	}

	// TODO: お気に入り一覧の表示（将来実装）
	return <div className="bg-stone-100">{/* お気に入り一覧をここに実装 */}</div>;
}
