"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateItineraryPage() {
	const [title, setTitle] = useState("");
	const [destination, setDestination] = useState("");
	const [date, setDate] = useState("");

	return (
		<div className="min-h-screen bg-stone-50">
			{/* Header */}
			<header className="bg-white px-4 py-4 shadow-sm">
				<div className="flex items-center justify-between">
					<Link
						href="/itinerary"
						className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</Link>
					<h1 className="text-lg font-semibold text-gray-900">しおり作成</h1>
					<div className="w-9"></div> {/* Spacer for centering */}
				</div>
			</header>

			{/* Main Content */}
			<main className="px-4 py-6">
				<div className="max-w-md mx-auto">
					<div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
						{/* Title Input */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								しおりのタイトル
							</label>
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="例: 北海道旅行"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
							/>
						</div>

						{/* Destination Input */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								行き先
							</label>
							<input
								type="text"
								value={destination}
								onChange={(e) => setDestination(e.target.value)}
								placeholder="例: 北海道"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
							/>
						</div>

						{/* Date Input */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								旅行日
							</label>
							<input
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
							/>
						</div>

						{/* Create Button */}
						<button
							disabled={!title || !destination}
							className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
								title && destination
									? "bg-blue-500 text-white hover:bg-blue-600"
									: "bg-gray-300 text-gray-500 cursor-not-allowed"
							}`}
						>
							しおりを作成
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
