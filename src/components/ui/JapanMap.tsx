"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface JapanMapProps {
	className?: string;
	width?: number;
	height?: number;
	style?: React.CSSProperties;
}

export function JapanMap({
	className,
	width = 800,
	height = 800,
	style,
}: JapanMapProps) {
	return (
		<div
			className={cn(
				"absolute z-10 flex items-center justify-center",
				className
			)}
			style={style}
		>
			<Image
				src="/japan.svg"
				alt="日本地図"
				width={width}
				height={height}
				className="max-w-none"
				priority
				style={{
					width: "100%",
					height: "100%",
					objectFit: "contain",
				}}
			/>
		</div>
	);
}
