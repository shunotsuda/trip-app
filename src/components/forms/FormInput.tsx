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
					className="block text-sm font-medium text-gray-700 mb-2"
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
					className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-colors ${
						error ? "border-red-300 bg-red-50" : "border-gray-300"
					} ${className}`}
					placeholder={placeholder}
				/>
				{error && <p className="mt-1 text-xs text-red-600">{error}</p>}
			</div>
		);
	}
);

FormInput.displayName = "FormInput";

export default FormInput;
