"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	TopNavigationBar,
	BottomNavigationBar,
	SearchBar,
	SectionHeader,
} from "@/components";
import Card from "@/components/ui/Card";
import { CardGroup } from "@/components/ui/Card";
import { profileData } from "@/data/dummyData";

export default function SettingsPage() {
	const router = useRouter();
	const [bottomNavActiveTab, setBottomNavActiveTab] = useState("profile");
	const [searchQuery, setSearchQuery] = useState("");

	const handleBackClick = () => {
		// 履歴がある場合は戻る、ない場合はプロフィールページに遷移
		if (window.history.length > 1) {
			router.back();
		} else {
			router.push("/profile");
		}
	};

	const handleProfileClick = () => {
		console.log("プロフィールページに遷移");
	};

	const handleViewAllClick = () => {
		console.log("すべて見る");
	};

	return (
		<div className="min-h-dvh bg-white">
			{/* トップナビゲーションバー */}
			<TopNavigationBar
				backButton={{
					show: true,
					onClick: handleBackClick,
				}}
				title={{
					type: "title",
					content: "設定とアクティビティ",
				}}
				rightActions={[]}
			/>

			{/* メインコンテンツ */}
			<div className="p-4 pb-20">
				{/* 検索バー */}
				<SearchBar
					placeholder="検索"
					value={searchQuery}
					onChange={setSearchQuery}
					className="mb-4"
				/>

				{/* プロフィールカード */}
				<div className="bg-white rounded-lg shadow-sm mb-6">
					<Card
						item={{
							id: "profile",
							image: profileData.profileImage,
							title: "プロフィール",
							subtitle: profileData.username,
							showArrow: true,
							onClick: handleProfileClick,
						}}
					/>
				</div>

				{/* コネクテッドエクスペリエンス */}
				<SectionHeader
					title="コネクテッドエクスペリエンス"
					showViewAll={true}
					onViewAllClick={handleViewAllClick}
					className="px-1 mb-2"
				/>
				<CardGroup
					group={{
						id: "connected-experiences",
						items: [
							{
								id: "profile-share",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
										/>
									</svg>
								),
								title: "プロフィール間のシェア",
								showArrow: true,
								onClick: () => console.log("プロフィール間のシェア"),
							},
							{
								id: "login-accounts",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
										/>
									</svg>
								),
								title: "ログインに使用するアカウント",
								showArrow: true,
								onClick: () => console.log("ログインに使用するアカウント"),
							},
						],
					}}
					className="mb-6"
				/>

				{/* アカウント設定 */}
				<SectionHeader title="アカウント設定" className="px-1 mb-2" />
				<CardGroup
					group={{
						id: "account-settings",
						items: [
							{
								id: "password-security",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								),
								title: "パスワードとセキュリティ",
								showArrow: true,
								onClick: () => console.log("パスワードとセキュリティ"),
							},
							{
								id: "personal-info",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
								),
								title: "個人の情報",
								showArrow: true,
								onClick: () => console.log("個人の情報"),
							},
							{
								id: "info-access",
								icon: (
									<svg
										className="w-6 h-6"
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
								),
								title: "あなたの情報とアクセス許可",
								showArrow: true,
								onClick: () => console.log("あなたの情報とアクセス許可"),
							},
							{
								id: "ad-settings",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
										/>
									</svg>
								),
								title: "広告表示の設定",
								showArrow: true,
								onClick: () => console.log("広告表示の設定"),
							},
							{
								id: "meta-pay",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
										/>
									</svg>
								),
								title: "Meta Pay",
								showArrow: true,
								onClick: () => console.log("Meta Pay"),
							},
							{
								id: "subscription",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								),
								title: "サブスクリプション",
								showArrow: true,
								onClick: () => console.log("サブスクリプション"),
							},
						],
					}}
					className="mb-6"
				/>
				{/* アカウント設定 */}
				<SectionHeader title="アカウント設定" className="px-1 mb-2" />
				<CardGroup
					group={{
						id: "account-settings",
						items: [
							{
								id: "password-security",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								),
								title: "パスワードとセキュリティ",
								showArrow: true,
								onClick: () => console.log("パスワードとセキュリティ"),
							},
							{
								id: "personal-info",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
								),
								title: "個人の情報",
								showArrow: true,
								onClick: () => console.log("個人の情報"),
							},
							{
								id: "info-access",
								icon: (
									<svg
										className="w-6 h-6"
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
								),
								title: "あなたの情報とアクセス許可",
								showArrow: true,
								onClick: () => console.log("あなたの情報とアクセス許可"),
							},
							{
								id: "ad-settings",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
										/>
									</svg>
								),
								title: "広告表示の設定",
								showArrow: true,
								onClick: () => console.log("広告表示の設定"),
							},
							{
								id: "meta-pay",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
										/>
									</svg>
								),
								title: "Meta Pay",
								showArrow: true,
								onClick: () => console.log("Meta Pay"),
							},
							{
								id: "subscription",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								),
								title: "サブスクリプション",
								showArrow: true,
								onClick: () => console.log("サブスクリプション"),
							},
						],
					}}
					className="mb-6"
				/>
				{/* アカウント設定 */}
				<SectionHeader title="アカウント設定" className="px-1 mb-2" />
				<CardGroup
					group={{
						id: "account-settings",
						items: [
							{
								id: "password-security",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								),
								title: "パスワードとセキュリティ",
								showArrow: true,
								onClick: () => console.log("パスワードとセキュリティ"),
							},
							{
								id: "personal-info",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
								),
								title: "個人の情報",
								showArrow: true,
								onClick: () => console.log("個人の情報"),
							},
							{
								id: "info-access",
								icon: (
									<svg
										className="w-6 h-6"
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
								),
								title: "あなたの情報とアクセス許可",
								showArrow: true,
								onClick: () => console.log("あなたの情報とアクセス許可"),
							},
							{
								id: "ad-settings",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
										/>
									</svg>
								),
								title: "広告表示の設定",
								showArrow: true,
								onClick: () => console.log("広告表示の設定"),
							},
							{
								id: "meta-pay",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
										/>
									</svg>
								),
								title: "Meta Pay",
								showArrow: true,
								onClick: () => console.log("Meta Pay"),
							},
							{
								id: "subscription",
								icon: (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								),
								title: "サブスクリプション",
								showArrow: true,
								onClick: () => console.log("サブスクリプション"),
							},
						],
					}}
					className="mb-6"
				/>
			</div>
		</div>
	);
}
