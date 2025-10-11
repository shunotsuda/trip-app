"use client";

import { JapanMap, AnimatedAirplane } from "@/components/ui";

export default function LoadingDemo() {
	return (
		<div className="h-dvh from-sky-100 to-sky-50 bg-gradient-to-b relative ">
			<JapanMap
				className="absolute z-10"
				style={{
					top: "50%",
					left: "50%",
					transform: "translate(-60%, -50%)",
					width: "30vw",
					height: "30vh",
				}}
			/>
			<div className="absolute inset-0 flex items-center justify-center">
				<AnimatedAirplane
					orbitType="custom"
					radiusX={80}
					radiusY={20}
					color="green"
					size="logo"
					duration={5}
					className="absolute"
				/>
				<AnimatedAirplane
					orbitType="circle"
					radius={50}
					color="blue"
					size="mobile"
					duration={5}
					className="absolute"
				/>

				<AnimatedAirplane
					orbitType="circle"
					radius={150}
					color="red"
					size="tablet"
					duration={6}
					className="absolute"
				/>

				<AnimatedAirplane
					orbitType="custom"
					radiusX={200}
					radiusY={90}
					color="purple"
					size="desktop"
					duration={8}
					className="absolute"
				/>
			</div>
		</div>
	);
}
