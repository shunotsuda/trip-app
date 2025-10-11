"use client";

import { useState, useEffect, useRef } from "react";
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
import { profileData, itineraryData, posts } from "@/data/dummyData";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState("posts");
	const [bottomNavActiveTab, setBottomNavActiveTab] = useState("profile");

	// スティッキー監視用のrefとstate
	const profileHeaderRef = useRef<HTMLDivElement>(null);
	const [isStickyActive, setIsStickyActive] = useState(false);

	// タブ切り替え時に一番上から表示
	const handleTabChange = (newTab: string) => {
		setActiveTab(newTab);

		// スティッキー状態の場合のみスクロール
		if (isStickyActive && profileHeaderRef.current) {
			const headerRect = profileHeaderRef.current.getBoundingClientRect();
			const headerHeight = headerRect.height;

			// iOS Safari対応のスクロール
			const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

			if (isIOS) {
				// iOS: 即座にスクロール（スムーズスクロール無効）
				window.scrollTo(0, headerHeight);
			} else {
				// その他のブラウザ: スムーズスクロール
				window.scrollTo({ top: headerHeight, behavior: "smooth" });
			}
		}
	};

	// 自分のプロフィールかどうかの判定（URLパラメータやpropsで制御可能）
	const isOwnProfile = true; // 現在は自分のプロフィールとして設定

	// スクロール監視とスティッキー判定
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.pageYOffset;

			// プロフィールヘッダーの高さを取得
			if (profileHeaderRef.current) {
				const headerRect = profileHeaderRef.current.getBoundingClientRect();
				const headerHeightValue = headerRect.height;

				// スティッキー判定: スクロール量 > ヘッダー高さ
				const shouldBeSticky = currentScrollY > headerHeightValue;
				setIsStickyActive(shouldBeSticky);
			}
		};

		// 初回実行
		handleScroll();

		// スクロールイベントリスナーを追加
		window.addEventListener("scroll", handleScroll);

		// リサイズイベントも監視（ヘッダー高さが変わる可能性があるため）
		window.addEventListener("resize", handleScroll);

		// クリーンアップ
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

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
		console.log("テーマ切り替え");
		// ダークモード/ライトモードの切り替え処理
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
		<div className="min-h-dvh bg-stone-100 pb-20">
			{/* トップナビゲーションバー */}
			<TopNavigationBar
				backButton={{
					show: !isOwnProfile,
					onClick: handleBackClick,
				}}
				title={{
					type: "username",
					content: "shun.1020_potd",
					showDropdown: true,
				}}
				rightActions={[
					{
						id: "theme-toggle",
						icon: (
							<svg
								className="w-6 h-6 text-black"
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
						icon: <SquaresPlusIcon className="w-6 h-6 text-black" />,
						label: "Squares Plus",
						onClick: handleAddToHomeScreen,
					},
					{
						id: "menu",
						icon: (
							<svg
								className="w-6 h-6 text-black"
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

			{/* プロフィールヘッダー */}
			<div ref={profileHeaderRef}>
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
			</div>
			{/* プロフィールタブ */}
			<ProfileTabs activeTab={activeTab} onTabChange={handleTabChange}>
				{/* 投稿タブ */}
				<TabPanel value={activeTab} index="posts">
					<PostGrid posts={posts} />
				</TabPanel>

				{/* レビュータブ */}
				<TabPanel value={activeTab} index="reviews">
					<div className="bg-stone-100 text-center py-12">
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
				</TabPanel>

				{/* 気になるタブ */}
				<TabPanel value={activeTab} index="favorites">
					<div className="bg-stone-100 text-center py-12 ">
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
				</TabPanel>

				{/* 旅しおりタブ */}
				<TabPanel value={activeTab} index="itinerary">
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
						<div className="bg-stone-100 text-center py-12">
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
