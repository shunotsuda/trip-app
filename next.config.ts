import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
		],
		// フォーマット最適化
		formats: ["image/webp", "image/avif"],
		// デバイス別サイズ最適化
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		// 画像サイズの最適化
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		// 最小化を無効にして高品質を維持
		minimumCacheTTL: 60,
		// 画像品質の設定
		qualities: [75, 80, 85, 90, 95],
	},
};

export default nextConfig;
