import Link from "next/link";

export default function LoginPage() {
	return (
		<div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
			<div className="w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col justify-between h-screen py-4">
				{/* Main Content */}
				<div className="flex flex-col justify-center md:justify-center xl:justify-start flex-1 pt-0 md:pt-0 xl:pt-6">
					{/* Logo and App Name */}
					<div className="text-center mb-4 md:mb-3">
						<div className="w-18 h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 mx-auto mb-3 md:mb-2 bg-gradient-to-br from-cyan-400 via-pink-400 to-amber-200 rounded-2xl flex items-center justify-center">
							<div className="w-12 h-12 md:w-12 md:h-12 lg:w-13 lg:h-13 bg-white rounded-xl flex items-center justify-center">
								<span className="text-2xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
									T
								</span>
							</div>
						</div>
						<h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-2">
							TRIP APP
						</h1>
						<p className="text-base md:text-base text-gray-600">
							旅行をより楽しく
						</p>
					</div>

					{/* Login Options */}
					<div className="space-y-3 md:space-y-2">
						{/* Email Option */}
						<Link
							href="/login/email"
							className="w-full bg-white text-gray-700 py-4 md:py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:shadow-sm transition-colors duration-150 cursor-pointer"
						>
							<svg
								className="w-6 h-6 md:w-6 md:h-6"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
								<polyline points="22,6 12,13 2,6" />
							</svg>
							<span className="font-medium text-base md:text-base">
								メールアドレスで続ける
							</span>
						</Link>

						{/* GitHub Login */}
						<button className="w-full bg-black text-white py-4 md:py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 hover:bg-gray-800 hover:shadow-sm transition-colors duration-150 cursor-pointer">
							<svg
								className="w-6 h-6 md:w-6 md:h-6"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
							</svg>
							<span className="font-medium text-base md:text-base">
								GitHubで続ける
							</span>
						</button>

						{/* Google Login */}
						<button className="w-full bg-white text-gray-700 py-4 md:py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:shadow-sm transition-colors duration-150 cursor-pointer">
							<svg className="w-6 h-6 md:w-6 md:h-6" viewBox="0 0 24 24">
								<path
									fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="#34A853"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="#FBBC05"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="#EA4335"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							<span className="font-medium text-base md:text-base">
								Googleで続ける
							</span>
						</button>

						{/* Facebook Login */}
						<button className="w-full bg-white text-gray-700 py-4 md:py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:shadow-sm transition-colors duration-150 cursor-pointer">
							<svg
								className="w-6 h-6 md:w-6 md:h-6"
								viewBox="0 0 24 24"
								fill="#1877F2"
							>
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
							<span className="font-medium text-base md:text-base">
								Facebookで続ける
							</span>
						</button>
					</div>
				</div>

				{/* Legal Links - Bottom */}
				<div className="text-center text-xs md:text-sm text-gray-500 pb-4 md:pb-4">
					<p className="mb-1 md:mb-2">本サービスの利用開始により</p>
					<p>
						<Link
							href="/terms"
							className="text-cyan-400 hover:text-cyan-500 transition-colors underline"
						>
							利用規約
						</Link>
						と
						<Link
							href="/privacy"
							className="text-cyan-400 hover:text-cyan-500 transition-colors underline"
						>
							プライバシーポリシー
						</Link>
						に同意したことになります
					</p>
				</div>
			</div>
		</div>
	);
}
