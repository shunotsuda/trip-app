"use client";

import React from "react";

interface Review {
	id: string;
	// 将来的に追加するプロパティ
}

interface ReviewGridProps {
	reviews: Review[];
}

export default function ReviewGrid({ reviews }: ReviewGridProps) {
	// レビューが空の場合（現在は常に空）
	if (reviews.length === 0) {
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
						d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
					/>
				</svg>
				<div className="text-black text-lg mb-2">レビューがありません</div>
				<button className="text-blue-500 text-sm">最初のレビューを書く</button>
			</div>
		);
	}

	// TODO: レビュー一覧の表示（将来実装）
	return <div className="bg-stone-100">{/* レビュー一覧をここに実装 */}</div>;
}
