import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider, LoadingProvider, ThemeProvider } from "@/contexts";
import { ModalContainer } from "@/components/ui/Modal";
import { BackgroundLayer } from "@/components/layout";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Travel Japan",
	description: "旅行をより楽しく",
	formatDetection: {
		telephone: false,
	},
};

export const viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
				/>
				{/* テーマフラッシュ防止スクリプト */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function() {
								const savedMode = localStorage.getItem('userThemeMode');
								if (savedMode) {
									document.documentElement.setAttribute('data-theme', savedMode);
								}
							})();
						`,
					}}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased `}
				suppressHydrationWarning={true}
			>
				<ModalProvider>
					<LoadingProvider>
						<ThemeProvider>
							<BackgroundLayer />
							<div className="relative z-0">
								{children}
								<ModalContainer />
							</div>
						</ThemeProvider>
					</LoadingProvider>
				</ModalProvider>
			</body>
		</html>
	);
}
