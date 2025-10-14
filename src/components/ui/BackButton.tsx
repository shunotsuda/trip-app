import Link from "next/link";
import { BaseComponentProps } from "@/types";
import { cn } from "@/lib/utils/helpers";

interface BackButtonProps extends BaseComponentProps {
	href?: string;
	onClick?: () => void;
	children?: React.ReactNode;
}

export default function BackButton({
	href,
	onClick,
	className,
	children = "戻る",
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

	const buttonClasses = cn(
		"inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors",
		className
	);

	if (href) {
		return (
			<Link href={href} className={buttonClasses}>
				{buttonContent}
			</Link>
		);
	}

	return (
		<button onClick={onClick} className={buttonClasses}>
			{buttonContent}
		</button>
	);
}
