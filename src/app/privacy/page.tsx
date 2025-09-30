"use client";

import PageLayout from "@/components/ui/PageLayout";

export default function PrivacyPage() {
	return (
		<PageLayout 
			title="" 
			backOnClick={() => window.history.back()}
			showLogo={false}
		>
			<div className="text-center">
				<div className="mb-8">
					<div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
						<svg
							className="w-10 h-10 text-green-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
					</div>
					<h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
						現在作成中です
					</h1>
					<p className="text-lg md:text-xl text-gray-600 mb-8">
						プライバシーポリシーページを準備中です
					</p>
					<div className="text-6xl mb-6">🔒</div>
					<p className="text-sm md:text-base text-gray-500 leading-relaxed">
						申し訳ございませんが、プライバシーポリシーページは現在作成中です。<br />
						もうしばらくお待ちください。
					</p>
				</div>
			</div>
		</PageLayout>
	);
}