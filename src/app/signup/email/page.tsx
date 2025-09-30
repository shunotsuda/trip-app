"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

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
				{/* Desktop Header - Horizontal Layout */}
				<div className="hidden lg:flex items-center justify-between mb-6">
					{/* Back Button */}
					<Link
						href="/login"
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

					{/* Title */}
					<h1 className="text-2xl font-bold text-gray-900">
						メールアドレスで新規登録
					</h1>

					{/* Logo */}
					<Link
						href="/login"
						className="logo-link w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden hover:opacity-80 transition-opacity duration-150"
						style={{
							background: "#faf7f0",
						}}
					>
						{/* 波模様の装飾 */}
						<div className="absolute inset-0 rounded-2xl overflow-hidden">
							<div
								className="absolute top-1 left-1 w-6 h-6 rounded-full"
								style={{
									background: "linear-gradient(45deg, #e0f2fe, #bae6fd)",
								}}
							></div>
							<div
								className="absolute top-2 right-2 w-4 h-4 rounded-full"
								style={{
									background: "linear-gradient(45deg, #fce7f3, #fbcfe8)",
								}}
							></div>
							<div
								className="absolute bottom-2 left-2 w-5 h-5 rounded-full"
								style={{
									background: "linear-gradient(45deg, #fef3c7, #fde68a)",
								}}
							></div>
							<div
								className="absolute bottom-1 right-1 w-3 h-3 rounded-full"
								style={{
									background: "linear-gradient(45deg, #e0e7ff, #c7d2fe)",
								}}
							></div>
						</div>
						<span className="text-sm font-bold text-gray-800 relative z-10">
							SHUN
						</span>
					</Link>
				</div>

				{/* Mobile Layout */}
				<div className="lg:hidden">
					{/* Back Button - Top Left */}
					<div className="mb-4 md:mb-3">
						<Link
							href="/login"
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

					{/* Logo */}
					<div className="text-center mb-4 md:mb-3">
						<Link
							href="/login"
							className="logo-link w-20 h-20 md:w-24 md:h-24 mx-auto rounded-2xl flex items-center justify-center relative overflow-hidden hover:opacity-80 transition-opacity duration-150"
							style={{
								background: "#faf7f0",
							}}
						>
							{/* 波模様の装飾 */}
							<div className="absolute inset-0 rounded-2xl overflow-hidden">
								<div
									className="absolute top-2 left-2 w-8 h-8 rounded-full"
									style={{
										background: "linear-gradient(45deg, #e0f2fe, #bae6fd)",
									}}
								></div>
								<div
									className="absolute top-4 right-3 w-6 h-6 rounded-full"
									style={{
										background: "linear-gradient(45deg, #fce7f3, #fbcfe8)",
									}}
								></div>
								<div
									className="absolute bottom-3 left-4 w-7 h-7 rounded-full"
									style={{
										background: "linear-gradient(45deg, #fef3c7, #fde68a)",
									}}
								></div>
								<div
									className="absolute bottom-2 right-2 w-5 h-5 rounded-full"
									style={{
										background: "linear-gradient(45deg, #e0e7ff, #c7d2fe)",
									}}
								></div>
							</div>
							<span className="text-lg md:text-xl font-bold text-gray-800 relative z-10">
								SHUN
							</span>
						</Link>
					</div>

					{/* Title */}
					<h1 className="text-2xl font-bold text-gray-900 text-center mb-6 md:mb-8">
						メールアドレスで新規登録
					</h1>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
					{/* Email Field */}
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

					{/* Password Field */}
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
								className="absolute inset-y-0 right-0 pr-3 flex items-center"
							>
								{showPassword ? (
									<svg
										className="h-5 w-5 text-gray-400"
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
								) : (
									<svg
										className="h-5 w-5 text-gray-400"
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
								)}
							</button>
						</div>
						{passwordError && (
							<p className="mt-1 text-xs text-red-600">{passwordError}</p>
						)}

						{/* Password Validation */}
						{password && (
							<div className="mt-2 space-y-1">
								<div className="flex items-center text-xs">
									<div
										className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
											passwordValidation.length
												? "bg-green-100 text-green-600"
												: "bg-gray-100 text-gray-400"
										}`}
									>
										{passwordValidation.length && (
											<svg
												className="w-3 h-3"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										)}
									</div>
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
									<div
										className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
											passwordValidation.alphanumeric
												? "bg-green-100 text-green-600"
												: "bg-gray-100 text-gray-400"
										}`}
									>
										{passwordValidation.alphanumeric && (
											<svg
												className="w-3 h-3"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										)}
									</div>
									<span
										className={
											passwordValidation.alphanumeric
												? "text-green-600"
												: "text-gray-500"
										}
									>
										英数字を含む
									</span>
								</div>
							</div>
						)}
					</div>

					{/* Confirm Password Field */}
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
								onClick={() =>
									setShowConfirmPassword(!showConfirmPassword)
								}
								className="absolute inset-y-0 right-0 pr-3 flex items-center"
							>
								{showConfirmPassword ? (
									<svg
										className="h-5 w-5 text-gray-400"
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
								) : (
									<svg
										className="h-5 w-5 text-gray-400"
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
								)}
							</button>
						</div>
						{confirmPasswordError && (
							<p className="mt-1 text-xs text-red-600">
								{confirmPasswordError}
							</p>
						)}
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={!isFormValid || isLoading}
						className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-150 ${
							isFormValid && !isLoading
								? "bg-gradient-to-r from-cyan-400 to-pink-400 text-white hover:from-cyan-500 hover:to-pink-500"
								: "bg-gray-300 text-gray-500 cursor-not-allowed"
						}`}
					>
						{isLoading ? "登録中..." : "新規登録"}
					</button>
				</form>

				{/* Login Link */}
				<div className="mt-4 md:mt-5 lg:mt-6 text-center">
					<p className="text-sm md:text-base lg:text-lg text-gray-600">
						すでにアカウントをお持ちの方は
						<Link
							href="/login/email"
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
