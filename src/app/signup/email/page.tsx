"use client";

import Link from "next/link";
import { useState } from "react";

export default function EmailSignupPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePassword = (password: string) => {
		return {
			length: password.length >= 8,
			alphanumeric: /[a-zA-Z]/.test(password) && /[0-9]/.test(password),
		};
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

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
		setPasswordError("");
	};

	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;
		setConfirmPassword(value);
		if (value && value !== password) {
			setConfirmPasswordError("パスワードが一致しません");
		} else {
			setConfirmPasswordError("");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const emailValid = validateEmail(email);
		const passwordValidation = validatePassword(password);
		const passwordValid = Object.values(passwordValidation).every(Boolean);
		const confirmPasswordValid = password === confirmPassword;

		if (!emailValid) {
			setEmailError("有効なメールアドレスを入力してください");
		}

		if (!confirmPasswordValid) {
			setConfirmPasswordError("パスワードが一致しません");
		}

		if (emailValid && passwordValid && confirmPasswordValid) {
			setIsLoading(true);
			// ここで新規登録処理を実装
			setTimeout(() => {
				setIsLoading(false);
				// 登録成功時の処理
			}, 2000);
		}
	};

	const passwordValidation = validatePassword(password);
	const isFormValid =
		validateEmail(email) &&
		Object.values(passwordValidation).every(Boolean) &&
		password === confirmPassword;

	return (
		<div className="min-h-screen bg-stone-50 px-4 py-4">
			<div className="w-full max-w-md md:max-w-lg lg:max-w-xl md:mx-auto pb-20 md:pb-0">
				{/* Back Button - Top Left */}
				<div className="mb-4 md:mb-3">
					<button
						onClick={() => window.history.back()}
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
					</button>
				</div>

				{/* Logo */}
				<div className="text-center mb-4 md:mb-3">
					<div className="w-18 h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 mx-auto bg-gradient-to-br from-cyan-400 via-pink-400 to-amber-200 rounded-2xl flex items-center justify-center">
						<div className="w-12 h-12 md:w-12 md:h-12 lg:w-13 lg:h-13 bg-white rounded-xl flex items-center justify-center">
							<span className="text-2xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
								T
							</span>
						</div>
					</div>
				</div>

				{/* App Name */}
				<div className="text-center mb-4 md:mb-3">
					<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
						TRIP APP
					</h1>
				</div>

				{/* Signup Form */}
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

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							パスワード
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								value={password}
								onChange={handlePasswordChange}
								required
								className={`w-full px-3 py-2.5 pr-10 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-colors ${
									passwordError ? "border-red-300 bg-red-50" : "border-gray-300"
								}`}
								placeholder="パスワードを入力"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
							>
								{showPassword ? (
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									</svg>
								) : (
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
										/>
									</svg>
								)}
							</button>
						</div>

						{/* Password Requirements */}
						<div className="mt-2 space-y-1">
							<div className="flex items-center text-xs">
								<span
									className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${
										passwordValidation.length
											? "bg-green-100 text-green-600"
											: "bg-gray-100 text-gray-400"
									}`}
								>
									✓
								</span>
								<span
									className={
										passwordValidation.length
											? "text-green-600"
											: "text-gray-500"
									}
								>
									8文字以上
								</span>
							</div>
							<div className="flex items-center text-xs">
								<span
									className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${
										passwordValidation.alphanumeric
											? "bg-green-100 text-green-600"
											: "bg-gray-100 text-gray-400"
									}`}
								>
									✓
								</span>
								<span
									className={
										passwordValidation.alphanumeric
											? "text-green-600"
											: "text-gray-500"
									}
								>
									半角英数字を含む
								</span>
							</div>
						</div>
					</div>

					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							パスワード確認
						</label>
						<div className="relative">
							<input
								type={showConfirmPassword ? "text" : "password"}
								id="confirmPassword"
								name="confirmPassword"
								value={confirmPassword}
								onChange={handleConfirmPasswordChange}
								required
								className={`w-full px-3 py-2.5 pr-10 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-colors ${
									confirmPasswordError
										? "border-red-300 bg-red-50"
										: "border-gray-300"
								}`}
								placeholder="パスワードを再入力"
							/>
							<button
								type="button"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
							>
								{showConfirmPassword ? (
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									</svg>
								) : (
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
										/>
									</svg>
								)}
							</button>
						</div>
						{confirmPasswordError && (
							<p className="mt-1 text-xs text-red-600">
								{confirmPasswordError}
							</p>
						)}
					</div>

					<div className="flex items-center">
						<label className="flex items-center">
							<input
								type="checkbox"
								required
								className="w-3.5 h-3.5 text-cyan-400 border-gray-300 rounded focus:ring-cyan-400"
							/>
							<span className="ml-2 text-xs text-gray-600">
								<Link
									href="/terms"
									className="text-cyan-400 hover:text-cyan-500 transition-colors underline"
								>
									利用規約
								</Link>
								および
								<Link
									href="/privacy"
									className="text-cyan-400 hover:text-cyan-500 transition-colors underline"
								>
									プライバシーポリシー
								</Link>
								に同意する
							</span>
						</label>
					</div>

					<button
						type="submit"
						disabled={!isFormValid || isLoading}
						className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
							isFormValid && !isLoading
								? "bg-gradient-to-r from-cyan-400 to-pink-400 text-white hover:from-cyan-500 hover:to-pink-500 "
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
								登録中...
							</div>
						) : (
							"アカウントを作成"
						)}
					</button>
				</form>

				{/* Login Link */}
				<div className="mt-4 md:mt-5 lg:mt-6 text-center">
					<p className="text-sm md:text-base lg:text-lg text-gray-600">
						すでにアカウントをお持ちの方は
						<Link
							href="/login"
							className="text-cyan-400 hover:text-cyan-500 transition-colors font-medium"
						>
							ログイン
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
