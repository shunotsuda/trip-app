"use client";

import {
	TopNavigationBar,
	BottomNavigationBar,
	MainContentArea,
	PageWrapper,
} from "@/components";

export default function HomePage() {
	return (
		<PageWrapper>
			{/* ヘッダー */}
			<TopNavigationBar
				title={{
					type: "title",
					content: "ホーム",
				}}
				rightActions={[]}
			/>

			{/* メインコンテンツエリア */}
			<MainContentArea className="bg-[var(--bg-content)]">
				<div className="p-4">
					<div className="bg-[var(--bg-page)] rounded-lg shadow-sm p-6 text-center">
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
								d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
							/>
						</svg>
						<div className="text-[var(--text-primary)] text-lg mb-2">
							ホーム機能
						</div>
						<p className="text-[var(--text-muted)] text-sm">
							フィード機能をここに実装予定
						</p>
					</div>
				</div>
			</MainContentArea>

			{/* ボトムナビ */}
			<BottomNavigationBar />
		</PageWrapper>
	);
}
