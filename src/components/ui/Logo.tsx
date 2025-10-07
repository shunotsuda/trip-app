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
				background: "#ffffff",
			}}
		>
			<svg
				width={svgSize[size]}
				height={svgSize[size]}
				viewBox="0 0 100 100"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="absolute inset-0"
			>
				{/* 円形の軌道 */}
				<circle
					cx="50"
					cy="50"
					r="45"
					stroke="#374151"
					strokeWidth="1.5"
					fill="none"
					strokeDasharray="2,2"
					opacity="0.3"
				/>

				{/* 日本地図の輪郭 */}
				<g transform="translate(50, 50) scale(0.8)">
					{/* 本州 */}
					<path
						d="M-15,-8 L-12,-12 L-8,-10 L-5,-8 L-2,-6 L2,-5 L5,-3 L8,-2 L10,0 L8,3 L5,5 L2,6 L-2,5 L-5,3 L-8,2 L-10,0 L-12,-2 L-15,-5 Z"
						fill="#dc2626"
						stroke="#374151"
						strokeWidth="0.5"
					/>

					{/* 北海道 */}
					<path
						d="M-8,-15 L-5,-18 L-2,-16 L1,-15 L3,-13 L1,-11 L-2,-12 L-5,-13 Z"
						fill="#9ca3af"
						stroke="#374151"
						strokeWidth="0.5"
					/>

					{/* 九州 */}
					<path
						d="M-12,8 L-10,12 L-8,10 L-6,8 L-8,6 L-10,7 Z"
						fill="#9ca3af"
						stroke="#374151"
						strokeWidth="0.5"
					/>

					{/* 四国 */}
					<path
						d="M-8,2 L-6,5 L-4,3 L-6,1 Z"
						fill="#9ca3af"
						stroke="#374151"
						strokeWidth="0.5"
					/>
				</g>

				{/* 飛行機 */}
				<g transform="translate(75, 25)">
					<path
						d="M-8,0 L8,0 M-6,-2 L6,-2 M-4,-4 L4,-4 M-2,-6 L2,-6 M0,-8 L0,8"
						stroke="#374151"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
					<circle cx="0" cy="0" r="2" fill="#374151" />
				</g>

				{/* 飛行機の軌道線 */}
				<path
					d="M75,25 Q85,35 90,50 Q85,65 75,75 Q65,85 50,90 Q35,85 25,75 Q15,65 10,50 Q15,35 25,25 Q35,15 50,10 Q65,15 75,25"
					stroke="#374151"
					strokeWidth="1"
					fill="none"
					strokeLinecap="round"
				/>
			</svg>
		</Link>
	);
}
