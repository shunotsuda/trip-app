"use client";

interface ProfileTabsProps {
	activeTab: string;
	onTabChange: (tab: string) => void;
}

export default function ProfileTabs({
	activeTab,
	onTabChange,
}: ProfileTabsProps) {
	const tabs = [
		{
			id: "posts",
			label: "投稿",
			icon: (isActive: boolean) => (
				<svg
					className={`w-5 h-5 ${isActive ? "drop-shadow-md" : ""}`}
					fill={isActive ? "url(#gradient)" : "none"}
					stroke={isActive ? "none" : "currentColor"}
					viewBox="0 0 24 24"
				>
					{isActive && (
						<defs>
							<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
								<stop
									offset="0%"
									style={{ stopColor: "#87CEEB", stopOpacity: 1 }}
								/>
								<stop
									offset="60%"
									style={{ stopColor: "#87CEEB", stopOpacity: 1 }}
								/>
								<stop
									offset="60%"
									style={{ stopColor: "#9ACD32", stopOpacity: 1 }}
								/>
								<stop
									offset="100%"
									style={{ stopColor: "#9ACD32", stopOpacity: 1 }}
								/>
							</linearGradient>
						</defs>
					)}
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
			),
		},
		{
			id: "reviews",
			label: "レビュー",
			icon: (isActive: boolean) => (
				<svg
					className={`w-5 h-5 ${isActive ? "drop-shadow-md" : ""}`}
					fill={isActive ? "#FFA500" : "none"}
					stroke={isActive ? "none" : "currentColor"}
					viewBox="0 0 24 24"
				>
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
					className={`w-5 h-5 ${isActive ? "drop-shadow-md" : ""}`}
					fill={isActive ? "#E91E63" : "none"}
					stroke={isActive ? "none" : "currentColor"}
					viewBox="0 0 24 24"
				>
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
					className={`w-5 h-5 ${isActive ? "drop-shadow-md" : ""}`}
					fill={isActive ? "#3B82F6" : "none"}
					stroke={isActive ? "none" : "currentColor"}
					viewBox="0 0 24 24"
				>
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

	return (
		<div className="bg-white border-t border-gray-200">
			<div className="flex">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => onTabChange(tab.id)}
						className={`flex-1 flex items-center justify-center py-3 relative ${
							activeTab === tab.id ? "text-gray-700" : "text-gray-400"
						}`}
					>
						<div className="flex items-center space-x-1">
							{typeof tab.icon === "function"
								? tab.icon(activeTab === tab.id)
								: tab.icon}
							<span className="text-xs font-medium">{tab.label}</span>
						</div>
						{activeTab === tab.id && (
							<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700"></div>
						)}
					</button>
				))}
			</div>
		</div>
	);
}
