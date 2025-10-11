"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
	BookmarkIcon,
	BookmarkIconFilled,
} from "@/components/icons/BottomNavIcons";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { HiHome } from "react-icons/hi2";
import { BsFilesAlt, BsCalendar3 } from "react-icons/bs";

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
	const router = useRouter();
	const pathname = usePathname();

	// パスからアクティブタブを判定
	const getActiveTabFromPath = () => {
		if (pathname === "/") return "home";
		if (pathname === "/swipe") return "swipe";
		if (pathname === "/calendar") return "calendar";
		if (pathname === "/map") return "map";
		if (pathname === "/bookmark") return "bookmark";
		if (pathname === "/profile") return "profile";
		return "home";
	};

	const currentActiveTab = getActiveTabFromPath();

	const handleTabClick = (tabId: string) => {
		onTabChange(tabId);

		// ページ遷移
		switch (tabId) {
			case "home":
				router.push("/");
				break;
			case "swipe":
				router.push("/swipe");
				break;
			case "calendar":
				router.push("/calendar");
				break;
			case "map":
				router.push("/map");
				break;
			case "bookmark":
				router.push("/bookmark");
				break;
			case "profile":
				router.push("/profile");
				break;
		}
	};

	const navItems = [
		{
			id: "home",
			icon: <HiHome className="w-7 h-7" />,
		},
		{
			id: "swipe",
			icon: <BsFilesAlt className="w-7 h-7" />,
		},
		{
			id: "calendar",
			icon: <BsCalendar3 className="w-7 h-7" />,
		},
		{
			id: "map",
			icon: <LiaMapMarkedAltSolid className="w-7 h-7" />,
		},
		{
			id: "profile",
			icon: (
				<div
					className={`w-7 h-7 rounded-full overflow-hidden ${
						currentActiveTab === "profile"
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
			<div className="flex items-center justify-around w-full px-3 pt-3 pb-6">
				{navItems.map((item) => (
					<button
						key={item.id}
						onClick={() => handleTabClick(item.id)}
						className="flex flex-col items-center justify-center py-2 px-2 min-w-0 flex-1"
					>
						<div
							className={`w-7 h-7 flex items-center justify-center ${
								currentActiveTab === item.id ? "text-black" : "text-gray-400"
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
