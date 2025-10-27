import { forwardRef } from "react";

interface FormInputProps {
	type?: string;
	id: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	error?: string;
	required?: boolean;
	className?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	(
		{
			type = "text",
			id,
			name,
			value,
			onChange,
			placeholder,
			error,
			required,
			className = "",
		},
		ref
	) => {
		return (
			<div>
				<label
					htmlFor={id}
					className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
				>
					{name === "email"
						? "メールアドレス"
						: name === "password"
						? "パスワード"
						: name === "confirmPassword"
						? "パスワード確認"
						: name}
				</label>
				<input
					ref={ref}
					type={type}
					id={id}
					name={name}
					value={value}
					onChange={onChange}
					required={required}
					className={`w-full px-3 py-2.5 border rounded-lg transition-colors ${
						error ? "input-error" : "border-[var(--border-input)]"
					} ${className}`}
					placeholder={placeholder}
				/>
				{error && (
					<p className="mt-1 text-xs text-[var(--text-alert)]">{error}</p>
				)}
			</div>
		);
	}
);

FormInput.displayName = "FormInput";

export default FormInput;
