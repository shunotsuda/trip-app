"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { MaterialIcon } from "@/components/ui";
import { profileData } from "@/data/dummyData";

export default function BottomNavigationBar() {
	const router = useRouter();
	const pathname = usePathname();

	// パスからアクティブタブを判定
	const getActiveTabFromPath = () => {
		if (pathname === "/") return "home";
		if (pathname === "/swipe") return "swipe";
		if (pathname === "/calendar") return "calendar";
		if (pathname === "/map") return "map";
		if (pathname === "/profile") return "profile";
		return "home";
	};

	const currentActiveTab = getActiveTabFromPath();

	const handleTabClick = (tabId: string) => {
		// 現在のページと同じ場合は何もしない
		if (tabId === currentActiveTab) {
			return;
		}
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
			case "profile":
				router.push("/profile");
				break;
		}
	};

	const navItems = [
		{
			id: "home",
			icon: (
				<MaterialIcon
					icon="home"
					filled={currentActiveTab === "home"}
					size={28}
				/>
			),
		},
		{
			id: "swipe",
			icon: (
				<MaterialIcon
					icon="amp_stories"
					filled={currentActiveTab === "swipe"}
					size={28}
				/>
			),
		},
		{
			id: "map",
			icon: (
				<MaterialIcon
					icon="map_pin_review"
					filled={currentActiveTab === "map"}
					size={28}
				/>
			),
		},
		{
			id: "calendar",
			icon: (
				<MaterialIcon
					icon="edit_calendar"
					filled={currentActiveTab === "calendar"}
					size={28}
				/>
			),
		},
		{
			id: "profile",
			icon: (
				<div
					className={`w-7 h-7 rounded-full overflow-hidden ${
						currentActiveTab === "profile"
							? "border-2 border-[var(--border-emphasis)]"
							: "border border-[var(--border-input)]"
					}`}
				>
					<Image
						src={profileData.profileImage}
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
		<nav className=" border-t border-[var(--border)]">
			<div className="flex items-center justify-around w-full px-3 pb-6">
				{navItems.map((item) => (
					<button
						key={item.id}
						onClick={() => handleTabClick(item.id)}
						className="flex flex-col items-center justify-center py-2 px-2 min-w-0 flex-1"
					>
						<div
							className={`w-7 h-7 flex items-center justify-center ${
								// currentActiveTab === item.id
								// 	? "text-[var(--text-primary)]"
								// 	: "text-[var(--text-disabled)]"
								"text-[var(--text-primary)]"
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
