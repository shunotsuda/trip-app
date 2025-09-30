"use client";


export default function PrivacyPage() {
	return (
		<div className="min-h-screen bg-stone-50 px-4 py-4">
			<div className="w-full max-w-md md:max-w-lg lg:max-w-xl md:mx-auto">
				{/* Back Button - Top Left */}
				<div className="mb-4 md:mb-3">
					<button
						onClick={() => window.history.back()}
						className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
					>
						<svg
							className="w-5 h-5 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						戻る
					</button>
				</div>

				{/* Content */}
				<div className="text-center py-8">
					<div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-100 to-cyan-100 rounded-full flex items-center justify-center mb-8">
						<svg
							className="w-12 h-12 text-pink-500"
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
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
						🔒 準備中です！
					</h2>
					<p className="text-lg text-gray-600 mb-8 leading-relaxed">
						プライバシーポリシーの詳細を現在準備中です。
						<br />
						<span className="text-pink-500 font-medium">
							あなたのプライバシー
						</span>
						を大切に
						<br />
						しっかりと保護する方針を策定中です。
					</p>
					<div className="bg-gradient-to-r from-pink-50 to-cyan-50 rounded-2xl p-6 border border-pink-100">
						<p className="text-sm text-gray-500">
							🛡️ セキュリティを最優先に準備中
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
