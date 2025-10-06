"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[];
	readonly userChoice: Promise<{
		outcome: "accepted" | "dismissed";
		platform: string;
	}>;
	prompt(): Promise<void>;
}

export default function PWAInstallButton() {
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [showInstallButton, setShowInstallButton] = useState(false);

	useEffect(() => {
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			setDeferredPrompt(e as BeforeInstallPromptEvent);
			setShowInstallButton(true);
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

		// Check if already installed
		window.addEventListener("appinstalled", () => {
			setShowInstallButton(false);
			setDeferredPrompt(null);
		});

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt
			);
		};
	}, []);

	const handleInstallClick = async () => {
		if (!deferredPrompt) return;

		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;

		if (outcome === "accepted") {
			setShowInstallButton(false);
		}
		setDeferredPrompt(null);
	};

	if (!showInstallButton) return null;

	return (
		<button
			onClick={handleInstallClick}
			className="fixed bottom-20 right-4 bg-gradient-to-r from-cyan-400 to-pink-400 text-white px-4 py-2 rounded-full shadow-lg hover:from-cyan-500 hover:to-pink-500 transition-all duration-200 z-50"
		>
			<svg
				className="w-5 h-5 mr-2 inline"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				/>
			</svg>
			アプリをインストール
		</button>
	);
}
