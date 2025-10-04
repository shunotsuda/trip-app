"use client";

import { useState } from "react";
import {
	ProfileHeader,
	ProfileTabs,
	PostGrid,
	BottomNavigationBar,
	TopNavigationBar,
} from "@/components";

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState("posts");
	const [bottomNavActiveTab, setBottomNavActiveTab] = useState("profile");

	// プロフィールデータ（画像から抽出した正確な値）
	const profileData = {
		username: "~Shun~", // ユーザーがコピペしたフォント部分
		posts: 1580, // 全ての画像を使用
		followers: 125000, // 12.5万
		following: 2390000, // 239万
		bio: [
			"/",
			"❤ Italian ❤",
			"~ 1999.10.20 ~",
			"Chiba ⇔ Tokyo",
			"@ shun.1020_potd",
		],
		profileImage: "/images/profile/プロフィールアイコン画像.JPG",
	};

	// 投稿データ（全ての画像を使用）
	const posts = [
		{ id: "1", image: "/images/profile/投稿画像1.JPG" },
		{ id: "2", image: "/images/profile/投稿画像2.JPG" },
		{ id: "3", image: "/images/profile/投稿画像3.JPG" },
		{ id: "4", image: "/images/profile/投稿画像4.JPG", isVideo: true }, // 動画アイコンあり
		{ id: "5", image: "/images/profile/投稿画像5.JPG" },
		{ id: "6", image: "/images/profile/投稿画像6.JPG" },
		{ id: "7", image: "/images/profile/投稿画像7.JPG" },
		{ id: "8", image: "/images/profile/IMG_7659.JPG" },
		{ id: "9", image: "/images/profile/IMG_7660.JPG" },
		{ id: "10", image: "/images/profile/IMG_7661.JPG" },
		{ id: "11", image: "/images/profile/IMG_7663.JPG" },
		{ id: "12", image: "/images/profile/IMG_7671.JPG" },
		{ id: "13", image: "/images/profile/IMG_7672.JPG" },
		{ id: "14", image: "/images/profile/IMG_7673.JPG" },
		{ id: "15", image: "/images/profile/IMG_7674.JPG" },
		{ id: "16", image: "/images/profile/IMG_7675.JPG" },
		{ id: "17", image: "/images/profile/IMG_7677.JPG" },
		{ id: "18", image: "/images/profile/IMG_7678.JPG" },
		{ id: "19", image: "/images/profile/IMG_7679.JPG" },
		{ id: "20", image: "/images/profile/IMG_7680.JPG" },
		{ id: "21", image: "/images/profile/IMG_7681.JPG" },
		{ id: "22", image: "/images/profile/IMG_7682.JPG" },
		{ id: "23", image: "/images/profile/IMG_7683.JPG" },
		{ id: "24", image: "/images/profile/IMG_7684.JPG" },
		{ id: "25", image: "/images/profile/IMG_7685.JPG" },
		{ id: "26", image: "/images/profile/IMG_7686.JPG" },
		{ id: "27", image: "/images/profile/IMG_7687.JPG" },
		{ id: "28", image: "/images/profile/IMG_7688.JPG" },
		{ id: "29", image: "/images/profile/IMG_7689.JPG" },
		{ id: "30", image: "/images/profile/IMG_7690.JPG" },
		{ id: "31", image: "/images/profile/IMG_7691.JPG" },
		{ id: "32", image: "/images/profile/IMG_7692.JPG" },
		{ id: "33", image: "/images/profile/IMG_7693.JPG" },
	];

	// イベントハンドラー
	const handleEditProfile = () => {
		console.log("プロフィールを編集");
	};

	const handleShareProfile = () => {
		console.log("プロフィールをシェア");
	};

	const handleAddFriend = () => {
		console.log("友達を追加");
	};

	const handleMentionClick = () => {
		console.log("メンション");
	};

	const handleCreatePost = () => {
		console.log("投稿を作成");
	};

	const handleMenuClick = () => {
		console.log("メニューを開く");
	};

	return (
		<div className="min-h-screen bg-white pb-16 md:pb-0">
			{/* トップナビゲーションバー */}
			<TopNavigationBar
				username="shun.1020_potd"
				onMentionClick={handleMentionClick}
				onCreatePost={handleCreatePost}
				onMenuClick={handleMenuClick}
			/>

			{/* プロフィールヘッダー */}
			<ProfileHeader
				username={profileData.username}
				posts={profileData.posts}
				followers={profileData.followers}
				following={profileData.following}
				bio={profileData.bio}
				profileImage={profileData.profileImage}
				onEditProfile={handleEditProfile}
				onShareProfile={handleShareProfile}
				onAddFriend={handleAddFriend}
			/>

			{/* プロフィールタブ */}
			<ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

			{/* コンテンツエリア */}
			<div className="flex-1">
				{activeTab === "posts" && <PostGrid posts={posts} />}

				{activeTab === "reels" && (
					<div className="text-center py-12">
						<svg
							className="w-16 h-16 text-gray-400 mx-auto mb-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
							/>
						</svg>
						<div className="text-black text-lg mb-2">リールがありません</div>
						<button className="text-blue-500 text-sm">
							最初のリールを作成
						</button>
					</div>
				)}

				{activeTab === "tagged" && (
					<div className="text-center py-12">
						<svg
							className="w-16 h-16 text-gray-400 mx-auto mb-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
							/>
						</svg>
						<div className="text-black text-lg mb-2">
							タグ付き投稿がありません
						</div>
						<button className="text-blue-500 text-sm">
							友達にタグ付けしてもらおう
						</button>
					</div>
				)}
			</div>

			{/* ボトムナビゲーションバー */}
			<BottomNavigationBar
				activeTab={bottomNavActiveTab}
				onTabChange={setBottomNavActiveTab}
				profileImage={profileData.profileImage}
			/>
		</div>
	);
}
