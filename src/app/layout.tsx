import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider, LoadingProvider } from "@/contexts";
import { ModalContainer } from "@/components/ui/Modal";

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
		<html lang="ja">
			<head></head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased `}
				suppressHydrationWarning={true}
			>
				<ModalProvider>
					<LoadingProvider>
						{children}
						<ModalContainer />
					</LoadingProvider>
				</ModalProvider>
			</body>
		</html>
	);
}
