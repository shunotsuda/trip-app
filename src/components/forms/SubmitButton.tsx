interface SubmitButtonProps {
	isLoading: boolean;
	isValid: boolean;
	loadingText?: string;
	children: React.ReactNode;
	className?: string;
}

export default function SubmitButton({
	isLoading,
	isValid,
	loadingText = "処理中...",
	children,
	className = "",
}: SubmitButtonProps) {
	return (
		<button
			type="submit"
			disabled={!isValid || isLoading}
			className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-150 ${
				isValid && !isLoading
					? "bg-gradient-to-r from-cyan-400 to-pink-400 text-white hover:from-cyan-500 hover:to-pink-500"
					: "bg-gray-300 text-gray-500 cursor-not-allowed"
			} ${className}`}
		>
			{isLoading ? loadingText : children}
		</button>
	);
}
