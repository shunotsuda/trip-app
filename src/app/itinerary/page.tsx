"use client";

import Link from "next/link";
import Image from "next/image";

interface ItineraryCard {
	id: string;
	title: string;
	date: string;
	imageLeft: string;
	imageRight: string;
	emoji: string;
}

const sampleItineraries: ItineraryCard[] = [
	{
		id: "1",
		title: "北海道 海の幸巡り 🍣 in...",
		date: "日付未定",
		imageLeft: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&h=200&fit=crop",
		imageRight: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop",
		emoji: "🍣"
	},
	{
		id: "2",
		title: "東京旅行 & ディズニーラ...",
		date: "日付未定",
		imageLeft: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop",
		imageRight: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop",
		emoji: "🏰"
	},
	{
		id: "3",
		title: "沖縄旅行 ✈️",
		date: "日付未定",
		imageLeft: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
		imageRight: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
		emoji: "✈️"
	}
];

export default function ItineraryPage() {

	return (
		<div className="min-h-screen bg-stone-50">
			{/* Header */}
			<header className="bg-white px-4 py-4 shadow-sm">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-bold text-gray-900">旅のしおり</h1>
					<div className="flex items-center space-x-3">
						{/* Filter Button */}
						<button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
							</svg>
						</button>
						
						{/* Calendar Button */}
						<button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<span>すべて</span>
						</button>
						
						{/* Help Button */}
						<button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="px-4 py-6 pb-24">
				<div className="grid grid-cols-2 gap-4">
					{sampleItineraries.map((itinerary) => (
						<ItineraryCard key={itinerary.id} itinerary={itinerary} />
					))}
				</div>
			</main>

			{/* Floating Action Button */}
			<Link
				href="/create-itinerary"
				className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg transition-colors duration-200 flex items-center space-x-2 z-10"
			>
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
				</svg>
				<span className="font-medium">しおり作成</span>
			</Link>

			{/* Bottom Navigation */}
			<nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
				<div className="flex items-center justify-around">
					<NavItem
						icon={
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						}
						label="発見"
						isActive={false}
						onClick={() => {}}
					/>
					<NavItem
						icon={
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
							</svg>
						}
						label="スワイプ"
						isActive={false}
						onClick={() => {}}
					/>
					<NavItem
						icon={
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						}
						label="マップ"
						isActive={false}
						onClick={() => {}}
					/>
					<NavItem
						icon={
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
						}
						label="しおり"
						isActive={true}
						onClick={() => {}}
					/>
					<NavItem
						icon={
							<div className="w-6 h-6 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full flex items-center justify-center">
								<svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
								</svg>
							</div>
						}
						label="マイページ"
						isActive={false}
						onClick={() => {}}
					/>
				</div>
			</nav>
		</div>
	);
}

interface ItineraryCardProps {
	itinerary: ItineraryCard;
}

function ItineraryCard({ itinerary }: ItineraryCardProps) {
	return (
		<Link
			href={`/itinerary/${itinerary.id}`}
			className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
		>
			{/* Split Image */}
			<div className="relative h-32">
					<div className="absolute inset-0 flex">
						<div className="w-1/2 h-full">
							<Image
								src={itinerary.imageLeft}
								alt="Left side"
								width={150}
								height={128}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="w-1/2 h-full">
							<Image
								src={itinerary.imageRight}
								alt="Right side"
								width={150}
								height={128}
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
			</div>
			
			{/* Content */}
			<div className="p-3">
				<h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">
					{itinerary.title}
				</h3>
				<p className="text-xs text-gray-500">
					{itinerary.date}
				</p>
			</div>
		</Link>
	);
}

interface NavItemProps {
	icon: React.ReactNode;
	label: string;
	isActive: boolean;
	onClick: () => void;
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
	return (
		<button
			onClick={onClick}
			className={`flex flex-col items-center space-y-1 py-2 px-3 transition-colors ${
				isActive ? "text-blue-500" : "text-gray-500 hover:text-gray-700"
			}`}
		>
			{icon}
			<span className="text-xs font-medium">{label}</span>
			{isActive && (
				<div className="w-1 h-1 bg-blue-500 rounded-full"></div>
			)}
		</button>
	);
}
