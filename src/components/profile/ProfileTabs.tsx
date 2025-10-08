"use client";

import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

interface ProfileTabsProps {
	activeTab: string;
	onTabChange: (tab: string) => void;
	children: React.ReactNode;
}

export default function ProfileTabs({
	activeTab,
	onTabChange,
	children,
}: ProfileTabsProps) {
	const tabs = [
		{
			id: "posts",
			label: "投稿",
			icon: (isActive: boolean) => (
				<svg
					className={`w-4 h-4 ${isActive ? "drop-shadow-md" : ""}`}
					fill={isActive ? "url(#rainbow)" : "none"}
					stroke={isActive ? "none" : "#9CA3AF"}
					viewBox="0 0 24 24"
				>
					<defs>
						<linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#ff0000" />
							<stop offset="16.66%" stopColor="#ff8000" />
							<stop offset="33.33%" stopColor="#ffff00" />
							<stop offset="50%" stopColor="#80ff00" />
							<stop offset="66.66%" stopColor="#00ff00" />
							<stop offset="83.33%" stopColor="#0080ff" />
							<stop offset="100%" stopColor="#8000ff" />
						</linearGradient>
					</defs>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z"
					/>
				</svg>
			),
		},
		{
			id: "reviews",
			label: "レビュー",
			icon: (isActive: boolean) => (
				<svg
					className={`w-4 h-4 ${isActive ? "drop-shadow-md" : ""}`}
					fill={isActive ? "url(#gold-star)" : "none"}
					stroke={isActive ? "none" : "#9CA3AF"}
					viewBox="0 0 24 24"
				>
					<defs>
						<linearGradient id="gold-star" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#FFD700" />
							<stop offset="30%" stopColor="#FFA500" />
							<stop offset="60%" stopColor="#FFD700" />
							<stop offset="100%" stopColor="#FFA500" />
						</linearGradient>
					</defs>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
					/>
				</svg>
			),
		},
		{
			id: "favorites",
			label: "気になる",
			icon: (isActive: boolean) => (
				<svg
					className={`w-4 h-4 ${isActive ? "drop-shadow-md" : ""}`}
					fill={isActive ? "url(#red-heart)" : "none"}
					stroke={isActive ? "none" : "#9CA3AF"}
					viewBox="0 0 24 24"
				>
					<defs>
						<linearGradient id="red-heart" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#FF0000" />
							<stop offset="50%" stopColor="#FF4444" />
							<stop offset="100%" stopColor="#FF0000" />
						</linearGradient>
					</defs>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
					/>
				</svg>
			),
		},
		{
			id: "itinerary",
			label: "旅しおり",
			icon: (isActive: boolean) => (
				<svg
					className={`w-4 h-4 ${isActive ? "drop-shadow-md" : ""}`}
					fill={isActive ? "url(#blue-plane)" : "none"}
					stroke={isActive ? "none" : "#9CA3AF"}
					viewBox="0 0 24 24"
				>
					<defs>
						<linearGradient id="blue-plane" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#3B82F6" />
							<stop offset="50%" stopColor="#60A5FA" />
							<stop offset="100%" stopColor="#3B82F6" />
						</linearGradient>
					</defs>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
					/>
				</svg>
			),
		},
	];

	const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
		onTabChange(newValue);
	};

	return (
		<>
			<Box
				sx={{
					position: "sticky",
					top: "64px",
					zIndex: 40,
					backgroundColor: "white",
					borderBottom: "1px solid #e5e7eb",
				}}
			>
				<Tabs
					value={activeTab}
					onChange={handleTabChange}
					variant="fullWidth"
					sx={{
						minHeight: "48px",
						"& .MuiTabs-indicator": {
							backgroundColor: "transparent",
						},
						"& .MuiTab-root": {
							minHeight: "48px",
							fontSize: "0.7rem",
							fontWeight: 700,
							color: "#9CA3AF",
							textTransform: "none",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
							"&.Mui-selected": {
								color: "#374151",
							},
							"&::after": {
								content: '""',
								position: "absolute",
								bottom: 0,
								left: "16px",
								right: "16px",
								height: "3px",
								backgroundColor: "transparent",
								transition: "all 0.3s ease-in-out",
								borderRadius: "2px 2px 0 0",
							},
						},
						"& .MuiTab-root.Mui-selected::after": {
							background:
								"linear-gradient(135deg, #374151 0%, #6b7280 50%, #374151 100%)",
							boxShadow:
								"0 2px 4px rgba(55, 65, 81, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
						},
					}}
				>
					{tabs.map((tab) => (
						<Tab
							key={tab.id}
							value={tab.id}
							label={tab.label}
							icon={tab.icon(activeTab === tab.id)}
							iconPosition="start"
						/>
					))}
				</Tabs>
			</Box>

			{/* TabPanelコンテンツ */}
			{children}
		</>
	);
}
