"use client";

import { JapanMap, AnimatedAirplane } from "@/components/ui";

export default function LoadingDemo() {
	return (
		<div className="min-h-dvh bg-white flex flex-col items-center justify-center relative overflow-hidden">
			{/* 日本地図オブジェクト */}
			<JapanMap
				className="absolute z-10"
				style={{
					top: "50%",
					left: "50%",
					transform: "translate(-60%, -50%)",
					width: "100vw",
					height: "100vh",
				}}
			/>

			{/* 全ての飛行機を画面中央の同じ位置に配置 */}
			<div className="absolute inset-0 flex items-center justify-center">
				<AnimatedAirplane
					orbitType="custom"
					radiusX={30}
					radiusY={15}
					color="green"
					size="logo"
					duration={6}
					className="absolute"
				/>
				<AnimatedAirplane
					orbitType="custom"
					radiusX={160}
					radiusY={80}
					color="blue"
					size="mobile"
					duration={6}
					className="absolute"
				/>

				<AnimatedAirplane
					orbitType="custom"
					radiusX={300}
					radiusY={150}
					color="red"
					size="tablet"
					duration={6}
					className="absolute"
				/>

				<AnimatedAirplane
					orbitType="custom"
					radiusX={40}
					radiusY={10}
					color="purple"
					size="desktop"
					duration={6}
					className="absolute"
				/>
			</div>
		</div>
	);
}
