"use client";

import { useState } from "react";
import {
	ProfileHeader,
	ProfileTabs,
	PostGrid,
	TopNavigationBar,
	BottomNavigationBar,
	MainContentArea,
	PageWrapper,
	TabPanel,
	FloatingActionButton,
	ReviewGrid,
	FavoriteGrid,
	ItineraryGrid,
} from "@/components";
import { profileData, itineraryData, posts } from "@/data/dummyData";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts";

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState("posts");
	const { toggleMode } = useTheme();

	// タブ切り替え
	const handleTabChange = (newTab: string) => {
		setActiveTab(newTab);
	};

	// 自分のプロフィールかどうかの判定（URLパラメータやpropsで制御可能）
	const isOwnProfile = true; // 現在は自分のプロフィールとして設定

	// イベントハンドラー
	const handleEditProfile = () => {
		console.log("プロフィール編集ページに遷移");
		// プロフィール編集ページに遷移する処理を実装
	};

	const handleShareProfile = () => {
		console.log("プロフィールをシェア");
	};

	const handleAddFriend = () => {
		console.log("友達を追加");
	};

	const handleFloatingButtonClick = () => {
		// フローティングボタンのクリック処理
		console.log("フローティングボタンがクリックされました");
		// ここで新しい投稿作成画面やモーダルを開く処理を実装
	};

	const handleThemeToggle = () => {
		toggleMode();
	};

	const handleAddToHomeScreen = () => {
		console.log("ホーム画面に追加");
		// PWAのホーム画面追加処理
	};

	const handleMenuClick = () => {
		console.log("設定ページに遷移");
		// 設定ページに遷移
		window.location.href = "/settings";
	};

	const handleBackClick = () => {
		console.log("戻る");
		// ここで前のページに戻る処理を実装
		// window.history.back() など
	};

	return (
		<PageWrapper>
			{/* ヘッダー */}
			<TopNavigationBar
				backButton={{
					show: !isOwnProfile,
					onClick: handleBackClick,
				}}
				title={{
					type: "username",
					content: "shun.1020_potd",
					showDropdown: isOwnProfile,
				}}
				rightActions={[
					{
						id: "theme-toggle",
						icon: (
							<svg
								className="w-6 h-6 text-[var(--text-primary)]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
								/>
							</svg>
						),
						label: "テーマ切り替え",
						onClick: handleThemeToggle,
					},
					{
						id: "squares-plus",
						icon: (
							<SquaresPlusIcon className="w-6 h-6 text-[var(--text-primary)]" />
						),
						label: "Squares Plus",
						onClick: handleAddToHomeScreen,
					},
					{
						id: "menu",
						icon: (
							<svg
								className="w-6 h-6 text-[var(--text-primary)]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						),
						label: "メニュー",
						onClick: handleMenuClick,
					},
				]}
			/>

			{/* メインコンテンツエリア */}
			<MainContentArea>
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
				<ProfileTabs activeTab={activeTab} onTabChange={handleTabChange}>
					{/* 投稿タブ */}
					<TabPanel value={activeTab} index="posts">
						<PostGrid posts={posts} />
					</TabPanel>

					{/* レビュータブ */}
					<TabPanel value={activeTab} index="reviews">
						<ReviewGrid reviews={[]} />
					</TabPanel>

					{/* 気になるタブ */}
					<TabPanel value={activeTab} index="favorites">
						<FavoriteGrid favorites={[]} />
					</TabPanel>

					{/* 旅しおりタブ */}
					<TabPanel value={activeTab} index="itinerary">
						<ItineraryGrid itineraries={itineraryData} />
					</TabPanel>
				</ProfileTabs>

				{/* フローティングアクションボタン */}
				<FloatingActionButton onClick={handleFloatingButtonClick} />
			</MainContentArea>

			{/* ボトムナビ */}
			<BottomNavigationBar />
		</PageWrapper>
	);
}
