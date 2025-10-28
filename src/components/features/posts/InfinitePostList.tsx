"use client";

import { Spinner } from "@/components/ui/Spinner";

interface Post {
	id: string;
	title: string;
	content: string;
	imageUrl: string | null;
	likes: number;
	comments: number;
	createdAt: string;
}

interface InfinitePostListProps {
	posts: Post[];
	hasNextPage?: boolean;
	isFetchingNextPage?: boolean;
	isLoading?: boolean;
	isError?: boolean;
	error?: Error | null;
	onLoadMore?: () => void;
	onRetry?: () => void;
}

export function InfinitePostList({
	posts,
	hasNextPage,
	isFetchingNextPage,
	isLoading,
	isError,
	error,
	onLoadMore,
	onRetry,
}: InfinitePostListProps) {
	// エラー表示
	if (isError) {
		return (
			<div className="p-8 pt-16 text-center space-y-4">
				<div className="text-6xl">⚠️</div>
				<div className="text-gray-700 font-semibold text-lg">
					投稿の読み込みに失敗しました
				</div>
				<div className="text-gray-500 text-sm">
					{error?.message || "ネットワークエラーが発生しました"}
				</div>
				{onRetry && (
					<div className="pt-2">
						<button
							onClick={onRetry}
							className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
						>
							再試行
						</button>
					</div>
				)}
			</div>
		);
	}

	// ローディング表示
	if (isLoading) {
		return (
			<div className="p-8 pt-16 text-center">
				<div className="space-y-4">
					<Spinner size={60} />
					<div className="text-gray-500 font-medium">投稿を読み込み中...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="p-4 space-y-4">
			{posts.map((post) => (
				<div key={post.id} className="bg-white rounded-lg shadow p-4 space-y-2">
					<h3 className="font-bold text-lg">{post.title}</h3>
					<p className="text-gray-600 text-sm">{post.content}</p>
					{post.imageUrl && (
						<div className="w-full h-48 bg-gray-200 rounded overflow-hidden">
							<img
								src={post.imageUrl}
								alt={post.title}
								className="w-full h-full object-cover"
							/>
						</div>
					)}
					<div className="flex gap-4 text-sm text-gray-500">
						<span>❤️ {post.likes}</span>
						<span>💬 {post.comments}</span>
					</div>
				</div>
			))}

			{/* 無限スクロールのローディング */}
			{hasNextPage && (
				<div className="flex flex-col items-center justify-center h-32 gap-3">
					{isFetchingNextPage ? (
						<Spinner size={40} />
					) : (
						onLoadMore && (
							<button
								onClick={onLoadMore}
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							>
								もっと見る
							</button>
						)
					)}
				</div>
			)}

			{!hasNextPage && posts.length > 0 && (
				<div className="text-center text-gray-400 text-sm py-8">
					すべての投稿を表示しました
				</div>
			)}
		</div>
	);
}
