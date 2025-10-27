"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useInfiniteQuery } from "@tanstack/react-query";
import "swiper/css";

import {
	BottomNavigationBar,
	MainContentArea,
	PageWrapper,
	FlexibleHeader,
	HamburgerToggle,
	UserIdDisplay,
	BackButton,
	ProfileHeader,
	InfinitePostList,
} from "@/components";
import { TabNav } from "@/components/ui/TabNav";

export default function SwipePage() {
	// State
	const [activeTab, setActiveTab] = useState(0);
	const [slideProgress, setSlideProgress] = useState(0);
	const [swiperHeight, setSwiperHeight] = useState(0);
	const [minSwiperHeight, setMinSwiperHeight] = useState(0);
	const [profileHeaderHeight, setProfileHeaderHeight] = useState(0);

	// Refs
	const swiperRef = useRef<SwiperType | null>(null);
	const mainAreaRef = useRef<HTMLDivElement>(null);
	const tabNavRef = useRef<HTMLDivElement>(null);
	const profileHeaderRef = useRef<HTMLDivElement>(null);
	const tabScrollPositions = useRef<Record<number, number>>({
		0: 0,
		1: 0,
		2: 0,
	});

	// 無限スクロール用データ取得
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery({
			queryKey: ["posts"],
			queryFn: async ({ pageParam = 1 }) => {
				const res = await fetch(`/api/posts?page=${pageParam}&limit=20`);
				if (!res.ok) throw new Error("Failed to fetch");
				return res.json();
			},
			getNextPageParam: (lastPage) =>
				lastPage.hasMore ? lastPage.page + 1 : undefined,
			initialPageParam: 1,
		});

	const allPosts = data?.pages.flatMap((page) => page.data) ?? [];

	// タブ切り替えハンドラー
	const handleTabChange = (tab: number) => {
		if (mainAreaRef.current) {
			tabScrollPositions.current[activeTab] = mainAreaRef.current.scrollTop;
		}
		setActiveTab(tab);
		swiperRef.current?.slideTo(tab);
	};

	// スライド切り替え完了後に高さとスクロール位置を更新
	const handleSlideChangeTransitionEnd = (swiper: SwiperType) => {
		const currentIndex = swiper.activeIndex;
		const activeSlide = swiper.slides[currentIndex];

		if (!activeSlide || !mainAreaRef.current) return;

		// スライド遷移完了時のスクロール位置を保存
		const currentScrollTop = mainAreaRef.current.scrollTop;

		// 高さを計算
		let newHeight = 0;
		if (currentIndex === 0) {
			// タブ1（無限スクロール）は高さを"auto"にする
			newHeight = 0;
		} else {
			// タブ2, 3は固定コンテンツの高さを取得
			const firstChild = activeSlide.firstElementChild as HTMLElement;
			newHeight = firstChild
				? firstChild.offsetHeight
				: activeSlide.offsetHeight;
		}

		// 高さを設定
		setSwiperHeight(newHeight);

		// スクロール位置を復元（プロフィールヘッダーが隠れている場合のみ）
		if (currentScrollTop >= profileHeaderHeight) {
			const savedPosition = tabScrollPositions.current[currentIndex] || 0;
			const restorePosition = Math.max(savedPosition, profileHeaderHeight);

			// 高さの変更がDOMに反映された後にスクロール位置を復元
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					if (mainAreaRef.current) {
						mainAreaRef.current.scrollTop = restorePosition;
					}
				});
			});
		}
	};

	// 無限スクロール検知
	useEffect(() => {
		const element = mainAreaRef.current;
		if (!element) return;

		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = element;
			const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

			if (
				activeTab === 0 &&
				scrollPercentage > 0.8 &&
				hasNextPage &&
				!isFetchingNextPage
			) {
				fetchNextPage();
			}
		};

		element.addEventListener("scroll", handleScroll);
		return () => element.removeEventListener("scroll", handleScroll);
	}, [activeTab, hasNextPage, isFetchingNextPage, fetchNextPage]);

	// 高さの監視と更新
	useEffect(() => {
		const updateHeights = () => {
			if (mainAreaRef.current && tabNavRef.current) {
				const mainHeight = mainAreaRef.current.clientHeight;
				const tabNavHeight = tabNavRef.current.offsetHeight;
				setMinSwiperHeight(mainHeight - tabNavHeight);
			}

			if (profileHeaderRef.current) {
				setProfileHeaderHeight(profileHeaderRef.current.offsetHeight);
			}
		};

		updateHeights();

		const resizeObserver = new ResizeObserver(updateHeights);
		if (mainAreaRef.current) resizeObserver.observe(mainAreaRef.current);
		if (tabNavRef.current) resizeObserver.observe(tabNavRef.current);
		if (profileHeaderRef.current)
			resizeObserver.observe(profileHeaderRef.current);

		return () => resizeObserver.disconnect();
	}, []);

	return (
		<PageWrapper>
			{/* ヘッダー */}
			<FlexibleHeader
				leftRatio={1}
				className="h-16 px-4 flex-shrink-0"
				leftContent={
					<div className="flex items-center gap-2">
						<div className="w-10 flex justify-start">
							<BackButton fallbackRoute="/login" size={24} />
						</div>
						<UserIdDisplay
							userId="shun1020_trip-app"
							hasMultipleAccounts={false}
							isOpen={false}
							onClick={() => {}}
						/>
					</div>
				}
				rightContent={
					<HamburgerToggle isOpen={false} onClick={() => {}} size={40} />
				}
			/>

			{/* メインコンテンツエリア */}
			<MainContentArea>
				<div
					ref={mainAreaRef}
					className="h-full overflow-y-auto scrollbar-hide overscroll-none"
				>
					{/* プロフィールヘッダー */}
					<div ref={profileHeaderRef}>
						<ProfileHeader
							username="shun1020_trip-app"
							posts={123}
							followers={456}
							following={789}
							bio={[
								"旅行好きです✈️",
								"世界中を巡っています",
								"素敵な旅の思い出を共有します",
							]}
							profileImage="/images/profile/プロフィールアイコン画像.JPG"
							onEditProfile={() => {}}
							onShareProfile={() => {}}
							onAddFriend={() => {}}
						/>
					</div>

					{/* タブナビゲーション */}
					<div ref={tabNavRef} className="sticky top-0 z-10 bg-white border-b">
						<TabNav
							activeTab={activeTab}
							onChange={handleTabChange}
							slideProgress={slideProgress}
						/>
					</div>

					{/* タブコンテンツ（Swiper） */}
					<Swiper
						slidesPerView={1}
						spaceBetween={0}
						allowTouchMove={true}
						onSwiper={(swiper) => (swiperRef.current = swiper)}
						onSlideChange={(swiper) => {
							if (mainAreaRef.current) {
								tabScrollPositions.current[activeTab] =
									mainAreaRef.current.scrollTop;
							}
							setActiveTab(swiper.activeIndex);
						}}
						onProgress={(swiper, progress) => {
							// スライドの進行度を更新（0〜1の範囲を0〜2に変換）
							setSlideProgress(progress * (swiper.slides.length - 1));
						}}
						onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
						style={{
							height: swiperHeight > 0 ? `${swiperHeight}px` : "auto",
							minHeight: minSwiperHeight > 0 ? `${minSwiperHeight}px` : "auto",
						}}
					>
						{/* タブ1: 投稿 */}
						<SwiperSlide>
							<InfinitePostList
								posts={allPosts}
								hasNextPage={hasNextPage}
								isFetchingNextPage={isFetchingNextPage}
								isLoading={isLoading}
								onLoadMore={fetchNextPage}
							/>
						</SwiperSlide>

						{/* タブ2: お気に入り */}
						<SwiperSlide>
							<div className="p-4">
								<div className="space-y-4">
									{Array.from({ length: 15 }).map((_, i) => (
										<div
											key={i}
											className="h-24 bg-blue-200 rounded flex items-center justify-center"
										>
											タブ2 - アイテム {i + 1}
										</div>
									))}
								</div>
							</div>
						</SwiperSlide>

						{/* タブ3: レビュー */}
						<SwiperSlide>
							<div className="p-4">
								<div className="space-y-4">
									<div className="h-24 bg-green-200 rounded flex items-center justify-center">
										タブ3 - アイテム 1
									</div>
								</div>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</MainContentArea>

			{/* ボトムナビゲーション */}
			<BottomNavigationBar />
		</PageWrapper>
	);
}
