"use client";

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
	onLoadMore?: () => void;
}

export function InfinitePostList({
	posts,
	hasNextPage,
	isFetchingNextPage,
	isLoading,
	onLoadMore,
}: InfinitePostListProps) {
	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center gap-4 p-8">
				<div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
				<div className="text-gray-500 font-medium">投稿を読み込み中...</div>
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
						<>
							<div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
							<div className="text-gray-500 text-sm">さらに読み込み中...</div>
						</>
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
