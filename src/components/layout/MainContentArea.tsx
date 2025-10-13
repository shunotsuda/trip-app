"use client";

import { ReactNode } from "react";

interface MainContentAreaProps {
	children: ReactNode;
	className?: string;
}

export default function MainContentArea({
	children,
	className = "",
}: MainContentAreaProps) {
	return (
		<main className={`flex-1 overflow-y-auto relative ${className}`}>{children}</main>
	);
}
