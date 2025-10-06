import Link from "next/link";

interface LogoProps {
	size?: "sm" | "md" | "lg";
	href?: string;
	className?: string;
}

export default function Logo({
	size = "md",
	href = "/login",
	className = "",
}: LogoProps) {
	const sizeClasses = {
		sm: "w-16 h-16 text-sm",
		md: "w-20 h-20 md:w-24 md:h-24 text-lg md:text-xl",
		lg: "w-24 h-24 md:w-28 md:h-28 text-xl md:text-2xl",
	};

	return (
		<Link
			href={href}
			className={`logo-link ${sizeClasses[size]} rounded-2xl flex items-center justify-center relative overflow-hidden hover:opacity-80 transition-opacity duration-150 ${className}`}
			style={{
				background: "#faf7f0",
			}}
		>
			{/* 波模様の装飾 */}
			<div className="absolute inset-0 rounded-2xl overflow-hidden">
				<div
					className={`absolute rounded-full ${
						size === "sm" ? "top-1 left-1 w-6 h-6" : "top-2 left-2 w-8 h-8"
					}`}
					style={{
						background: "linear-gradient(45deg, #e0f2fe, #bae6fd)",
					}}
				></div>
				<div
					className={`absolute rounded-full ${
						size === "sm" ? "top-2 right-2 w-4 h-4" : "top-4 right-3 w-6 h-6"
					}`}
					style={{
						background: "linear-gradient(45deg, #fce7f3, #fbcfe8)",
					}}
				></div>
				<div
					className={`absolute rounded-full ${
						size === "sm"
							? "bottom-2 left-2 w-5 h-5"
							: "bottom-3 left-4 w-7 h-7"
					}`}
					style={{
						background: "linear-gradient(45deg, #fef3c7, #fde68a)",
					}}
				></div>
				<div
					className={`absolute rounded-full ${
						size === "sm"
							? "bottom-1 right-1 w-3 h-3"
							: "bottom-2 right-2 w-5 h-5"
					}`}
					style={{
						background: "linear-gradient(45deg, #e0e7ff, #c7d2fe)",
					}}
				></div>
			</div>
			<span className="font-bold text-gray-800 relative z-10">SHUN</span>
		</Link>
	);
}
