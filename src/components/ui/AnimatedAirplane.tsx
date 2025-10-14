"use client";

import { cn } from "@/lib/utils/helpers";

export type OrbitType = "circle" | "custom";
export type AirplaneColor =
	| "blue"
	| "red"
	| "green"
	| "yellow"
	| "purple"
	| "gray";
export type AirplaneSize = "logo" | "mobile" | "tablet" | "desktop";

interface AnimatedAirplaneProps {
	orbitType?: OrbitType;
	color?: AirplaneColor;
	size?: AirplaneSize;
	duration?: number; // アニメーション時間（秒）
	radius?: number; // 正円用の半径
	radiusX?: number; // カスタム楕円用の横軸
	radiusY?: number; // カスタム楕円用の縦軸
	className?: string;
	style?: React.CSSProperties;
}

const colorClasses = {
	blue: "text-blue-500",
	red: "text-red-500",
	green: "text-green-500",
	yellow: "text-yellow-500",
	purple: "text-purple-500",
	gray: "text-gray-200",
};

const sizeClasses = {
	logo: "w-2 h-2",
	mobile: "w-4 h-4",
	tablet: "w-6 h-6",
	desktop: "w-8 h-8",
};

export function AnimatedAirplane({
	orbitType = "circle",
	color = "blue",
	size = "mobile",
	duration = 8,
	radius,
	radiusX,
	radiusY,
	className,
	style,
}: AnimatedAirplaneProps) {
	// 軌道半径の決定ロジック
	const getRadius = () => {
		if (orbitType === "circle") {
			const r = radius || 100; // デフォルト100px
			return { x: r, y: r };
		} else {
			return {
				x: radiusX || 150, // デフォルト150px
				y: radiusY || 100, // デフォルト100px
			};
		}
	};

	const orbitRadius = getRadius();
	// propsベースの一貫したアニメーション名を生成（Hydration対策）
	const uniqueId = `${orbitType}-${orbitRadius.x}-${orbitRadius.y}-${duration}-${color}`;
	const animationName =
		orbitType === "circle"
			? `orbit-circle-${uniqueId}`
			: `orbit-custom-${uniqueId}`;

	// 32個の支点でキーフレーム生成関数
	const generateCircleKeyframes = (r: number, animName: string) => {
		let keyframes = `@keyframes ${animName} {\n`;
		for (let i = 0; i <= 32; i++) {
			const percent = (i / 32) * 100;
			const angle = (i / 32) * 360;
			const radians = (angle * Math.PI) / 180;
			const x = r * Math.cos(radians);
			const y = r * Math.sin(radians);
			const zIndex = angle >= 180 && angle < 360 ? 15 : 5;
			keyframes += `${percent}% { transform: translateX(${x.toFixed(
				2
			)}px) translateY(${-y.toFixed(2)}px) rotate(${-angle.toFixed(
				2
			)}deg); z-index: ${zIndex}; }\n`;
		}
		keyframes += "}";
		return keyframes;
	};

	const generateCustomKeyframes = (
		rX: number,
		rY: number,
		animName: string
	) => {
		let keyframes = `@keyframes ${animName} {\n`;
		for (let i = 0; i <= 32; i++) {
			const percent = (i / 32) * 100;
			const angle = (i / 32) * 360;
			const radians = (angle * Math.PI) / 180;
			const x = rX * Math.cos(radians);
			const y = rY * Math.sin(radians);
			const zIndex = angle >= 180 && angle < 360 ? 15 : 5;
			keyframes += `${percent}% { transform: translateX(${x.toFixed(
				2
			)}px) translateY(${-y.toFixed(2)}px) rotate(${-angle.toFixed(
				2
			)}deg); z-index: ${zIndex}; }\n`;
		}
		keyframes += "}";
		return keyframes;
	};

	// アニメーションスタイルをインラインで定義（外部styleとマージ）
	const animationStyle: React.CSSProperties = {
		animation: `${animationName} ${duration}s linear infinite`,
		...(style || {}), // 外部から渡されたstyleをマージ
	};

	return (
		<>
			<style
				dangerouslySetInnerHTML={{
					__html:
						orbitType === "circle"
							? generateCircleKeyframes(orbitRadius.x, animationName)
							: generateCustomKeyframes(
									orbitRadius.x,
									orbitRadius.y,
									animationName
							  ),
				}}
			/>
			<div
				className={cn("relative  flex items-center justify-center", className)}
			>
				<svg
					className={cn(sizeClasses[size], colorClasses[color])}
					style={animationStyle}
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
				</svg>
			</div>
		</>
	);
}
