/**
 * モーダルシステムの使用例
 * 様々なパターンでの使用方法を示すサンプル
 */

import React from "react";
import { useModal } from "@/hooks/useModal";
import { ModalHeader, ModalContent, ModalFooter } from "@/components/ui/Modal";
import { TopNavigationBar } from "@/components/layout";

// 1. 設定モーダル（右からスライド）
export function SettingsModalExample() {
	const { openSettingsModal } = useModal();

	const SettingsContent = () => (
		<div className="h-full flex flex-col">
			<ModalHeader title="設定とアクティビティ" />
			<ModalContent>
				<div className="space-y-4">
					<div className="text-center py-8">
						<p className="text-gray-600">
							設定画面のコンテンツがここに表示されます
						</p>
						<button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
							設定項目
						</button>
					</div>
				</div>
			</ModalContent>
		</div>
	);

	const handleOpenSettings = () => {
		openSettingsModal(<SettingsContent />);
	};

	return (
		<div className="p-4 bg-gray-50 min-h-screen">
			<button
				onClick={handleOpenSettings}
				className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
			>
				設定モーダルを開く（右からスライド）
			</button>
		</div>
	);
}

// 2. 編集モーダル（上からスライド）
export function EditModalExample() {
	const { openEditModal } = useModal();

	const EditContent = () => (
		<div className="h-full flex flex-col">
			<TopNavigationBar
				backButton={{
					show: true,
					onClick: () => console.log("戻る"),
				}}
				title={{
					type: "title",
					content: "プロフィール編集",
				}}
				rightActions={[
					{
						id: "save",
						label: "保存",
						onClick: () => console.log("保存"),
					},
				]}
				sticky={false}
			/>
			<ModalContent>
				<div className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							名前
						</label>
						<input
							type="text"
							className="w-full p-3 border border-gray-300 rounded-lg"
							placeholder="名前を入力"
							defaultValue="shun.1020_potd"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							自己紹介
						</label>
						<textarea
							className="w-full p-3 border border-gray-300 rounded-lg h-32"
							placeholder="自己紹介を入力"
							defaultValue="❤ Italian ❤"
						/>
					</div>
				</div>
			</ModalContent>
		</div>
	);

	const handleOpenEdit = () => {
		openEditModal(<EditContent />);
	};

	return (
		<div className="p-4 bg-gray-50 min-h-screen">
			<button
				onClick={handleOpenEdit}
				className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
			>
				編集モーダルを開く（上からスライド）
			</button>
		</div>
	);
}

// 3. ダイアログモーダル（中央フェード）
export function DialogModalExample() {
	const { openDialogModal } = useModal();

	const DialogContent = () => (
		<div className="p-6">
			<div className="text-center">
				<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
					<svg
						className="h-6 w-6 text-red-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-medium text-gray-900 mb-2">
					確認が必要です
				</h3>
				<p className="text-sm text-gray-500 mb-6">
					この操作は取り消すことができません。本当に削除しますか？
				</p>
				<div className="flex space-x-3">
					<button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
						キャンセル
					</button>
					<button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
						削除する
					</button>
				</div>
			</div>
		</div>
	);

	const handleOpenDialog = () => {
		openDialogModal(<DialogContent />);
	};

	return (
		<div className="p-4 bg-gray-50 min-h-screen">
			<button
				onClick={handleOpenDialog}
				className="w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
			>
				ダイアログモーダルを開く（中央フェード）
			</button>
		</div>
	);
}

// 4. ボトムシート（下からスライド）
export function BottomSheetExample() {
	const { openBottomSheet } = useModal();

	const BottomSheetContent = () => (
		<div className="p-4">
			<div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
			<h3 className="text-lg font-semibold text-gray-900 mb-4">アクション</h3>
			<div className="space-y-3">
				<button className="w-full p-3 text-left hover:bg-gray-100 rounded-lg">
					📷 写真を撮る
				</button>
				<button className="w-full p-3 text-left hover:bg-gray-100 rounded-lg">
					🖼️ ライブラリから選択
				</button>
				<button className="w-full p-3 text-left hover:bg-gray-100 rounded-lg">
					📁 ファイルから選択
				</button>
				<button className="w-full p-3 text-left text-red-600 hover:bg-red-50 rounded-lg">
					キャンセル
				</button>
			</div>
		</div>
	);

	const handleOpenBottomSheet = () => {
		openBottomSheet(<BottomSheetContent />);
	};

	return (
		<div className="p-4 bg-gray-50 min-h-screen">
			<button
				onClick={handleOpenBottomSheet}
				className="w-full py-3 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
			>
				ボトムシートを開く（下からスライド）
			</button>
		</div>
	);
}

// 5. モーダルスタックの例（2階層）
export function ModalStackExample() {
	const { openSettingsModal, openEditModal } = useModal();

	const ProfileEditContent = () => (
		<div className="h-full flex flex-col">
			<TopNavigationBar
				backButton={{
					show: true,
					onClick: () => console.log("戻る"),
				}}
				title={{
					type: "title",
					content: "プロフィール編集",
				}}
				rightActions={[]}
				sticky={false}
			/>
			<ModalContent>
				<div className="space-y-4">
					<button
						onClick={() => console.log("名前編集")}
						className="w-full p-4 border border-gray-300 rounded-lg text-left hover:bg-gray-50"
					>
						<div className="font-medium">名前</div>
						<div className="text-sm text-gray-500">shun.1020_potd</div>
					</button>
					<button
						onClick={() => console.log("自己紹介編集")}
						className="w-full p-4 border border-gray-300 rounded-lg text-left hover:bg-gray-50"
					>
						<div className="font-medium">自己紹介</div>
						<div className="text-sm text-gray-500">❤ Italian ❤</div>
					</button>
				</div>
			</ModalContent>
		</div>
	);

	const SettingsContent = () => (
		<div className="h-full flex flex-col">
			<ModalHeader title="設定とアクティビティ" />
			<ModalContent>
				<div className="space-y-4">
					<button
						onClick={() => openEditModal(<ProfileEditContent />)}
						className="w-full p-4 border border-gray-300 rounded-lg text-left hover:bg-gray-50"
					>
						<div className="font-medium">プロフィール編集</div>
						<div className="text-sm text-gray-500">プロフィール情報を編集</div>
					</button>
					<button className="w-full p-4 border border-gray-300 rounded-lg text-left hover:bg-gray-50">
						<div className="font-medium">アカウント設定</div>
						<div className="text-sm text-gray-500">
							パスワード、セキュリティ
						</div>
					</button>
				</div>
			</ModalContent>
		</div>
	);

	const handleOpenStack = () => {
		openSettingsModal(<SettingsContent />);
	};

	return (
		<div className="p-4 bg-gray-50 min-h-screen">
			<button
				onClick={handleOpenStack}
				className="w-full py-3 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
			>
				モーダルスタック（設定 → プロフィール編集）
			</button>
		</div>
	);
}

// 6. 全ての例をまとめたページ
export function AllModalExamples() {
	return (
		<div className="p-4 bg-gray-50 min-h-screen space-y-4">
			<h1 className="text-2xl font-bold text-center mb-8">
				モーダルシステムの例
			</h1>

			<SettingsModalExample />
			<EditModalExample />
			<DialogModalExample />
			<BottomSheetExample />
			<ModalStackExample />
		</div>
	);
}
