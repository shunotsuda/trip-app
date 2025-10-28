interface SpinnerProps {
	size?: number;
	className?: string;
}

export function Spinner({ size = 60, className = "" }: SpinnerProps) {
	return (
		<div
			className={`relative inline-block ${className}`}
			style={{ width: `${size}px`, height: `${size}px` }}
		>
			<style>{`
				@keyframes rotate-360 {
					from { transform: rotate(0deg); }
					to { transform: rotate(360deg); }
				}
			`}</style>

			{/* リングのトラック（影） */}
			<div
				className="absolute rounded-full"
				style={{
					width: `${size}px`,
					height: `${size}px`,
					top: "50%",
					left: "50%",
					marginTop: `-${size / 2}px`,
					marginLeft: `-${size / 2}px`,
					boxShadow: "0 0 10px 4px rgba(0, 0, 0, 0.1) inset",
				}}
			></div>

			{/* 回転するリング（パープルグラデーション） */}
			<div
				className="absolute rounded-full"
				style={{
					width: `${size}px`,
					height: `${size}px`,
					top: "50%",
					left: "50%",
					marginTop: `-${size / 2}px`,
					marginLeft: `-${size / 2}px`,
					boxShadow:
						"0 4px 0 rgb(216, 180, 254) inset, 0 -4px 0 rgb(192, 132, 252) inset",
					animation: "rotate-360 2s linear infinite",
				}}
			></div>
		</div>
	);
}
