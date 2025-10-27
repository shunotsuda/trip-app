import { NextRequest, NextResponse } from "next/server";

// モックデータ生成
function generateMockPosts(page: number, limit: number) {
	const posts = [];
	const startId = (page - 1) * limit + 1;

	for (let i = 0; i < limit; i++) {
		const id = startId + i;
		posts.push({
			id: `post-${id}`,
			title: `投稿 ${id}`,
			content: `これは投稿 ${id} のコンテンツです。旅行の思い出を共有します。`,
			imageUrl:
				Math.random() > 0.3
					? `/images/profile/投稿画像${(id % 7) + 1}.JPG`
					: null,
			likes: Math.floor(Math.random() * 1000),
			comments: Math.floor(Math.random() * 100),
			createdAt: new Date(Date.now() - id * 1000 * 60 * 60).toISOString(),
		});
	}

	return posts;
}

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const page = parseInt(searchParams.get("page") || "1");
	const limit = parseInt(searchParams.get("limit") || "20");

	// 遅延をシミュレート（ローディング確認用）
	await new Promise((resolve) => setTimeout(resolve, 1500));

	const posts = generateMockPosts(page, limit);

	// 10ページまでデータがあると仮定
	const hasMore = page < 10;

	return NextResponse.json({
		data: posts,
		page,
		limit,
		hasMore,
	});
}
