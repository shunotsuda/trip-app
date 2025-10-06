"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Avatar, AvatarGroup } from "@mui/material";

interface ItineraryCardProps {
	title: string;
	startDate: string;
	endDate: string;
	images: string[];
	members: Array<{
		id: string;
		name: string;
		avatar: string;
	}>;
}

export default function ItineraryCard({
	title,
	startDate,
	endDate,
	images,
	members,
}: ItineraryCardProps) {
	const [isFavorite, setIsFavorite] = useState(false);

	// お気に入り切り替え
	const toggleFavorite = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsFavorite(!isFavorite);
	};

	const formatDate = (startDate: string) => {
		if (!startDate || startDate === "未定") {
			return "日付未定";
		}
		return `${startDate}～`;
	};

	const renderMembers = () => {
		if (!members || members.length === 0) {
			return null;
		}

		return (
			<AvatarGroup
				max={3}
				sx={{
					"& .MuiAvatar-root": {
						width: 24,
						height: 24,
						fontSize: "0.75rem",
						border: "2px solid white",
						boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
					},
					"& .MuiAvatarGroup-avatar": {
						width: 24,
						height: 24,
						fontSize: "0.75rem",
						backgroundColor: "#e5e7eb",
						color: "#6b7280",
						border: "2px solid white",
						boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
					},
				}}
			>
				{members.map((member) => (
					<Avatar
						key={member.id}
						src={member.avatar}
						alt={member.name || "メンバー"}
						sx={{
							width: 24,
							height: 24,
						}}
					>
						{(member.name || "M").charAt(0).toUpperCase()}
					</Avatar>
				))}
			</AvatarGroup>
		);
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
			{/* 画像スライダー */}
			<div className="relative aspect-[4/3] bg-gray-100 group">
				{images && images.length > 0 && (
					<>
						<Swiper
							modules={[Pagination, Navigation]}
							spaceBetween={0}
							slidesPerView={1}
							pagination={{
								clickable: true,
								bulletClass: "swiper-pagination-bullet !bg-white/50 !w-2 !h-2",
								bulletActiveClass:
									"swiper-pagination-bullet-active !bg-white !scale-125",
							}}
							navigation={{
								nextEl: ".swiper-button-next",
								prevEl: ".swiper-button-prev",
							}}
							className="w-full h-full"
							// iPhoneのタッチ操作を最適化
							touchRatio={1}
							touchAngle={45}
							simulateTouch={true}
							allowTouchMove={true}
							resistance={true}
							resistanceRatio={0.85}
							// スムーズなアニメーション
							speed={300}
							effect="slide"
							// 慣性スクロール
							freeMode={false}
							// エッジでのバウンス効果
							edgeSwipeDetection={true}
							edgeSwipeThreshold={20}
						>
							{images.map((image, index) => (
								<SwiperSlide key={index}>
									<Image
										src={image}
										alt={`${title || "画像"} - ${index + 1}`}
										fill
										className="object-cover"
									/>
								</SwiperSlide>
							))}
						</Swiper>

						{/* お気に入りボタン */}
						<button
							onClick={toggleFavorite}
							className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 z-10"
						>
							<svg
								className={`w-5 h-5 transition-colors duration-200 ${
									isFavorite ? "text-pink-500 fill-current" : "text-gray-400"
								}`}
								fill={isFavorite ? "currentColor" : "none"}
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</button>

						{/* ナビゲーション矢印 (PCホバー時のみ) */}
						{images && images.length > 1 && (
							<>
								<div className="swiper-button-prev !text-white !opacity-0 group-hover:!opacity-100 !transition-opacity !duration-200 !w-8 !h-8 !mt-0 !left-2 !top-1/2 !-translate-y-1/2 !bg-black/20 !rounded-full !backdrop-blur-sm"></div>
								<div className="swiper-button-next !text-white !opacity-0 group-hover:!opacity-100 !transition-opacity !duration-200 !w-8 !h-8 !mt-0 !right-2 !top-1/2 !-translate-y-1/2 !bg-black/20 !rounded-full !backdrop-blur-sm"></div>
							</>
						)}

						{/* カスタムページネーション */}
						<div className="swiper-pagination !bottom-2 !left-1/2 !-translate-x-1/2 !flex !justify-center !gap-1"></div>
					</>
				)}
			</div>

			{/* カード情報 */}
			<div className="p-3">
				{/* タイトル */}
				<h3 className="text-sm font-bold text-gray-900 line-clamp-1 mb-2">
					{title || ""}
				</h3>

				{/* 日付とメンバーアイコン */}
				<div className="flex items-center justify-between">
					<div className="text-xs text-gray-500">{formatDate(startDate)}</div>
					{renderMembers()}
				</div>
			</div>
		</div>
	);
}
