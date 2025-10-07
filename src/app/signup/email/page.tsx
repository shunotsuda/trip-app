"use client";

import { useState, useEffect, useRef } from "react";
import { PageLayout } from "@/components/layout";
import { FormInput, PasswordInput, SubmitButton } from "@/components/forms";
import {
	validateEmail,
	validatePassword,
	getEmailError,
	getConfirmPasswordError,
} from "@/lib/validation";

export default function EmailSignupPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const emailInputRef = useRef<HTMLInputElement>(null);

	// ページ読み込み時にメールアドレス入力欄にフォーカス
	useEffect(() => {
		if (emailInputRef.current) {
			emailInputRef.current.focus();
		}
	}, []);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		setEmailError(getEmailError(value));
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
		setConfirmPasswordError(getConfirmPasswordError(password, value));
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
		<PageLayout
			title="メールアドレスで新規登録"
			backHref="/login"
			logoHref="/login"
		>
			<form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
				{/* Email Field */}
				<FormInput
					ref={emailInputRef}
					type="email"
					id="email"
					name="email"
					value={email}
					onChange={handleEmailChange}
					placeholder="example@email.com"
					error={emailError}
					required
				/>

				{/* Password Field */}
				<PasswordInput
					id="password"
					name="password"
					value={password}
					onChange={handlePasswordChange}
					placeholder="パスワードを入力"
					error={passwordError}
					required
					showValidation={true}
					validation={passwordValidation}
				/>

				{/* Confirm Password Field */}
				<PasswordInput
					id="confirmPassword"
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleConfirmPasswordChange}
					placeholder="パスワードを再入力"
					error={confirmPasswordError}
					required
				/>

				{/* Submit Button */}
				<SubmitButton
					isLoading={isLoading}
					isValid={isFormValid}
					loadingText="登録中..."
				>
					新規登録
				</SubmitButton>
			</form>

			{/* Login Link */}
			<div className="mt-4 md:mt-5 lg:mt-6 text-center">
				<p className="text-sm md:text-base lg:text-lg text-gray-600">
					すでにアカウントをお持ちの方は
					<a
						href="/login/email"
						className="text-cyan-400 hover:text-cyan-500 transition-colors font-medium"
					>
						ログイン
					</a>
				</p>
			</div>
		</PageLayout>
	);
}
