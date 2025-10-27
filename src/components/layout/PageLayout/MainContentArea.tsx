"use client";

import { ReactNode } from "react";

interface MainContentAreaProps {
	children: ReactNode;
	className?: string;
}

const MainContentArea = ({
	children,
	className = "",
}: MainContentAreaProps) => {
	return (
		<main className={`flex-grow min-h-0 overflow-hidden ${className}`}>
			{children}
		</main>
	);
};

export default MainContentArea;
