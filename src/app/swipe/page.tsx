"use client";

import { useState } from "react";
import { BottomNavigationBar } from "@/components";
import { profileData } from "@/data/dummyData";

export default function SwipePage() {
	const [bottomNavActiveTab, setBottomNavActiveTab] = useState("swipe");

	return (
		<div className="min-h-dvh bg-stone-100 pb-20">
			{/* ヘッダー */}
			<div className="bg-white px-4 py-4 border-b border-gray-200">
				<h1 className="text-xl font-semibold text-black">スワイプ</h1>
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
							d="M4 6h16M4 10h16M4 14h16M4 18h16"
						/>
					</svg>
					<div className="text-black text-lg mb-2">スワイプ機能</div>
					<p className="text-gray-500 text-sm">
						カードスワイプ機能をここに実装予定
					</p>
				</div>
			</div>

			{/* ボトムナビゲーションバー */}
			<BottomNavigationBar
				activeTab={bottomNavActiveTab}
				onTabChange={setBottomNavActiveTab}
				profileImage={profileData.profileImage}
			/>
		</div>
	);
}
