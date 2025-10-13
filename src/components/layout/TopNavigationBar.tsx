"use client";

import React from "react";

// 汎用的なヘッダーボタンの型定義
export interface HeaderButton {
	id: string;
	icon?: React.ReactNode;
	label?: string;
	onClick: () => void;
	className?: string;
}

// 戻るボタンの型定義
export interface BackButton {
	show: boolean;
	onClick?: () => void;
}

// 中央のタイトル/コンテンツの型定義
export interface HeaderTitle {
	type: "username" | "title";
	content: string;
	showDropdown?: boolean;
}

interface TopNavigationBarProps {
	// 戻るボタン
	backButton?: BackButton;

	// 中央のタイトル/ユーザー名
	title: HeaderTitle;

	// 右側のアクションボタン
	rightActions?: HeaderButton[];

	// スタイル関連
	className?: string;
}

export default function TopNavigationBar({
	backButton = { show: false },
	title,
	rightActions = [],
	className = "",
}: TopNavigationBarProps) {
	return (
		<header className={`h-16 px-4 py-3 ${className}`}>
			<div className="flex items-center justify-between">
				{backButton.show ? (
					/* 戻るボタンがある場合：3カラムレイアウト */
					<>
						{/* 左側：戻るボタン */}
						<div className="w-10 flex justify-start">
							<button
								onClick={() => backButton.onClick?.()}
								className="p-1 hover:bg-[var(--bg-hover)] rounded-full transition-colors"
							>
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
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
						</div>

						{/* 中央のタイトル/ユーザー名 */}
						<div className="flex items-center space-x-1 flex-1 justify-center">
							{title.type === "username" ? (
								<>
									<span className="text-base font-semibold text-[var(--text-primary)]">
										{title.content}
									</span>
									{title.showDropdown && (
										<svg
											className="w-4 h-4 text-[var(--text-primary)]"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									)}
								</>
							) : (
								<span className="text-base font-semibold text-[var(--text-primary)]">
									{title.content}
								</span>
							)}
						</div>

						{/* 右側のアクションボタン */}
						<div className="w-10 flex justify-end">
							{rightActions.length > 0 && (
								<div className="flex items-center space-x-2">
									{rightActions.map((action) => (
										<button
											key={action.id}
											onClick={action.onClick}
											className={`p-1 hover:bg-gray-100 rounded-full transition-colors ${
												action.className || ""
											}`}
											title={action.label}
										>
											{action.icon}
										</button>
									))}
								</div>
							)}
						</div>
					</>
				) : (
					/* 戻るボタンがない場合：2カラムレイアウト（左：タイトル、右：ボタン） */
					<>
						{/* 左側：タイトル/ユーザー名 */}
						<div className="flex items-center space-x-1 flex-1">
							{title.type === "username" ? (
								<>
									<span className="text-base font-semibold text-[var(--text-primary)]">
										{title.content}
									</span>
									{title.showDropdown && (
										<svg
											className="w-4 h-4 text-[var(--text-primary)]"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									)}
								</>
							) : (
								<span className="text-base font-semibold text-[var(--text-primary)]">
									{title.content}
								</span>
							)}
						</div>

						{/* 右側：アクションボタン */}
						{rightActions.length > 0 && (
							<div className="flex items-center space-x-2">
								{rightActions.map((action) => (
									<button
										key={action.id}
										onClick={action.onClick}
										className={`p-1 hover:bg-[var(--bg-hover)] rounded-full transition-colors ${
											action.className || ""
										}`}
										title={action.label}
									>
										{action.icon}
									</button>
								))}
							</div>
						)}
					</>
				)}
			</div>
		</header>
	);
}
