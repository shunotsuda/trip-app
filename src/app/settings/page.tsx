"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
	TopNavigationBar,
	SearchBar,
	SectionHeader,
	MainContentArea,
	PageWrapper,
} from "@/components";
import Card from "@/components/ui/Card";
import { CardGroup } from "@/components/ui/Card";
import { profileData } from "@/data/dummyData";
import { useTheme } from "@/contexts";
import {
	analyzeImage,
	saveImageAnalysisResult,
	clearImageAnalysisResult,
} from "@/lib/theme/imageAnalysis";

export default function SettingsPage() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const {
		background,
		backgroundImage,
		mode,
		setBackground,
		setBackgroundImage,
		toggleMode,
	} = useTheme();

	const handleBackClick = () => {
		// 履歴がある場合は戻る、ない場合はプロフィールページに遷移
		if (window.history.length > 1) {
			router.back();
		} else {
			router.push("/profile");
		}
	};

	const handleProfileClick = () => {
		console.log("プロフィールページに遷移");
	};

	const handleViewAllClick = () => {
		console.log("すべて見る");
	};

	// 背景色の選択肢
	const backgrounds = [
		{ id: "peach", class: "bg-accent", name: "ピーチ" },
		{
			id: "white",
			class: "bg-[var(--text-white)]",
			name: "ホワイト(ブラック)",
		},
		{ id: "stone", class: "bg-[var(--bg-page)]", name: "ホワイト(グレー)" },
	];

	// プリセット壁紙の選択肢
	const wallpapers = [
		{ id: "wall1", path: "/images/wallpapers/wall.jpg", name: "壁紙1" },
		{
			id: "wall2",
			path: "/images/wallpapers/wallpaper_202305_1.jpg",
			name: "壁紙2",
		},
		{
			id: "wall3",
			path: "/images/wallpapers/wallpaper_202311_1.jpg",
			name: "壁紙3",
		},
		{
			id: "wall4",
			path: "/images/wallpapers/wallpaper_202403_1.jpg",
			name: "壁紙4",
		},
	];

	// 画像アップロード処理（解析機能付き）
	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			// ファイルをData URLに変換
			const dataUrl = await new Promise<string>((resolve) => {
				const reader = new FileReader();
				reader.onloadend = () => resolve(reader.result as string);
				reader.readAsDataURL(file);
			});

			// 背景画像を設定（即座に表示）
			setBackgroundImage(dataUrl);

			// 画像解析を実行（バックグラウンドで）
			console.log("🔍 画像解析を開始...");
			const analysisResult = await analyzeImage(dataUrl);

			// 解析結果を保存
			saveImageAnalysisResult(analysisResult);

			console.log("✅ 画像解析完了:", {
				luminance: analysisResult.averageLuminance.toFixed(3),
				contrast: analysisResult.contrast.toFixed(3),
				alphaLight: analysisResult.overlayAlphaLight,
				alphaDark: analysisResult.overlayAlphaDark,
				blendModeLight: analysisResult.blendModeLight,
				blendModeDark: analysisResult.blendModeDark,
			});

			// localStorage と Cookie の保存内容を出力
			console.log("📦 localStorage保存内容:", {
				userBackgroundImage:
					localStorage.getItem("userBackgroundImage")?.substring(0, 50) + "...",
				userBgOverlayLight: localStorage.getItem("userBgOverlayLight"),
				userBgOverlayDark: localStorage.getItem("userBgOverlayDark"),
				userBgBlendModeLight: localStorage.getItem("userBgBlendModeLight"),
				userBgBlendModeDark: localStorage.getItem("userBgBlendModeDark"),
			});

			console.log("🍪 Cookie保存内容:", {
				cookies: document.cookie
					.split("; ")
					.filter((c) => c.startsWith("userBg") || c.startsWith("userTheme")),
			});
		} catch (error) {
			console.error("❌ 画像解析エラー:", error);
			// エラー時もデフォルト値で表示は継続
		}
	};

	return (
		<PageWrapper>
			{/* ヘッダー */}
			<TopNavigationBar
				backButton={{
					show: true,
					onClick: handleBackClick,
				}}
				title={{
					type: "title",
					content: "設定とアクティビティ",
				}}
				rightActions={[]}
			/>

			{/* メインコンテンツエリア */}
			<MainContentArea>
				<div className="p-4">
					{/* 検索バー */}
					<SearchBar
						placeholder="検索"
						value={searchQuery}
						onChange={setSearchQuery}
						className="mb-4"
					/>

					{/* あなたのアカウント */}
					<SectionHeader title="あなたのアカウント" className="px-1 mb-2" />
					<div className="bg-[var(--bg-page)] rounded-lg shadow-sm mb-6">
						<Card
							item={{
								id: "profile",
								image: profileData.profileImage,
								title: "~shun~",
								subtitle: profileData.username,
								showArrow: true,
								onClick: handleProfileClick,
							}}
						/>
					</div>

					{/* ダークモード設定 */}
					<SectionHeader title="表示モード" className="px-1 mb-2" />
					<div className="bg-[var(--bg-page)] rounded-lg shadow-sm p-4 mb-6">
						<div className="flex items-center justify-between">
							<div>
								<div className="text-sm font-medium text-[var(--text-emphasis)]">
									ダークモード
								</div>
								<div className="text-xs text-[var(--text-muted)] mt-1">
									{mode === "dark" ? "オン" : "オフ"}
								</div>
							</div>
							<button
								onClick={toggleMode}
								className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
									mode === "dark" ? "bg-blue-600" : "bg-gray-200"
								}`}
							>
								<span
									className={`inline-block h-6 w-6 transform rounded-full bg-[var(--bg-page)] transition-transform ${
										mode === "dark" ? "translate-x-7" : "translate-x-1"
									}`}
								/>
							</button>
						</div>
					</div>

					{/* 背景設定 */}
					<SectionHeader title="背景設定" className="px-1 mb-2" />
					<div className="bg-[var(--bg-page)] rounded-lg shadow-sm p-4 mb-6">
						{/* カスタム画像アップロード */}
						<div className="mb-6">
							<label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
								カスタム画像
							</label>
							{backgroundImage ? (
								<div className="space-y-3">
									{/* 現在の背景画像プレビュー */}
									<div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-[var(--border)]">
										<Image
											src={backgroundImage}
											alt="背景画像"
											fill
											className="object-cover"
											quality={100}
											unoptimized
										/>
									</div>
									{/* ボタン */}
									<div className="flex items-center gap-3">
										<input
											type="file"
											accept="image/*"
											onChange={handleImageUpload}
											className="hidden"
											id="bg-image-upload"
										/>
										<label
											htmlFor="bg-image-upload"
											className="flex-1 cursor-pointer px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-center text-sm font-medium"
										>
											画像を変更
										</label>
										<button
											onClick={() => {
												setBackgroundImage(null);
												clearImageAnalysisResult(); // 解析結果もクリア
											}}
											className="px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
										>
											削除
										</button>
									</div>
								</div>
							) : (
								<div className="flex items-center gap-3">
									<input
										type="file"
										accept="image/*"
										onChange={handleImageUpload}
										className="hidden"
										id="bg-image-upload"
									/>
									<label
										htmlFor="bg-image-upload"
										className="flex-1 cursor-pointer px-4 py-3 border-2 border-dashed border-[var(--border-input)] rounded-lg hover:border-blue-400 transition-colors text-center"
									>
										<svg
											className="w-8 h-8 mx-auto mb-2 text-[var(--text-disabled)]"
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
										<span className="text-sm text-[var(--text-tertiary)]">
											画像をアップロード
										</span>
									</label>
								</div>
							)}
						</div>

						{/* プリセット色 */}
						<div className="mb-6">
							<label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
								プリセット色
							</label>
							<div className="grid grid-cols-3 gap-3">
								{backgrounds.map((bg) => (
									<button
										key={bg.id}
										onClick={() => {
											setBackground(bg.class);
											setBackgroundImage(null); // 背景画像をクリア
											clearImageAnalysisResult(); // 解析結果もクリア
										}}
										className={`relative aspect-square rounded-lg ${
											bg.class
										} border-2 ${
											background === bg.class && !backgroundImage
												? "border-blue-500 ring-2 ring-blue-200"
												: "border-[var(--border)]"
										} transition-all hover:scale-105 active:scale-95`}
									>
										{background === bg.class && !backgroundImage && (
											<div className="absolute inset-0 flex items-center justify-center">
												<svg
													className="w-6 h-6 text-blue-500"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
										)}
										<span className=" text-xs text-center text-[var(--text-tertiary)]">
											{bg.name}
										</span>
									</button>
								))}
							</div>
						</div>

						{/* プリセット壁紙 */}
						<div>
							<label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
								プリセット壁紙
							</label>
							<div className="grid grid-cols-2 gap-3">
								{wallpapers.map((wallpaper) => (
									<button
										key={wallpaper.id}
										onClick={async () => {
											// プリセット壁紙も解析して最適化
											try {
												setBackgroundImage(wallpaper.path);
												console.log(
													"🔍 プリセット画像解析を開始:",
													wallpaper.name
												);
												const analysisResult = await analyzeImage(
													wallpaper.path
												);
												saveImageAnalysisResult(analysisResult);
												console.log(
													"✅ プリセット画像解析完了:",
													analysisResult
												);

												// localStorage と Cookie の保存内容を出力
												console.log("📦 localStorage保存内容:", {
													userBackgroundImage: localStorage.getItem(
														"userBackgroundImage"
													),
													userBgOverlayLight:
														localStorage.getItem("userBgOverlayLight"),
													userBgOverlayDark:
														localStorage.getItem("userBgOverlayDark"),
													userBgBlendModeLight: localStorage.getItem(
														"userBgBlendModeLight"
													),
													userBgBlendModeDark: localStorage.getItem(
														"userBgBlendModeDark"
													),
												});

												console.log("🍪 Cookie保存内容:", {
													cookies: document.cookie
														.split("; ")
														.filter(
															(c) =>
																c.startsWith("userBg") ||
																c.startsWith("userTheme")
														),
												});
											} catch (error) {
												console.error("❌ プリセット画像解析エラー:", error);
											}
										}}
										className={`relative aspect-video rounded-lg overflow-hidden border-2 ${
											backgroundImage === wallpaper.path
												? "border-blue-500 ring-2 ring-blue-200"
												: "border-[var(--border)]"
										} transition-all hover:scale-105 active:scale-95`}
									>
										<Image
											src={wallpaper.path}
											alt={wallpaper.name}
											fill
											className="object-cover"
											quality={100}
											unoptimized
										/>
										{backgroundImage === wallpaper.path && (
											<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
												<svg
													className="w-8 h-8 text-white"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
										)}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* コネクテッドエクスペリエンス */}
					<SectionHeader
						title="コネクテッドエクスペリエンス"
						showViewAll={true}
						onViewAllClick={handleViewAllClick}
						className="px-1 mb-2"
					/>
					<CardGroup
						group={{
							id: "connected-experiences",
							items: [
								{
									id: "profile-share",
									icon: (
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
											/>
										</svg>
									),
									title: "プロフィール間のシェア",
									showArrow: true,
									onClick: () => console.log("プロフィール間のシェア"),
								},
								{
									id: "login-accounts",
									icon: (
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
											/>
										</svg>
									),
									title: "ログインに使用するアカウント",
									showArrow: true,
									onClick: () => console.log("ログインに使用するアカウント"),
								},
							],
						}}
						className="mb-6"
					/>

					{/* アカウント設定 */}
					<SectionHeader title="アカウント設定" className="px-1 mb-2" />
					<CardGroup
						group={{
							id: "account-settings",
							items: [
								{
									id: "password-security",
									icon: (
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
											/>
										</svg>
									),
									title: "パスワードとセキュリティ",
									showArrow: true,
									onClick: () => console.log("パスワードとセキュリティ"),
								},
								{
									id: "personal-info",
									icon: (
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
									),
									title: "個人の情報",
									showArrow: true,
									onClick: () => console.log("個人の情報"),
								},
								{
									id: "info-access",
									icon: (
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
											/>
										</svg>
									),
									title: "あなたの情報とアクセス許可",
									showArrow: true,
									onClick: () => console.log("あなたの情報とアクセス許可"),
								},
								{
									id: "ad-settings",
									icon: (
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
											/>
										</svg>
									),
									title: "広告表示の設定",
									showArrow: true,
									onClick: () => console.log("広告表示の設定"),
								},
								{
									id: "meta-pay",
									icon: (
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
											/>
										</svg>
									),
									title: "Meta Pay",
									showArrow: true,
									onClick: () => console.log("Meta Pay"),
								},
								{
									id: "subscription",
									icon: (
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									),
									title: "サブスクリプション",
									showArrow: true,
									onClick: () => console.log("サブスクリプション"),
								},
							],
						}}
						className="mb-6"
					/>
				</div>
			</MainContentArea>
		</PageWrapper>
	);
}
