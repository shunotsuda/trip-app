"use client";

import {
	TopNavigationBar,
	BottomNavigationBar,
	MainContentArea,
	PageWrapper,
} from "@/components";

export default function SwipePage() {
	return (
		<PageWrapper>
			{/* ヘッダー */}
			<TopNavigationBar
				title={{
					type: "title",
					content: "スワイプ",
				}}
				rightActions={[]}
			/>

			{/* メインコンテンツエリア */}
			<MainContentArea className="">
				<div className="p-4">
					<div className="rounded-lg shadow-sm p-6 text-center">
						<svg
							className="w-16 h-16 text-[var(--text-disabled)] mx-auto mb-4"
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
						<div className="text-[var(--text-primary)] text-lg mb-2">
							スワイプ機能
						</div>
						<p className="text-[var(--text-muted)] text-sm">
							カードスワイプ機能をここに実装予定
						</p>
					</div>
				</div>
			</MainContentArea>

			{/* ボトムナビ */}
			<BottomNavigationBar />
		</PageWrapper>
	);
}
