"use client";

import React from "react";
import Image from "next/image";

interface Post {
	id: string;
	image: string;
	isVideo?: boolean;
	isFavorite?: boolean;
	members?: string[];
	date?: string;
}

interface PostGridProps {
	posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
	// 投稿が空の場合
	if (posts.length === 0) {
		return (
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
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<div className="text-black text-lg mb-2">投稿がありません</div>
				<button className="text-blue-500 text-sm">最初の投稿を作成</button>
			</div>
		);
	}

	return (
		<div className="bg-stone-100">
			{/* 投稿表示エリア */}
			<div className="grid grid-cols-3 gap-1">
				{posts.map((post, index) => (
					<div key={post.id} className="aspect-square relative">
						<Image
							src={post.image}
							alt={`Post ${index + 1}`}
							fill
							sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
							quality={90}
							priority={index < 6}
							className="object-cover"
						/>
						{post.isVideo && (
							<div className="absolute top-2 right-2">
								<svg
									className="w-4 h-4 text-white drop-shadow-lg"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
								</svg>
							</div>
						)}
						{post.isFavorite && (
							<div className="absolute top-2 left-2">
								<svg
									className="w-4 h-4 text-pink-500 fill-current drop-shadow-lg"
									viewBox="0 0 24 24"
								>
									<path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
								</svg>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
