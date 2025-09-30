import Link from "next/link";

interface BackButtonProps {
	href?: string;
	onClick?: () => void;
	className?: string;
	children?: React.ReactNode;
}

export default function BackButton({ 
	href, 
	onClick, 
	className = "", 
	children = "戻る" 
}: BackButtonProps) {
	const buttonContent = (
		<>
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
			{children}
		</>
	);

	if (href) {
		return (
			<Link
				href={href}
				className={`inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors ${className}`}
			>
				{buttonContent}
			</Link>
		);
	}

	return (
		<button
			onClick={onClick}
			className={`inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors ${className}`}
		>
			{buttonContent}
		</button>
	);
}
