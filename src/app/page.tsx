import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen bg-stone-50 flex items-center justify-center">
			<div className="text-center">
				<div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-400 via-pink-400 to-amber-200 rounded-3xl flex items-center justify-center">
					<div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
						<span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
							T
						</span>
					</div>
				</div>
				<h1 className="text-4xl font-bold text-gray-900 mb-4">TRIP APP</h1>
				<p className="text-gray-600 mb-8">旅行をより楽しく、便利に</p>
				<Link
					href="/login"
					className="inline-block bg-gradient-to-r from-cyan-400 to-pink-400 text-white px-8 py-4 rounded-xl font-medium hover:from-cyan-500 hover:to-pink-500 transition-all duration-200 transform hover:scale-105"
				>
					ログインして始める
				</Link>
			</div>
		</div>
	);
}
