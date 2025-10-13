"use client";

import { useState } from "react";
import Image from "next/image";
import { formatJapaneseNumber } from "@/lib/numberFormat";

interface ProfileHeaderProps {
	username: string;
	posts: number;
	followers: number;
	following: number;
	bio: string[];
	profileImage: string;
	onEditProfile: () => void;
	onShareProfile: () => void;
	onAddFriend: () => void;
}

export default function ProfileHeader({
	username,
	posts,
	followers,
	following,
	bio,
	profileImage,
	onEditProfile,
	onShareProfile,
	onAddFriend,
}: ProfileHeaderProps) {
	const [showFullBio, setShowFullBio] = useState(false);

	// 3行まで表示、それ以上は「続きを読む」で省略
	const maxLines = 3;
	const shouldShowReadMore = bio.length > maxLines;
	const displayedBio = showFullBio ? bio : bio.slice(0, maxLines);
	return (
		<div className="px-4">
			{/* プロフィール写真と基本情報 */}
			<div className="flex items-start space-x-4 mb-4">
				<div className="relative">
					{/* プロフィール写真 */}
					<div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-[var(--border-icon)] relative">
						<Image
							src={profileImage}
							alt="Profile"
							fill
							sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
							quality={95}
							priority
							className="object-cover"
						/>
					</div>

					{/* ストーリー追加ボタン */}
					{/* <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
						<svg
							className="w-3 h-3 text-black"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</button> */}
				</div>

				{/* ユーザー名 */}
				<div className="flex-1">
					<div className="mb-3">
						<h2 className="text-sm font-semibold text-[var(--text-primary)]">
							{username}
						</h2>
					</div>

					{/* 統計情報 */}
					<div className="flex justify-between">
						<div className="text-center flex-1">
							<div className="text-lg font-semibold text-[var(--text-primary)]">
								{formatJapaneseNumber(posts)}
							</div>
							<div className="text-sm text-[var(--text-tertiary)]">投稿</div>
						</div>
						<div className="text-center flex-1">
							<div className="text-lg font-semibold text-[var(--text-primary)]">
								{formatJapaneseNumber(followers)}
							</div>
							<div className="text-sm text-[var(--text-tertiary)]">
								フォロワー
							</div>
						</div>
						<div className="text-center flex-1">
							<div className="text-lg font-semibold text-[var(--text-primary)]">
								{formatJapaneseNumber(following)}
							</div>
							<div className="text-sm text-[var(--text-tertiary)]">
								フォロー中
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* 自己紹介 */}
			<div className="mb-4">
				{displayedBio.map((line, index) => (
					<div
						key={index}
						className="text-sm text-[var(--text-primary)] leading-relaxed"
					>
						{line}
					</div>
				))}

				{/* 続きを読むボタン */}
				{shouldShowReadMore && (
					<button
						onClick={() => setShowFullBio(!showFullBio)}
						className="text-sm text-[var(--text-disabled)] hover:text-[var(--text-tertiary)] mt-1 transition-colors"
					>
						{showFullBio ? "続きを隠す" : "続きを読む"}
					</button>
				)}
			</div>

			{/* アクションボタン */}
			<div className="flex space-x-2">
				<button
					onClick={onEditProfile}
					className="flex-1 py-1.5 px-2 rounded-lg text-xs sm:text-sm font-medium bg-[var(--bg-profile-button)] text-[var(--text-primary)] hover:bg-[var(--bg-profile-button-hover)] transition-colors whitespace-nowrap"
				>
					プロフィールを編集
				</button>
				<button
					onClick={onShareProfile}
					className="flex-1 py-1.5 px-2 rounded-lg text-xs sm:text-sm font-medium bg-[var(--bg-profile-button)] text-[var(--text-primary)] hover:bg-[var(--bg-profile-button-hover)] transition-colors whitespace-nowrap"
				>
					QRコードを表示
				</button>
				<button
					onClick={onAddFriend}
					className="p-1.5 rounded-lg bg-[var(--bg-profile-button)] text-[var(--text-primary)] hover:bg-[var(--bg-profile-button-hover)] transition-colors"
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 4v16m8-8H4"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
