import React from "react";
import { ButtonProps } from "@/types";
import { cn } from "@/lib/utils";

export default function Button({
	onClick,
	disabled = false,
	variant = "primary",
	size = "md",
	className,
	children,
	...props
}: ButtonProps) {
	const baseClasses =
		"inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

	const variantClasses = {
		primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
		secondary:
			"bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
		outline:
			"border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
	};

	const sizeClasses = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-6 py-3 text-lg",
	};

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={cn(
				baseClasses,
				variantClasses[variant],
				sizeClasses[size],
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
