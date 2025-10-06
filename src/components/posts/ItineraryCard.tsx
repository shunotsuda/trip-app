"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

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
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isFavorite, setIsFavorite] = useState(false);
	const [showNavigation, setShowNavigation] = useState(false);
	const [touchStart, setTouchStart] = useState<number | null>(null);
	const [touchEnd, setTouchEnd] = useState<number | null>(null);
	const imageContainerRef = useRef<HTMLDivElement>(null);

	// タッチスワイプ機能
	const handleTouchStart = (e: React.TouchEvent) => {
		setTouchEnd(null);
		setTouchStart(e.targetTouches[0].clientX);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const handleTouchEnd = () => {
		if (!touchStart || !touchEnd) return;

		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > 50;
		const isRightSwipe = distance < -50;

		if (isLeftSwipe && currentImageIndex < images.length - 1) {
			setCurrentImageIndex(currentImageIndex + 1);
		}
		if (isRightSwipe && currentImageIndex > 0) {
			setCurrentImageIndex(currentImageIndex - 1);
		}
	};

	// ナビゲーション機能
	const goToPrevious = () => {
		if (currentImageIndex > 0) {
			setCurrentImageIndex(currentImageIndex - 1);
		}
	};

	const goToNext = () => {
		if (currentImageIndex < images.length - 1) {
			setCurrentImageIndex(currentImageIndex + 1);
		}
	};

	// お気に入り切り替え
	const toggleFavorite = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsFavorite(!isFavorite);
	};

	const formatDate = (startDate: string, endDate: string) => {
		if (startDate === "未定" || endDate === "未定") {
			return "日付未定";
		}
		return `${startDate}～${endDate}`;
	};

	const getPaginationDots = () => {
		const totalImages = images.length;
		if (totalImages <= 1) return null;
		if (totalImages <= 5) {
			return Array.from({ length: totalImages }, (_, index) => (
				<button
					key={index}
					onClick={() => setCurrentImageIndex(index)}
					className={`w-2 h-2 rounded-full transition-all duration-200 ${
						index === currentImageIndex
							? "bg-white scale-125"
							: "bg-white/50 hover:bg-white/75"
					}`}
				/>
			));
		}

		// 5個のドットパターン
		const dots = [];

		// 1枚目
		dots.push(
			<button
				key={0}
				onClick={() => setCurrentImageIndex(0)}
				className={`w-2 h-2 rounded-full transition-all duration-200 ${
					currentImageIndex === 0
						? "bg-white scale-125"
						: "bg-white/50 hover:bg-white/75"
				}`}
			/>
		);

		// 2枚目
		dots.push(
			<button
				key={1}
				onClick={() => setCurrentImageIndex(1)}
				className={`w-2 h-2 rounded-full transition-all duration-200 ${
					currentImageIndex === 1
						? "bg-white scale-125"
						: "bg-white/50 hover:bg-white/75"
				}`}
			/>
		);

		// 中間のドット（現在の画像が2番目から最後から2番目まで）
		if (currentImageIndex > 1 && currentImageIndex < totalImages - 2) {
			dots.push(
				<button
					key="middle"
					onClick={() => setCurrentImageIndex(currentImageIndex)}
					className="w-2 h-2 rounded-full bg-white scale-125"
				/>
			);
		} else {
			dots.push(
				<button
					key="middle"
					onClick={() => setCurrentImageIndex(Math.floor(totalImages / 2))}
					className="w-2 h-2 rounded-full bg-white/50 hover:bg-white/75"
				/>
			);
		}

		// 最後から2番目
		dots.push(
			<button
				key={totalImages - 2}
				onClick={() => setCurrentImageIndex(totalImages - 2)}
				className={`w-2 h-2 rounded-full transition-all duration-200 ${
					currentImageIndex === totalImages - 2
						? "bg-white scale-125"
						: "bg-white/50 hover:bg-white/75"
				}`}
			/>
		);

		// 最後
		dots.push(
			<button
				key={totalImages - 1}
				onClick={() => setCurrentImageIndex(totalImages - 1)}
				className={`w-2 h-2 rounded-full transition-all duration-200 ${
					currentImageIndex === totalImages - 1
						? "bg-white scale-125"
						: "bg-white/50 hover:bg-white/75"
				}`}
			/>
		);

		return dots;
	};

	const renderMembers = () => {
		const displayMembers = members.slice(0, 3);
		const remainingCount = members.length - 3;

		return (
			<div className="flex items-center">
				{displayMembers.map((member, index) => (
					<div
						key={member.id}
						className={`relative ${index > 0 ? "-ml-2" : ""}`}
						style={{ zIndex: displayMembers.length - index }}
					>
						<Image
							src={member.avatar}
							alt={member.name}
							width={24}
							height={24}
							className="w-6 h-6 rounded-full border-2 border-white object-cover"
						/>
					</div>
				))}
				{remainingCount > 0 && (
					<div className="flex items-center justify-center min-w-6 h-6 px-1 rounded-full bg-gray-200 border-2 border-white -ml-2 text-xs font-medium text-gray-600 shadow-sm">
						<span className="text-xs">+</span>
						<span className="text-sm font-bold">{remainingCount}</span>
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
			{/* 画像スライダー */}
			<div
				ref={imageContainerRef}
				className="relative aspect-[4/3] bg-gray-100 group"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onMouseEnter={() => setShowNavigation(true)}
				onMouseLeave={() => setShowNavigation(false)}
			>
				{images.length > 0 && (
					<>
						<Image
							src={images[currentImageIndex]}
							alt={title}
							fill
							className="object-cover"
						/>

						{/* お気に入りボタン */}
						<button
							onClick={toggleFavorite}
							className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
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

						{/* PC用ナビゲーションボタン */}
						{images.length > 1 && showNavigation && (
							<>
								{/* 前の画像ボタン */}
								{currentImageIndex > 0 && (
									<button
										onClick={goToPrevious}
										className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
									>
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 19l-7-7 7-7"
											/>
										</svg>
									</button>
								)}

								{/* 次の画像ボタン */}
								{currentImageIndex < images.length - 1 && (
									<button
										onClick={goToNext}
										className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
									>
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</button>
								)}
							</>
						)}

						{/* スライドナビゲーション */}
						{images.length > 1 && (
							<div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
								{getPaginationDots()}
							</div>
						)}
					</>
				)}
			</div>

			{/* コンテンツ */}
			<div className="p-3">
				{/* タイトル */}
				<h3 className="font-medium text-gray-900 text-sm mb-2 leading-tight line-clamp-2">
					{title}
				</h3>

				{/* 日付 */}
				<div className="text-xs text-gray-500 mb-3">
					{formatDate(startDate, endDate)}
				</div>

				{/* メンバー */}
				<div className="flex items-center justify-between">
					{renderMembers()}
				</div>
			</div>
		</div>
	);
}
