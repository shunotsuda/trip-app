import React from "react";
import { IconProps } from "@/types";
import { cn } from "@/lib/utils";

interface MaterialIconProps extends IconProps {
	icon: string;
}

export default function MaterialIcon({
	icon,
	filled = false,
	className,
	size = 24,
}: MaterialIconProps) {
	return (
		<span
			className={cn("material-symbols-outlined", className)}
			style={{
				fontSize: `${size}px`,
				fontVariationSettings: filled
					? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48"
					: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48",
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
