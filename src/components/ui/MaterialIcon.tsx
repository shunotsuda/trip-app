"use client";

import React from "react";
import { IconProps } from "@/types";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts";

interface MaterialIconProps extends IconProps {
	icon: string;
}

export default function MaterialIcon({
	icon,
	filled = false,
	className,
	size = 24,
}: MaterialIconProps) {
	const { mode } = useTheme();

	// ダークモードでは線が太く見えるので、wghtとGRADを調整
	const wght = mode === "dark" ? 100 : 300;
	const grad = mode === "dark" ? -25 : 0;

	return (
		<span
			className={cn("material-symbols-outlined", className)}
			style={{
				fontSize: `${size}px`,
				fontVariationSettings: filled
					? `'FILL' 1, 'wght' ${wght}, 'GRAD' ${grad}, 'opsz' 24`
					: `'FILL' 0, 'wght' ${wght}, 'GRAD' ${grad}, 'opsz' 24`,
				width: `${size}px`,
				height: `${size}px`,
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{icon}
		</span>
	);
}
