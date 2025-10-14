"use client";

import { ReactNode } from "react";

interface PageWrapperProps {
	children: ReactNode;
	className?: string;
}

export default function PageWrapper({
	children,
	className = "",
}: PageWrapperProps) {
	return <div className={`h-dvh flex flex-col ${className}`}>{children}</div>;
}
