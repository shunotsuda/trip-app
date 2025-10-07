"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { PageLayout } from "@/components/layout";
import { FormInput, PasswordInput, SubmitButton } from "@/components/forms";
import {
	validateEmail,
	validatePassword,
	getEmailError,
} from "@/lib/validation";

function EmailLoginContent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const searchParams = useSearchParams();
	const emailInputRef = useRef<HTMLInputElement>(null);

	// URLパラメータからメールアドレスを取得して初期値として設定
	useEffect(() => {
		const emailParam = searchParams.get("email");
		if (emailParam) {
			setEmail(emailParam);
		}
	}, [searchParams]);

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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const emailValid = validateEmail(email);
		const passwordValidation = validatePassword(password);
		const passwordValid = Object.values(passwordValidation).every(Boolean);

		if (!emailValid) {
			setEmailError("有効なメールアドレスを入力してください");
		}

		if (emailValid && passwordValid) {
			setIsLoading(true);
			// ここでログイン処理を実装
			setTimeout(() => {
				setIsLoading(false);
				// ログイン成功時の処理
			}, 2000);
		}
	};

	const passwordValidation = validatePassword(password);
	const isFormValid =
		validateEmail(email) && Object.values(passwordValidation).every(Boolean);

	return (
		<PageLayout
			title="メールアドレスでログイン"
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

				{/* Submit Button */}
				<SubmitButton
					isLoading={isLoading}
					isValid={isFormValid}
					loadingText="ログイン中..."
				>
					ログイン
				</SubmitButton>
			</form>

			{/* Forgot Password Link */}
			<div className="mt-4 md:mt-5 lg:mt-6 text-center">
				<a
					href="/login/forgot-password"
					className="text-cyan-400 hover:text-cyan-500 transition-colors text-sm md:text-base"
				>
					パスワードを忘れた方
				</a>
			</div>

			{/* Signup Link */}
			<div className="mt-4 md:mt-5 lg:mt-6 text-center">
				<p className="text-sm md:text-base lg:text-lg text-gray-600">
					アカウントをお持ちでない方は
					<a
						href="/signup/email"
						className="text-cyan-400 hover:text-cyan-500 transition-colors font-medium"
					>
						新規登録
					</a>
				</p>
			</div>
		</PageLayout>
	);
}

export default function EmailLoginPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<EmailLoginContent />
		</Suspense>
	);
}
