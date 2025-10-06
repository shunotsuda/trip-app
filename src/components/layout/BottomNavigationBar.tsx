"use client";

import Image from "next/image";

interface BottomNavigationBarProps {
	activeTab: string;
	onTabChange: (tab: string) => void;
	profileImage: string;
}

export default function BottomNavigationBar({
	activeTab,
	onTabChange,
	profileImage,
}: BottomNavigationBarProps) {
	const navItems = [
		{
			id: "home",
			icon: (
				<svg
					className="w-7 h-7"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
			),
		},
		{
			id: "search",
			icon: (
				<svg
					className="w-7 h-7"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			),
		},
		{
			id: "create",
			icon: (
				<svg
					className="w-7 h-7"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M12 4v16m8-8H4"
					/>
				</svg>
			),
		},
		{
			id: "reels",
			icon: (
				<svg
					className="w-7 h-7"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
					/>
				</svg>
			),
		},
		{
			id: "profile",
			icon: (
				<div
					className={`w-7 h-7 rounded-full overflow-hidden ${
						activeTab === "profile"
							? "border-2 border-black"
							: "border border-gray-300"
					}`}
				>
					<Image
						src={profileImage}
						alt="Profile"
						width={28}
						height={28}
						className="w-full h-full object-cover"
					/>
				</div>
			),
		},
	];

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-1000 bg-white border-t border-gray-200">
			<div className="flex items-center justify-around w-full px-3 py-3">
				{navItems.map((item) => (
					<button
						key={item.id}
						onClick={() => onTabChange(item.id)}
						className="flex flex-col items-center justify-center py-2 px-2 min-w-0 flex-1"
					>
						<div
							className={`w-7 h-7 flex items-center justify-center ${
								activeTab === item.id ? "text-black" : "text-gray-400"
							}`}
						>
							{item.icon}
						</div>
					</button>
				))}
			</div>
		</nav>
	);
}
