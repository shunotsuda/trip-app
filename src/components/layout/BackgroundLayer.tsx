"use client";

import { useTheme } from "@/contexts";
import Image from "next/image";

export default function BackgroundLayer() {
	const { background, backgroundImage } = useTheme();

	// 背景画像がある場合
	if (backgroundImage) {
		return (
			<div className="fixed inset-0 -z-10">
				{/* 背景画像 */}
				<Image
					src={backgroundImage}
					alt="Background"
					fill
					className="object-cover"
					quality={85}
					priority
				/>
				{/* 半透明オーバーレイ */}
				<div className="absolute inset-0 bg-[var(--bg-page)] opacity-75"></div>
			</div>
		);
	}

	// 背景色のみの場合
	return <div className={`fixed inset-0 -z-10 ${background}`}></div>;
}
