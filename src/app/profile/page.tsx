"use client";

import { useState, useEffect, useRef } from "react";
import {
	ProfileHeader,
	ProfileTabs,
	PostGrid,
	BottomNavigationBar,
	TopNavigationBar,
	TabPanel,
	FloatingActionButton,
	ReviewGrid,
	FavoriteGrid,
	ItineraryGrid,
} from "@/components";
import { profileData, itineraryData, posts } from "@/data/dummyData";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState("posts");

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
		<div className="relative min-h-dvh  pb-20">
			{/* トップナビゲーションバー */}
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

			{/* ボトムナビゲーションバー */}
			<BottomNavigationBar />
		</div>
	);
}
