"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const router = useRouter();
	const emailInputRef = useRef<HTMLInputElement>(null);

	// ページ読み込み時にメールアドレス入力欄にフォーカス
	useEffect(() => {
		if (emailInputRef.current) {
			emailInputRef.current.focus();
		}
	}, []);

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		if (value && !validateEmail(value)) {
			setEmailError("有効なメールアドレスを入力してください");
		} else {
			setEmailError("");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const emailValid = validateEmail(email);

		if (!emailValid) {
			setEmailError("有効なメールアドレスを入力してください");
			return;
		}

		setIsLoading(true);
		// ここでパスワードリセット処理を実装
		setTimeout(() => {
			setIsLoading(false);
			setIsSubmitted(true);
		}, 2000);
	};

	const isFormValid = validateEmail(email);

	// 5秒後に自動でメールアドレスログインページに遷移
	useEffect(() => {
		if (isSubmitted) {
			const timer = setTimeout(() => {
				router.push(`/login/email?email=${encodeURIComponent(email)}`);
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [isSubmitted, email, router]);

	return (
		<div className="min-h-screen bg-stone-50 px-4 py-4">
			<div className="w-full max-w-md md:max-w-lg lg:max-w-xl md:mx-auto pb-20 md:pb-0">
				{/* Back Button - Top Left (only show when not submitted) */}
				{!isSubmitted && (
					<div className="mb-4 md:mb-3">
						<Link
							href="/login/email"
							className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
						>
							<svg
								className="w-5 h-5 mr-2"
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
							戻る
						</Link>
					</div>
				)}

				{/* Content */}
				{!isSubmitted ? (
					<>
						{/* Title */}
						<div className="text-center mb-6">
							<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
								パスワードを忘れた方
							</h2>
							<p className="text-gray-600 mb-2">
								パスワード再設定用の確認コードを送信します
							</p>
							<p className="text-gray-600">
								登録しているメールアドレスを入力してください
							</p>
						</div>

						{/* Form */}
						<form
							onSubmit={handleSubmit}
							className="space-y-4 md:space-y-5 lg:space-y-6"
						>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									メールアドレス
								</label>
								<input
									ref={emailInputRef}
									type="email"
									id="email"
									name="email"
									value={email}
									onChange={handleEmailChange}
									required
									className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-colors ${
										emailError ? "border-red-300 bg-red-50" : "border-gray-300"
									}`}
									placeholder="example@email.com"
								/>
								{emailError && (
									<p className="mt-1 text-xs text-red-600">{emailError}</p>
								)}
							</div>

							<button
								type="submit"
								disabled={!isFormValid || isLoading}
								className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
									isFormValid && !isLoading
										? "bg-gradient-to-r from-cyan-400 to-pink-400 text-white hover:from-cyan-500 hover:to-pink-500"
										: "bg-gray-300 text-gray-500 cursor-not-allowed"
								}`}
							>
								{isLoading ? (
									<div className="flex items-center justify-center">
										<svg
											className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										送信中...
									</div>
								) : (
									"送信"
								)}
							</button>
						</form>
					</>
				) : (
					/* Success Message */
					<div className="text-center py-8">
						<div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-100 to-cyan-100 rounded-full flex items-center justify-center mb-6">
							<svg
								className="w-10 h-10 text-green-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							メールを送信しました
						</h2>
						<p className="text-gray-600 mb-6">
							{email} にパスワードリセット用のメールを送信しました。
							<br />
							メール内のリンクをクリックして、新しいパスワードを設定してください。
						</p>
						<div className="bg-gray-50 rounded-lg p-4 mb-6">
							<p className="text-sm text-gray-500">
								💡 メールが届かない場合は、迷惑メールフォルダもご確認ください。
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
