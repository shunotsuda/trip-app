"use client";

import { BottomNavigationBar } from "@/components";

export default function MapPage() {
	return (
		<div className="min-h-dvh bg-white pb-20">
			{/* ヘッダー */}
			<div className="bg-white px-4 py-4 border-b border-gray-200">
				<h1 className="text-xl font-semibold text-black">マップ</h1>
			</div>

			{/* メインコンテンツ */}
			<div className="p-4">
				<div className="bg-white rounded-lg shadow-sm p-6 text-center">
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
							d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
						/>
					</svg>
					<div className="text-black text-lg mb-2">マップ機能</div>
					<p className="text-gray-500 text-sm">地図表示機能をここに実装予定</p>
				</div>
			</div>

			{/* ボトムナビゲーションバー */}
			<BottomNavigationBar />
		</div>
	);
}
