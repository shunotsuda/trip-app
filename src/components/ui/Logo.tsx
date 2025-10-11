import Link from "next/link";
import { AnimatedAirplane } from "./AnimatedAirplane";
import { JapanMap } from "./JapanMap";

interface LogoProps {
	size?: "sm" | "md" | "lg";
	href?: string;
	className?: string;
}

export default function Logo({
	size = "sm",
	href = "/",
	className = "",
}: LogoProps) {
	const sizeClasses = {
		sm: "w-16 h-16",
		md: "w-20 h-20 md:w-24 md:h-24",
		lg: "w-24 h-24 md:w-28 md:h-28",
	};

	const svgSize = {
		sm: 64,
		md: 80,
		lg: 96,
	};

	return (
		<Link
			href={href}
			className={`logo-link ${sizeClasses[size]} rounded-2xl flex items-center justify-center relative overflow-hidden hover:opacity-80 transition-opacity duration-150 ${className}`}
			style={{
				
			}}
		>
		<JapanMap
				className="absolute z-10"
				style={{
					top: "50%",
					left: "50%",
					transform: "translate(-60%, -50%)",
					width: "100%",
					height: "100%",
				}}
			/>

				<AnimatedAirplane
					orbitType="custom"
					radiusX={30}
					radiusY={15}
					color="purple"
					size="mobile"
					duration={6}
				/>
		</Link>
	);
}
