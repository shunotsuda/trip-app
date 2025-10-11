/**
 * TopNavigationBarの使用例
 * 様々なパターンでの使用方法を示すサンプル
 */

import React from "react";
import TopNavigationBar, {
	type HeaderButton,
} from "@/components/layout/TopNavigationBar";

// 1. プロフィール画面（現在の実装）
export function ProfileHeaderExample() {
	const handleMentionClick = () => console.log("メンション");
	const handleCreatePost = () => console.log("投稿作成");
	const handleMenuClick = () => console.log("メニュー");
	const handleBackClick = () => console.log("戻る");

	return (
		<TopNavigationBar
			backButton={{
				show: false, // 自分のプロフィールなので戻るボタンなし
				onClick: handleBackClick,
			}}
			title={{
				type: "username",
				content: "shun.1020_potd",
				showDropdown: true,
			}}
			rightActions={[
				{
					id: "mention",
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
								d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					),
					label: "メンション",
					onClick: handleMentionClick,
				},
				{
					id: "create-post",
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
								d="M12 4v16m8-8H4"
							/>
						</svg>
					),
					label: "投稿を作成",
					onClick: handleCreatePost,
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
	);
}

// 2. プロフィール編集画面
export function ProfileEditHeaderExample() {
	const handleBackClick = () => console.log("編集をキャンセル");
	const handleSaveClick = () => console.log("保存");

	return (
		<TopNavigationBar
			backButton={{
				show: true,
				onClick: handleBackClick,
			}}
			title={{
				type: "title",
				content: "プロフィールを編集",
			}}
			rightActions={[
				{
					id: "save",
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
								d="M5 13l4 4L19 7"
							/>
						</svg>
					),
					label: "保存",
					onClick: handleSaveClick,
					className: "text-blue-500",
				},
			]}
		/>
	);
}

// 3. ニックネーム編集画面
export function NicknameEditHeaderExample() {
	const handleBackClick = () => console.log("ニックネーム編集をキャンセル");
	const handleDoneClick = () => console.log("完了");

	return (
		<TopNavigationBar
			backButton={{
				show: true,
				onClick: handleBackClick,
			}}
			title={{
				type: "title",
				content: "ニックネームを編集",
			}}
			rightActions={[
				{
					id: "done",
					icon: (
						<span className="text-blue-500 font-semibold text-base">完了</span>
					),
					label: "完了",
					onClick: handleDoneClick,
				},
			]}
		/>
	);
}

// 4. スティッキー状態での絞り込みボタン
export function StickyHeaderExample() {
	const handleBackClick = () => console.log("戻る");
	const handleFilterClick = () => console.log("絞り込み");

	return (
		<TopNavigationBar
			backButton={{
				show: true,
				onClick: handleBackClick,
			}}
			title={{
				type: "title",
				content: "投稿",
			}}
			rightActions={[
				{
					id: "filter",
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
								strokeWidth={2}
								d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
							/>
						</svg>
					),
					label: "絞り込み",
					onClick: handleFilterClick,
				},
			]}
		/>
	);
}

// 5. 全画面モーダル用（sticky無効）
export function FullscreenModalHeaderExample() {
	const handleBackClick = () => console.log("モーダルを閉じる");
	const handleSaveClick = () => console.log("保存");

	return (
		<TopNavigationBar
			backButton={{
				show: true,
				onClick: handleBackClick,
			}}
			title={{
				type: "title",
				content: "プロフィールを編集",
			}}
			rightActions={[
				{
					id: "save",
					icon: (
						<span className="text-blue-500 font-semibold text-base">保存</span>
					),
					label: "保存",
					onClick: handleSaveClick,
				},
			]}
			sticky={false}
			className="border-b"
		/>
	);
}

// 6. カスタムスタイル
export function CustomStyleHeaderExample() {
	const handleBackClick = () => console.log("戻る");
	const handleActionClick = () => console.log("アクション");

	return (
		<TopNavigationBar
			backButton={{
				show: true,
				onClick: handleBackClick,
			}}
			title={{
				type: "title",
				content: "カスタムヘッダー",
			}}
			rightActions={[
				{
					id: "custom-action",
					icon: (
						<div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
							<svg
								className="w-4 h-4 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								/>
							</svg>
						</div>
					),
					label: "カスタムアクション",
					onClick: handleActionClick,
				},
			]}
			className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
		/>
	);
}
