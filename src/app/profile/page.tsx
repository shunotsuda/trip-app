"use client";

import { useState, useEffect } from "react";
import {
	ProfileHeader,
	ProfileTabs,
	PostGrid,
	ItineraryCard,
	BottomNavigationBar,
	TopNavigationBar,
	TabPanel,
	FloatingActionButton,
} from "@/components";

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState("posts");
	const [bottomNavActiveTab, setBottomNavActiveTab] = useState("profile");

	// タブ切り替え時に一番上から表示
	const handleTabChange = (newTab: string) => {
		setActiveTab(newTab);
		// タブ切り替え時にページトップに戻る
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// 自分のプロフィールかどうかの判定（URLパラメータやpropsで制御可能）
	const isOwnProfile = true; // 現在は自分のプロフィールとして設定

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

	// 旅のしおりダミーデータ（テスト用に空配列に変更可能）
	const itineraryData = [
		{
			id: "1",
			title: "東京ディズニーランド 1日満喫ツアー",
			startDate: "2025/03/15",
			endDate: "2025/03/15",
			images: [
				"/images/profile/投稿画像1.JPG",
				"/images/profile/投稿画像2.JPG",
				"/images/profile/投稿画像3.JPG",
			],
			members: [
				{
					id: "1",
					name: "Shun",
					avatar: "/images/profile/プロフィールアイコン画像.JPG",
				},
				{ id: "2", name: "Yuki", avatar: "/images/profile/IMG_7659.JPG" },
				{ id: "3", name: "Taro", avatar: "/images/profile/IMG_7660.JPG" },
			],
		},
		{
			id: "2",
			title: "沖縄リゾート 3泊4日のんびり旅",
			startDate: "2025/04/20",
			endDate: "2025/04/23",
			images: [
				"/images/profile/投稿画像4.JPG",
				"/images/profile/投稿画像5.JPG",
			],
			members: [
				{
					id: "1",
					name: "Shun",
					avatar: "/images/profile/プロフィールアイコン画像.JPG",
				},
				{ id: "2", name: "Yuki", avatar: "/images/profile/IMG_7659.JPG" },
			],
		},
		{
			id: "3",
			title: "京都の古都巡り 紅葉シーズン特別企画",
			startDate: "2025/11/10",
			endDate: "2025/11/12",
			images: [
				"/images/profile/投稿画像6.JPG",
				"/images/profile/投稿画像7.JPG",
				"/images/profile/IMG_7661.JPG",
				"/images/profile/IMG_7663.JPG",
				"/images/profile/IMG_7671.JPG",
			],
			members: [
				{
					id: "1",
					name: "Shun",
					avatar: "/images/profile/プロフィールアイコン画像.JPG",
				},
				{ id: "2", name: "Yuki", avatar: "/images/profile/IMG_7659.JPG" },
				{ id: "3", name: "Taro", avatar: "/images/profile/IMG_7660.JPG" },
				{ id: "4", name: "Hanako", avatar: "/images/profile/IMG_7661.JPG" },
				{ id: "5", name: "Jiro", avatar: "/images/profile/IMG_7663.JPG" },
			],
		},
		{
			id: "4",
			title: "北海道スキー旅行 ウィンタースポーツ満喫",
			startDate: "未定",
			endDate: "未定",
			images: ["/images/profile/IMG_7672.JPG"],
			members: [
				{
					id: "1",
					name: "Shun",
					avatar: "/images/profile/プロフィールアイコン画像.JPG",
				},
				{ id: "2", name: "Yuki", avatar: "/images/profile/IMG_7659.JPG" },
				{ id: "3", name: "Taro", avatar: "/images/profile/IMG_7660.JPG" },
			],
		},
		{
			id: "5",
			title: "大阪グルメツアー 食べ歩きの旅",
			startDate: "2025/05/01",
			endDate: "2025/05/03",
			images: [
				"/images/profile/IMG_7673.JPG",
				"/images/profile/IMG_7674.JPG",
				"/images/profile/IMG_7675.JPG",
				"/images/profile/IMG_7677.JPG",
			],
			members: [
				{
					id: "1",
					name: "Shun",
					avatar: "/images/profile/プロフィールアイコン画像.JPG",
				},
				{ id: "2", name: "Yuki", avatar: "/images/profile/IMG_7659.JPG" },
			],
		},
		{
			id: "6",
			title: "富士山登山チャレンジ 夏山シーズン",
			startDate: "2025/07/20",
			endDate: "2025/07/21",
			images: ["/images/profile/IMG_7678.JPG", "/images/profile/IMG_7679.JPG"],
			members: [
				{
					id: "1",
					name: "Shun",
					avatar: "/images/profile/プロフィールアイコン画像.JPG",
				},
			],
		},
		{
			id: "7",
			title: "広島・宮島 世界遺産巡り 歴史と自然を満喫",
			startDate: "2025/06/15",
			endDate: "2025/06/17",
			images: [
				"/images/profile/IMG_7680.JPG",
				"/images/profile/IMG_7681.JPG",
				"/images/profile/IMG_7682.JPG",
				"/images/profile/IMG_7683.JPG",
				"/images/profile/IMG_7684.JPG",
				"/images/profile/IMG_7685.JPG",
			],
			members: [
				{
					id: "1",
					name: "Shun",
					avatar: "/images/profile/プロフィールアイコン画像.JPG",
				},
				{ id: "2", name: "Yuki", avatar: "/images/profile/IMG_7659.JPG" },
				{ id: "3", name: "Taro", avatar: "/images/profile/IMG_7660.JPG" },
				{ id: "4", name: "Hanako", avatar: "/images/profile/IMG_7661.JPG" },
			],
		},
		{
			id: "8",
			title: "長野温泉旅館 のんびり癒しの旅",
			startDate: "2025/09/10",
			endDate: "2025/09/11",
			images: ["/images/profile/IMG_7686.JPG"],
			members: [
				{
					id: "1",
					name: "Shun",
					avatar: "/images/profile/プロフィールアイコン画像.JPG",
				},
				{ id: "2", name: "Yuki", avatar: "/images/profile/IMG_7659.JPG" },
			],
		},
		{
			id: "9",
			title: "福岡博多 ラーメンと屋台グルメの旅",
			startDate: "2025/08/05",
			endDate: "2025/08/07",
			images: [
				"/images/profile/IMG_7687.JPG",
				"/images/profile/IMG_7688.JPG",
				"/images/profile/IMG_7689.JPG",
			],
			members: [
				{
					id: "1",
					name: "Shun",
					avatar: "/images/profile/プロフィールアイコン画像.JPG",
				},
				{ id: "2", name: "Yuki", avatar: "/images/profile/IMG_7659.JPG" },
				{ id: "3", name: "Taro", avatar: "/images/profile/IMG_7660.JPG" },
				{ id: "4", name: "Hanako", avatar: "/images/profile/IMG_7661.JPG" },
				{ id: "5", name: "Jiro", avatar: "/images/profile/IMG_7663.JPG" },
				{ id: "6", name: "Sakura", avatar: "/images/profile/IMG_7671.JPG" },
			],
		},
		{
			id: "10",
			title: "金沢兼六園 日本庭園と伝統工芸品鑑賞",
			startDate: "2025/10/20",
			endDate: "2025/10/23",
			images: [
				"/images/profile/IMG_7690.JPG",
				"/images/profile/IMG_7691.JPG",
				"/images/profile/IMG_7692.JPG",
				"/images/profile/IMG_7693.JPG",
			],
			members: [
				{
					id: "1",
					name: "Shun",
					avatar: "/images/profile/プロフィールアイコン画像.JPG",
				},
				{ id: "2", name: "Yuki", avatar: "/images/profile/IMG_7659.JPG" },
				{ id: "3", name: "Taro", avatar: "/images/profile/IMG_7660.JPG" },
				{ id: "4", name: "Hanako", avatar: "/images/profile/IMG_7661.JPG" },
				{ id: "5", name: "Jiro", avatar: "/images/profile/IMG_7663.JPG" },
				{ id: "6", name: "Sakura", avatar: "/images/profile/IMG_7671.JPG" },
				{ id: "7", name: "Ken", avatar: "/images/profile/IMG_7672.JPG" },
				{ id: "8", name: "Mai", avatar: "/images/profile/IMG_7673.JPG" },
				{ id: "9", name: "Ryo", avatar: "/images/profile/IMG_7674.JPG" },
				{ id: "10", name: "Aoi", avatar: "/images/profile/IMG_7675.JPG" },
				{ id: "11", name: "Kai", avatar: "/images/profile/IMG_7677.JPG" },
				{ id: "12", name: "Yui", avatar: "/images/profile/IMG_7678.JPG" },
				{ id: "13", name: "Sota", avatar: "/images/profile/IMG_7679.JPG" },
				{ id: "14", name: "Rina", avatar: "/images/profile/IMG_7680.JPG" },
				{ id: "15", name: "Hiro", avatar: "/images/profile/IMG_7681.JPG" },
				{ id: "16", name: "Emi", avatar: "/images/profile/IMG_7682.JPG" },
				{ id: "17", name: "Kota", avatar: "/images/profile/IMG_7683.JPG" },
				{ id: "18", name: "Mio", avatar: "/images/profile/IMG_7684.JPG" },
				{ id: "19", name: "Taku", avatar: "/images/profile/IMG_7685.JPG" },
				{ id: "20", name: "Nao", avatar: "/images/profile/IMG_7686.JPG" },
				{ id: "21", name: "Ryo", avatar: "/images/profile/IMG_7687.JPG" },
				{ id: "22", name: "Saki", avatar: "/images/profile/IMG_7688.JPG" },
				{ id: "23", name: "Daiki", avatar: "/images/profile/IMG_7689.JPG" },
				{ id: "24", name: "Yuka", avatar: "/images/profile/IMG_7690.JPG" },
				{ id: "25", name: "Kenta", avatar: "/images/profile/IMG_7691.JPG" },
				{ id: "26", name: "Mana", avatar: "/images/profile/IMG_7692.JPG" },
				{ id: "27", name: "Shota", avatar: "/images/profile/IMG_7693.JPG" },
			],
		},
	];

	// テスト用に空配列に変更
	// 投稿データ（全ての画像を使用）
	const posts = [
		{
			id: "1",
			image: "/images/profile/投稿画像1.JPG",
			isFavorite: true,
			members: ["Shun", "Yuki"],
			date: "2025-01-15",
		},
		{
			id: "2",
			image: "/images/profile/投稿画像2.JPG",
			isVideo: true,
			members: ["Shun"],
			date: "2025-01-14",
		},
		{
			id: "3",
			image: "/images/profile/投稿画像3.JPG",
			isFavorite: true,
			members: ["Shun", "Taro"],
			date: "2025-01-13",
		},
		{
			id: "4",
			image: "/images/profile/投稿画像4.JPG",
			isVideo: true,
			members: ["Shun", "Yuki", "Taro"],
			date: "2025-01-12",
		},
		{
			id: "5",
			image: "/images/profile/投稿画像5.JPG",
			isFavorite: true,
			members: ["Shun"],
			date: "2025-01-11",
		},
		{
			id: "6",
			image: "/images/profile/投稿画像6.JPG",
			members: ["Shun", "Yuki"],
			date: "2025-01-10",
		},
		{
			id: "7",
			image: "/images/profile/投稿画像7.JPG",
			members: ["Shun", "Taro"],
			date: "2025-01-09",
		},
		{
			id: "8",
			image: "/images/profile/IMG_7659.JPG",
			isFavorite: true,
			members: ["Shun"],
			date: "2025-01-08",
		},
		{
			id: "9",
			image: "/images/profile/IMG_7660.JPG",
			members: ["Shun", "Yuki"],
			date: "2025-01-07",
		},
		{
			id: "10",
			image: "/images/profile/IMG_7661.JPG",
			isVideo: true,
			isFavorite: true,
			members: ["Shun", "Taro"],
			date: "2025-01-06",
		},
		{
			id: "11",
			image: "/images/profile/IMG_7663.JPG",
			members: ["Shun"],
			date: "2025-01-05",
		},
		{
			id: "12",
			image: "/images/profile/IMG_7671.JPG",
			isFavorite: true,
			members: ["Shun", "Yuki", "Taro"],
			date: "2025-01-04",
		},
		{
			id: "13",
			image: "/images/profile/IMG_7672.JPG",
			isVideo: true,
			members: ["Shun"],
			date: "2025-01-03",
		},
		{
			id: "14",
			image: "/images/profile/IMG_7673.JPG",
			members: ["Shun", "Yuki"],
			date: "2025-01-02",
		},
		{
			id: "15",
			image: "/images/profile/IMG_7674.JPG",
			isFavorite: true,
			members: ["Shun", "Taro"],
			date: "2025-01-01",
		},
		{
			id: "16",
			image: "/images/profile/IMG_7675.JPG",
			members: ["Shun"],
			date: "2024-12-31",
		},
		{
			id: "17",
			image: "/images/profile/IMG_7677.JPG",
			isVideo: true,
			isFavorite: true,
			members: ["Shun", "Yuki"],
			date: "2024-12-30",
		},
		{
			id: "18",
			image: "/images/profile/IMG_7678.JPG",
			members: ["Shun", "Taro"],
			date: "2024-12-29",
		},
		{
			id: "19",
			image: "/images/profile/IMG_7679.JPG",
			isFavorite: true,
			members: ["Shun"],
			date: "2024-12-28",
		},
		{
			id: "20",
			image: "/images/profile/IMG_7680.JPG",
			members: ["Shun", "Yuki", "Taro"],
			date: "2024-12-27",
		},
		{
			id: "21",
			image: "/images/profile/IMG_7681.JPG",
			isVideo: true,
			members: ["Shun"],
			date: "2024-12-26",
		},
		{
			id: "22",
			image: "/images/profile/IMG_7682.JPG",
			isFavorite: true,
			members: ["Shun", "Yuki"],
			date: "2024-12-25",
		},
		{
			id: "23",
			image: "/images/profile/IMG_7683.JPG",
			members: ["Shun", "Taro"],
			date: "2024-12-24",
		},
		{
			id: "24",
			image: "/images/profile/IMG_7684.JPG",
			isVideo: true,
			isFavorite: true,
			members: ["Shun"],
			date: "2024-12-23",
		},
		{
			id: "25",
			image: "/images/profile/IMG_7685.JPG",
			members: ["Shun", "Yuki"],
			date: "2024-12-22",
		},
		{
			id: "26",
			image: "/images/profile/IMG_7686.JPG",
			isFavorite: true,
			members: ["Shun", "Taro"],
			date: "2024-12-21",
		},
		{
			id: "27",
			image: "/images/profile/IMG_7687.JPG",
			members: ["Shun"],
			date: "2024-12-20",
		},
		{
			id: "28",
			image: "/images/profile/IMG_7688.JPG",
			isVideo: true,
			members: ["Shun", "Yuki", "Taro"],
			date: "2024-12-19",
		},
		{
			id: "29",
			image: "/images/profile/IMG_7689.JPG",
			isFavorite: true,
			members: ["Shun"],
			date: "2024-12-18",
		},
		{
			id: "30",
			image: "/images/profile/IMG_7690.JPG",
			members: ["Shun", "Yuki"],
			date: "2024-12-17",
		},
		{
			id: "31",
			image: "/images/profile/IMG_7691.JPG",
			isVideo: true,
			isFavorite: true,
			members: ["Shun", "Taro"],
			date: "2024-12-16",
		},
		{
			id: "32",
			image: "/images/profile/IMG_7692.JPG",
			members: ["Shun"],
			date: "2024-12-15",
		},
		{
			id: "33",
			image: "/images/profile/IMG_7693.JPG",
			isFavorite: true,
			members: ["Shun", "Yuki"],
			date: "2024-12-14",
		},
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

	const handleFloatingButtonClick = () => {
		// フローティングボタンのクリック処理
		console.log("フローティングボタンがクリックされました");
		// ここで新しい投稿作成画面やモーダルを開く処理を実装
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
		// ここで前のページに戻る処理を実装
		// window.history.back() など
	};

	return (
		<div className="min-h-[100svh] bg-stone-100 pb-16">
			{/* トップナビゲーションバー */}
			<TopNavigationBar
				username="shun.1020_potd"
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
			<ProfileTabs activeTab={activeTab} onTabChange={handleTabChange}>
				{/* 投稿タブ */}
				<TabPanel value={activeTab} index="posts">
					<div className="flex-1">
						<PostGrid posts={posts} />
					</div>
				</TabPanel>

				{/* レビュータブ */}
				<TabPanel value={activeTab} index="reviews">
					<div className="flex-1">
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
							<div className="text-black text-lg mb-2">
								レビューがありません
							</div>
							<button className="text-blue-500 text-sm">
								最初のレビューを書く
							</button>
						</div>
					</div>
				</TabPanel>

				{/* 気になるタブ */}
				<TabPanel value={activeTab} index="favorites">
					<div className="flex-1">
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
					</div>
				</TabPanel>

				{/* 旅しおりタブ */}
				<TabPanel value={activeTab} index="itinerary">
					<div className="flex-1">
						{itineraryData.length > 0 ? (
							<div className="p-4">
								<div className="grid grid-cols-2 gap-3">
									{itineraryData.map((itinerary) => (
										<ItineraryCard
											key={itinerary.id}
											title={itinerary.title}
											startDate={itinerary.startDate}
											images={itinerary.images}
											members={itinerary.members}
										/>
									))}
								</div>
							</div>
						) : (
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
								<div className="text-black text-lg mb-2">
									しおりがありません
								</div>
								<button className="text-blue-500 text-sm">
									最初のしおりを作成
								</button>
							</div>
						)}
					</div>
				</TabPanel>
			</ProfileTabs>

			{/* フローティングアクションボタン */}
			<FloatingActionButton onClick={handleFloatingButtonClick} />

			{/* ボトムナビゲーションバー */}
			<BottomNavigationBar
				activeTab={bottomNavActiveTab}
				onTabChange={setBottomNavActiveTab}
				profileImage={profileData.profileImage}
			/>
		</div>
	);
}
