"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";

interface LoadingContextType {
	isLoading: boolean;
	loadingMessage: string;
	showLoading: (message?: string) => void;
	hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
	children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState("読み込み中...");

	const showLoading = (message: string = "読み込み中...") => {
		setLoadingMessage(message);
		setIsLoading(true);
	};

	const hideLoading = () => {
		setIsLoading(false);
	};

	return (
		<LoadingContext.Provider
			value={{
				isLoading,
				loadingMessage,
				showLoading,
				hideLoading,
			}}
		>
			{children}
			{isLoading && (
				<LoadingScreen message={loadingMessage} fullScreen={false} />
			)}
		</LoadingContext.Provider>
	);
}

export function useLoading() {
	const context = useContext(LoadingContext);
	if (context === undefined) {
		throw new Error("useLoading must be used within a LoadingProvider");
	}
	return context;
}
