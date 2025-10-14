"use client";

import React from "react";
import { ItineraryCard } from "@/components/features/posts";

interface Itinerary {
	id: string;
	title: string;
	startDate: string;
	endDate: string;
	images: string[];
	members: {
		id: string;
		name: string;
		avatar: string;
	}[];
}

interface ItineraryGridProps {
	itineraries: Itinerary[];
}

export default function ItineraryGrid({ itineraries }: ItineraryGridProps) {
	// しおりが空の場合
	if (itineraries.length === 0) {
		return (
			<div className="bg-[var(--bg-content)] text-center py-12">
				<svg
					className="w-16 h-16 text-[var(--text-disabled)] mx-auto mb-4"
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
				<div className="text-[var(--text-primary)] text-lg mb-2">
					しおりがありません
				</div>
				<button className="text-blue-500 text-sm">最初のしおりを作成</button>
			</div>
		);
	}

	// しおり一覧の表示
	return (
		<div className="p-4">
			<div className="grid grid-cols-2 gap-3">
				{itineraries.map((itinerary) => (
					<ItineraryCard
						key={itinerary.id}
						title={itinerary.title}
						startDate={itinerary.startDate}
						images={itinerary.images}
						members={itinerary.members}
					/>
				))}
			</div>
		</div>
	);
}
