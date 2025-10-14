"use client";

import { useState } from "react";

interface FloatingActionButtonProps {
	onClick?: () => void;
	className?: string;
}

export default function FloatingActionButton({
	onClick,
	className = "",
}: FloatingActionButtonProps) {
	const [isPressed, setIsPressed] = useState(false);

	const handleClick = () => {
		setIsPressed(true);
		setTimeout(() => setIsPressed(false), 150);
		onClick?.();
	};

	return (
		<button
			onClick={handleClick}
			className={`
				fixed bottom-20 right-4 w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 flex items-center justify-center ${
					isPressed ? "scale-95" : "scale-100"
				} ${className}`}
			style={{
				boxShadow:
					"0 4px 12px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.7)",
			}}
		>
			{/* 赤いプラスアイコン */}
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 5V19M5 12H19"
					stroke="#dc2626"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
}
