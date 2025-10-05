"use client";

interface TopNavigationBarProps {
	username: string;
	onMentionClick: () => void;
	onCreatePost: () => void;
	onMenuClick: () => void;
	showBackButton?: boolean;
	onBackClick?: () => void;
}

export default function TopNavigationBar({
	username,
	onMentionClick,
	onCreatePost,
	onMenuClick,
	showBackButton = false,
	onBackClick,
}: TopNavigationBarProps) {
	return (
		<header className="bg-white border-b border-gray-200 px-4 py-3">
			<div className="flex items-center justify-between">
				{/* 左側：戻るボタンまたは何も表示しない */}
				{showBackButton && (
					<button
						onClick={onBackClick}
						className="p-1 hover:bg-gray-100 rounded-full transition-colors"
					>
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
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>
				)}

				{/* 中央のユーザー名 */}
				<div className="flex items-center space-x-1">
					<span className="text-base font-semibold text-black">{username}</span>
					<svg
						className="w-4 h-4 text-black"
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
				</div>

				{/* 右側のアイコン */}
				<div className="flex items-center space-x-4">
					<button onClick={onMentionClick} className="p-1">
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
					</button>

					<button onClick={onCreatePost} className="p-1">
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
					</button>

					<button onClick={onMenuClick} className="p-1">
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
					</button>
				</div>
			</div>
		</header>
	);
}
