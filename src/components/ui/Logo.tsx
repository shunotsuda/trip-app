import { AnimatedAirplane } from "./AnimatedAirplane";
import { JapanMap } from "./JapanMap";

interface LogoProps {
	size?: "sm" | "md" | "lg";
	className?: string;
}

export default function Logo({ size = "sm", className = "" }: LogoProps) {
	const sizeClasses = {
		sm: "w-16 h-16",
		md: "w-20 h-20 md:w-24 md:h-24",
		lg: "w-24 h-24 md:w-28 md:h-28",
	};

	return (
		<div
			className={` ${sizeClasses[size]}  flex items-center justify-center relative overflow-hidden  ${className}`}
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
		</div>
	);
}
