"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FormPageLayout } from "@/components/layout/PageLayout";
import { FormInput, SubmitButton } from "@/components/forms";
import { validateEmail, getEmailError } from "@/lib/validation/rules";

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

	// 送信完了後5秒で自動リダイレクト
	useEffect(() => {
		if (isSubmitted) {
			const timer = setTimeout(() => {
				router.push(`/login/email?email=${encodeURIComponent(email)}`);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [isSubmitted, email, router]);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		setEmailError(getEmailError(value) || "");
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

	return (
		<FormPageLayout
			title="パスワードを忘れた方"
			backHref="/login/email"
			showLogo={false}
		>
			{!isSubmitted ? (
				<>
					{/* Description */}
					<div className="text-center mb-6 md:mb-8">
						<p className="text-sm md:text-base text-[var(--text-tertiary)] leading-relaxed">
							パスワード再設定用の確認コードを送信します
							<br />
							登録しているメールアドレスを入力してください
						</p>
					</div>

					{/* Form */}
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

						{/* Submit Button */}
						<SubmitButton
							isLoading={isLoading}
							isValid={isFormValid}
							loadingText="送信中..."
						>
							送信
						</SubmitButton>
					</form>
				</>
			) : (
				/* Success Message */
				<div className="text-center">
					<div className="mb-6">
						<div className="w-16 h-16 mx-auto mb-4  rounded-full flex items-center justify-center">
							<svg
								className="w-8 h-8 text-purple-600"
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
						<h2 className="text-xl font-bold text-[var(--text-emphasis)] mb-2">
							送信完了
						</h2>
						<p className="text-sm md:text-base text-[var(--text-tertiary)] mb-4">
							パスワード再設定用の確認コードを
							<br />
							<strong>{email}</strong>
							<br />
							に送信しました。
						</p>
						<div className=" rounded-lg p-4 mb-6">
							<p className="text-sm text-[var(--text-tertiary)]">
								💡 メールが届かない場合は、迷惑メールフォルダもご確認ください。
							</p>
						</div>
					</div>
				</div>
			)}
		</FormPageLayout>
	);
}
