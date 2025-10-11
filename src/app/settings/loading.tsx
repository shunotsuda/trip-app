export default function Loading() {
	return (
		<div className="min-h-dvh bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 flex flex-col items-center justify-center relative overflow-hidden">
			{/* カスタムアニメーション用のスタイル */}
			<style
				dangerouslySetInnerHTML={{
					__html: `
					@keyframes fly {
						0% { transform: translateX(-50px) rotate(-5deg); }
						50% { transform: translateX(50px) rotate(5deg); }
						100% { transform: translateX(-50px) rotate(-5deg); }
					}
					.fly-animation {
						animation: fly 3s ease-in-out infinite, bounce 2s ease-in-out infinite;
					}
				`,
				}}
			/>

			{/* 雲の背景 */}
			<div className="absolute inset-0">
				{/* 雲1 */}
				<div className="absolute top-20 left-10 w-16 h-8 bg-white rounded-full opacity-80 animate-pulse">
					<div className="absolute -top-2 left-2 w-12 h-12 bg-white rounded-full"></div>
					<div className="absolute -top-1 right-1 w-10 h-10 bg-white rounded-full"></div>
				</div>

				{/* 雲2 */}
				<div
					className="absolute top-32 right-20 w-20 h-10 bg-white rounded-full opacity-60 animate-pulse"
					style={{ animationDelay: "1s" }}
				>
					<div className="absolute -top-3 left-3 w-14 h-14 bg-white rounded-full"></div>
					<div className="absolute -top-2 right-2 w-12 h-12 bg-white rounded-full"></div>
				</div>

				{/* 雲3 */}
				<div
					className="absolute bottom-32 left-1/4 w-14 h-7 bg-white rounded-full opacity-70 animate-pulse"
					style={{ animationDelay: "2s" }}
				>
					<div className="absolute -top-2 left-1 w-10 h-10 bg-white rounded-full"></div>
					<div className="absolute -top-1 right-1 w-8 h-8 bg-white rounded-full"></div>
				</div>
			</div>

			{/* 飛行機アニメーション */}
			<div className="relative z-10">
				{/* 飛行機本体 */}
				<div className="relative">
					{/* 機体 */}
					<svg
						className="w-16 h-16 text-white fly-animation"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
					</svg>

					{/* 飛行機の影 */}
					<div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-black opacity-20 rounded-full animate-pulse"></div>
				</div>
			</div>

			{/* ローディングテキスト */}
			<div className="mt-8 text-center">
				<div className="text-white text-lg font-medium mb-2">
					設定を読み込み中...
				</div>
				<div className="flex items-center justify-center space-x-1">
					<div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
					<div
						className="w-2 h-2 bg-white rounded-full animate-bounce"
						style={{ animationDelay: "0.1s" }}
					></div>
					<div
						className="w-2 h-2 bg-white rounded-full animate-bounce"
						style={{ animationDelay: "0.2s" }}
					></div>
				</div>
			</div>
		</div>
	);
}
