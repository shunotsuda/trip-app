"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	ProfileHeader,
	ProfileTabs,
	PostGrid,
	BottomNavigationBar,
	MainContentArea,
	PageWrapper,
	TabPanel,
	FloatingActionButton,
	ReviewGrid,
	FavoriteGrid,
	ItineraryGrid,
	FlexibleHeader,
	UserIdDisplay,
	HamburgerToggle,
	BackButton,
} from "@/components";
import { profileData, itineraryData, posts } from "@/data/dummyData";

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState("posts");
	const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
	const router = useRouter();

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

	const handleMenuClick = () => {
		console.log("設定ページに遷移");
		router.push("/settings");
	};

	const handleAccountClick = () => {
		setIsAccountDropdownOpen(!isAccountDropdownOpen);
		console.log("アカウント切り替えメニューをトグル");
	};

	return (
		<PageWrapper>
			{/* ヘッダー */}
			<FlexibleHeader
				leftRatio={1}
				className="h-16 px-4"
				leftContent={
					!isOwnProfile ? (
						<UserIdDisplay
							userId="shun1020_trip-app"
							hasMultipleAccounts={true}
							isOpen={isAccountDropdownOpen}
							onClick={handleAccountClick}
						/>
					) : (
						<div className="flex items-center gap-2">
							<div className="w-10 flex justify-start">
								<BackButton fallbackRoute="/login" size={24} />
							</div>
							<UserIdDisplay
								userId="shun1020_trip-app"
								hasMultipleAccounts={false}
								isOpen={false}
								onClick={() => {}}
							/>
						</div>
					)
				}
				rightContent={
						<HamburgerToggle
							isOpen={false}
							onClick={handleMenuClick}
							size={40}
						/>
				}
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
