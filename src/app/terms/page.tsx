"use client";


export default function TermsPage() {
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
					<div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-100 to-pink-100 rounded-full flex items-center justify-center mb-8">
						<svg
							className="w-12 h-12 text-cyan-500"
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
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
						🚀 準備中です！
					</h2>
					<p className="text-lg text-gray-600 mb-8 leading-relaxed">
						利用規約の詳細を現在準備中です。
						<br />
						<span className="text-cyan-500 font-medium">
							素晴らしいサービス
						</span>
						をお届けするために
						<br />
						しっかりと整備しています。
					</p>
					<div className="bg-gradient-to-r from-cyan-50 to-pink-50 rounded-2xl p-6 border border-cyan-100">
						<p className="text-sm text-gray-500">✨ もうすぐ公開予定です</p>
					</div>
				</div>
			</div>
		</div>
	);
}
