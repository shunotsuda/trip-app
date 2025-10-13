"use client";

import { useState, forwardRef } from "react";

interface PasswordInputProps {
	id: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	error?: string;
	required?: boolean;
	className?: string;
	showValidation?: boolean;
	validation?: {
		length: boolean;
		alphanumeric: boolean;
	};
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
	(
		{
			id,
			name,
			value,
			onChange,
			placeholder,
			error,
			required,
			className = "",
			showValidation = false,
			validation,
		},
		ref
	) => {
		const [showPassword, setShowPassword] = useState(false);

		return (
			<div>
				<label
					htmlFor={id}
					className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
				>
					{name === "password" ? "パスワード" : "パスワード確認"}
				</label>
				<div className="relative">
					<input
						ref={ref}
						type={showPassword ? "text" : "password"}
						id={id}
						name={name}
						value={value}
						onChange={onChange}
						required={required}
						className={`w-full px-3 py-2.5 pr-10 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-colors ${
							error
								? "border-red-300 bg-red-50"
								: "border-[var(--border-input)]"
						} ${className}`}
						placeholder={placeholder}
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
				{error && <p className="mt-1 text-xs text-red-600">{error}</p>}

				{/* Password Validation */}
				{showValidation && validation && value && (
					<div className="mt-2 space-y-1">
						<div className="flex items-center text-xs">
							<div
								className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
									validation.length
										? "bg-green-100 text-green-600"
										: "bg-gray-100 text-gray-400"
								}`}
							>
								{validation.length && (
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
									validation.length ? "text-green-600" : "text-gray-500"
								}
							>
								8文字以上
							</span>
						</div>
						<div className="flex items-center text-xs">
							<div
								className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
									validation.alphanumeric
										? "bg-green-100 text-green-600"
										: "bg-gray-100 text-gray-400"
								}`}
							>
								{validation.alphanumeric && (
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
									validation.alphanumeric ? "text-green-600" : "text-gray-500"
								}
							>
								英数字を含む
							</span>
						</div>
					</div>
				)}
			</div>
		);
	}
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
