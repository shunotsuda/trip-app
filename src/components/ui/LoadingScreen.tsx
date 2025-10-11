"use client";

import { AnimatedAirplane } from "@/components/ui";
import { JapanMap } from "@/components/ui";

interface LoadingScreenProps {
	message?: string;
	showAirplanes?: boolean;
	showMap?: boolean;
}

export default function LoadingScreen({
	message = "読み込み中...",
	showAirplanes = true,
	showMap = true,
}: LoadingScreenProps) {
	return (
		<div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
			{/* 背景の日本地図 */}
			{showMap && (
				<JapanMap
					className="absolute opacity-10"
					style={{
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "100vw",
						height: "100vh",
					}}
				/>
			)}

			{/* アニメーション飛行機 */}
			{showAirplanes && (
				<div className="absolute inset-0 flex items-center justify-center">
					{/* 小さな飛行機 - 内側軌道 */}
					<AnimatedAirplane
						orbitType="custom"
						radiusX={60}
						radiusY={30}
						color="blue"
						size="logo"
						duration={4}
						className="absolute"
					/>
					{/* 中サイズ飛行機 - 中間軌道 */}
					<AnimatedAirplane
						orbitType="custom"
						radiusX={120}
						radiusY={60}
						color="green"
						size="mobile"
						duration={6}
						className="absolute"
					/>
					{/* 大きな飛行機 - 外側軌道 */}
					<AnimatedAirplane
						orbitType="custom"
						radiusX={200}
						radiusY={100}
						color="red"
						size="tablet"
						duration={8}
						className="absolute"
					/>
				</div>
			)}

			{/* ローディングメッセージとスピナー */}
			<div className="relative z-10 flex flex-col items-center justify-center space-y-4">
				{/* スピナー */}
				<div className="relative">
					<div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
					<div
						className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-green-500 rounded-full animate-spin"
						style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
					></div>
				</div>

				{/* メッセージ */}
				<div className="text-center">
					<p className="text-lg font-medium text-gray-700 mb-2">{message}</p>
					<div className="flex space-x-1 justify-center">
						<div
							className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
							style={{ animationDelay: "0ms" }}
						></div>
						<div
							className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
							style={{ animationDelay: "150ms" }}
						></div>
						<div
							className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
							style={{ animationDelay: "300ms" }}
						></div>
					</div>
				</div>
			</div>
		</div>
	);
}
