"use client";

interface LoadingScreenProps {
	message?: string;
	fullScreen?: boolean; // 全画面表示かどうか
	style?: React.CSSProperties; // カスタムスタイル
}

export default function LoadingScreen({
	message = "読み込み中...",
	fullScreen = true, // デフォルトは全画面
	style,
}: LoadingScreenProps) {
	const containerClasses = fullScreen
		? "fixed inset-0 z-50 bg-peach" // 全画面オーバーレイ
		: "absolute inset-0 bg-peach z-10"; // コンテンツエリアのみ（完全に隠す）

	return (
		<div
			className={`${containerClasses} flex flex-col items-center justify-center`}
			style={style}
		>
			<style>{`
				@keyframes rotate-360 {
					from { transform: rotate(0deg); }
					to { transform: rotate(360deg); }
				}
			`}</style>

			{/* ローディングリング */}
			<div className="relative">
				{/* リングのトラック（影） */}
				<div
					className="absolute rounded-full"
					style={{
						width: "60px",
						height: "60px",
						top: "50%",
						left: "50%",
						marginTop: "-30px",
						marginLeft: "-30px",
						boxShadow: "0 0 10px 4px rgba(0, 0, 0, 0.1) inset",
					}}
				></div>

				{/* 回転するリング（パープルグラデーション） */}
				<div
					className="absolute rounded-full"
					style={{
						width: "60px",
						height: "60px",
						top: "50%",
						left: "50%",
						marginTop: "-30px",
						marginLeft: "-30px",
						boxShadow:
							"0 4px 0 rgb(216, 180, 254) inset, 0 -4px 0 rgb(192, 132, 252) inset",
						animation: "rotate-360 2s linear infinite",
					}}
				></div>
			</div>

			{/* ローディングテキスト（全画面時のみ表示） */}
			{fullScreen && (
				<p className="mt-16 text-lg font-medium text-gray-700">{message}</p>
			)}
		</div>
	);
}
