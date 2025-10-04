"use client";

import Image from "next/image";

interface Post {
	id: string;
	image: string;
	isVideo?: boolean;
}

interface PostGridProps {
	posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
	return (
		<div className="grid grid-cols-3 gap-1 bg-white">
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
				</div>
			))}
		</div>
	);
}
