/**
 * Cardコンポーネントの使用例
 * 様々なパターンでの使用方法を示すサンプル
 */

import React from "react";
import Card, {
	CardGroup,
	CardGroups,
	type CardItem,
	type CardGroup as CardGroupType,
} from "@/components/ui/Card";

// 1. 個人情報の例（画像の例に基づく）
export function PersonalInfoExample() {
	const personalInfoGroup: CardGroupType = {
		id: "personal-info",
		title: "個人の情報",
		description:
			"Metaがあなたの情報をどのように使用し、その情報の公開表示をコントロールする方法について説明します。",
		items: [
			{
				id: "contact-info",
				title: "連絡先情報",
				description: "shun1020ymsn@gmail.com\n+818095857327",
				onClick: () => console.log("連絡先情報を編集"),
				icon: (
					<svg
						className="w-6 h-6 text-blue-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
				),
			},
			{
				id: "birthday",
				title: "誕生日",
				description: "1999年10月20日",
				onClick: () => console.log("誕生日を編集"),
				icon: (
					<svg
						className="w-6 h-6 text-green-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				),
			},
			{
				id: "account-control",
				title: "アカウントの所有権とコントロール",
				description:
					"データ管理、追悼アカウント管理人の変更、アカウントやプロフィールの利用解除や削除を行います。",
				onClick: () => console.log("アカウント設定を開く"),
				icon: (
					<svg
						className="w-6 h-6 text-purple-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
						/>
					</svg>
				),
			},
		],
	};

	return (
		<div className="p-4 bg-gray-50 min-h-screen">
			<CardGroup group={personalInfoGroup} />
		</div>
	);
}

// 2. プロフィールカードの例
export function ProfileCardExample() {
	const profileItem: CardItem = {
		id: "profile",
		title: "プロフィール",
		description: "shun.1020_potd",
		onClick: () => console.log("プロフィールを編集"),
		icon: (
			<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
				<span className="text-white text-sm font-bold">S</span>
			</div>
		),
	};

	return (
		<div className="p-4 bg-gray-50 min-h-screen">
			<div className="bg-white rounded-lg overflow-hidden shadow-sm">
				<Card item={profileItem} />
			</div>
		</div>
	);
}

// 3. アカウント設定の例
export function AccountSettingsExample() {
	const accountGroups: CardGroupType[] = [
		{
			id: "connected-experiences",
			title: "コネクテッドエクスペリエンス",
			items: [
				{
					id: "profile-share",
					title: "プロフィール間のシェア",
					onClick: () => console.log("プロフィール間のシェア設定"),
					icon: (
						<svg
							className="w-6 h-6 text-blue-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
					),
				},
				{
					id: "login-account",
					title: "ログインに使用するアカウント",
					onClick: () => console.log("ログインアカウント設定"),
					icon: (
						<svg
							className="w-6 h-6 text-green-500"
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
				},
				{
					id: "see-all",
					title: "すべて見る",
					onClick: () => console.log("すべて表示"),
					showArrow: false,
					className: "text-blue-500",
				},
			],
		},
		{
			id: "account-settings",
			title: "アカウント設定",
			items: [
				{
					id: "password-security",
					title: "パスワードとセキュリティ",
					onClick: () => console.log("パスワードとセキュリティ設定"),
					icon: (
						<svg
							className="w-6 h-6 text-red-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
							/>
						</svg>
					),
				},
				{
					id: "personal-info",
					title: "個人の情報",
					onClick: () => console.log("個人の情報設定"),
					icon: (
						<svg
							className="w-6 h-6 text-blue-500"
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
				},
				{
					id: "information-access",
					title: "あなたの情報とアクセス許可",
					onClick: () => console.log("情報とアクセス許可設定"),
					icon: (
						<svg
							className="w-6 h-6 text-yellow-500"
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
				},
				{
					id: "ad-settings",
					title: "広告表示の設定",
					onClick: () => console.log("広告表示設定"),
					icon: (
						<svg
							className="w-6 h-6 text-orange-500"
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
				},
				{
					id: "meta-pay",
					title: "Meta Pay",
					onClick: () => console.log("Meta Pay設定"),
					icon: (
						<svg
							className="w-6 h-6 text-green-600"
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
				},
				{
					id: "subscriptions",
					title: "サブスクリプション",
					description: "このアカウントセック内のカウント",
					onClick: () => console.log("サブスクリプション設定"),
					icon: (
						<svg
							className="w-6 h-6 text-purple-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
					),
				},
			],
		},
	];

	return (
		<div className="p-4 bg-gray-50 min-h-screen">
			<CardGroups groups={accountGroups} />
		</div>
	);
}

// 4. シンプルなカードの例
export function SimpleCardExample() {
	const simpleItem: CardItem = {
		id: "simple",
		title: "シンプルなカード",
		description: "説明文がないカードです。",
		onClick: () => console.log("シンプルカードをクリック"),
		showArrow: false,
	};

	return (
		<div className="p-4 bg-gray-50 min-h-screen">
			<div className="bg-white rounded-lg overflow-hidden shadow-sm">
				<Card item={simpleItem} />
			</div>
		</div>
	);
}
