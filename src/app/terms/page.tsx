"use client";

import PageLayout from "@/components/ui/PageLayout";

export default function TermsPage() {
	return (
		<PageLayout 
			title="" 
			backOnClick={() => window.history.back()}
			showLogo={false}
		>
			<div className="text-center">
				<div className="mb-8">
					<div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
						<svg
							className="w-10 h-10 text-blue-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
						現在作成中です
					</h1>
					<p className="text-lg md:text-xl text-gray-600 mb-8">
						利用規約ページを準備中です
					</p>
					<div className="text-6xl mb-6">⏳</div>
					<p className="text-sm md:text-base text-gray-500 leading-relaxed">
						申し訳ございませんが、利用規約ページは現在作成中です。<br />
						もうしばらくお待ちください。
					</p>
				</div>
			</div>
		</PageLayout>
	);
}