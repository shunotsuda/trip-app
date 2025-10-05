"use client";

import { useState } from "react";
import {
	ProfileHeader,
	ProfileTabs,
	PostGrid,
	BottomNavigationBar,
	TopNavigationBar,
} from "@/components";

export default function OtherProfilePage() {
	const [activeTab, setActiveTab] = useState("posts");
	const [bottomNavActiveTab, setBottomNavActiveTab] = useState("home");

	// 他人のプロフィールとして設定
	const isOwnProfile = false;

	// 他人のプロフィールデータ
	const profileData = {
		username: "田中太郎",
		posts: 42,
		followers: 1250,
		following: 380,
		bio: [
			"旅行好きのサラリーマン",
			"📸 写真撮影が趣味",
			"🌍 世界一周を目指しています",
			"✈️ 次はヨーロッパ旅行予定",
		],
		profileImage: "/images/profile/IMG_7659.JPG", // 仮の画像
	};

	// 投稿データ（少なめ）
	const posts = [
		{ id: "1", image: "/images/profile/IMG_7660.JPG" },
		{ id: "2", image: "/images/profile/IMG_7661.JPG" },
		{ id: "3", image: "/images/profile/IMG_7663.JPG" },
		{ id: "4", image: "/images/profile/IMG_7664.JPG" },
		{ id: "5", image: "/images/profile/IMG_7665.JPG" },
		{ id: "6", image: "/images/profile/IMG_7666.JPG" },
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

	const handleBackClick = () => {
		console.log("戻る");
		// 前のページに戻る処理
		if (typeof window !== "undefined") {
			window.history.back();
		}
	};

	return (
		<div className="min-h-screen bg-white pb-16 md:pb-0">
			{/* トップナビゲーションバー */}
			<TopNavigationBar
				username="田中太郎"
				onMentionClick={handleMentionClick}
				onCreatePost={handleCreatePost}
				onMenuClick={handleMenuClick}
				showBackButton={!isOwnProfile}
				onBackClick={handleBackClick}
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
			<div className="flex-1 mt-2">
				{activeTab === "posts" && <PostGrid posts={posts} />}

				{activeTab === "reviews" && (
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
								d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
							/>
						</svg>
						<div className="text-black text-lg mb-2">レビューがありません</div>
						<button className="text-blue-500 text-sm">
							最初のレビューを書く
						</button>
					</div>
				)}

				{activeTab === "favorites" && (
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
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
						<div className="text-black text-lg mb-2">
							気になる投稿がありません
						</div>
						<button className="text-blue-500 text-sm">
							投稿を探してみよう
						</button>
					</div>
				)}

				{activeTab === "itinerary" && (
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
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						<div className="text-black text-lg mb-2">しおりがありません</div>
						<button className="text-blue-500 text-sm">
							最初のしおりを作成
						</button>
					</div>
				)}
			</div>

			{/* ボトムナビゲーションバー */}
			<BottomNavigationBar
				activeTab={bottomNavActiveTab}
				onTabChange={setBottomNavActiveTab}
				profileImage="/images/profile/プロフィールアイコン画像.JPG"
			/>
		</div>
	);
}
