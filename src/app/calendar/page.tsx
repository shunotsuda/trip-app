"use client";

import {
	TopNavigationBar,
	BottomNavigationBar,
	MainContentArea,
	PageWrapper,
} from "@/components";

export default function CalendarPage() {
	return (
		<PageWrapper>
			{/* ヘッダー */}
			<TopNavigationBar
				title={{
					type: "title",
					content: "カレンダー",
				}}
				rightActions={[]}
			/>

			{/* メインコンテンツエリア */}
			<MainContentArea>
				{/* メインコンテンツ */}
				<div className="p-4">
					<div className=" rounded-lg shadow-sm p-6 text-center">
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
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<div className="text-[var(--text-primary)] text-lg mb-2">
							カレンダー機能
						</div>
						<p className="text-[var(--text-muted)] text-sm">
							スケジュール管理機能をここに実装予定
						</p>
					</div>
				</div>
			</MainContentArea>

			{/* ボトムナビ */}
			<BottomNavigationBar />
		</PageWrapper>
	);
}
