import Link from "next/link";

interface LegalLinksProps {
	className?: string;
}

export default function LegalLinks({ className = "" }: LegalLinksProps) {
	return (
		<div
			className={`text-center text-xs md:text-sm text-gray-500 pt-20 md:pt-8 ${className}`}
		>
			<p className="mb-1 md:mb-2">本サービスの利用開始により</p>
			<p>
				<Link
					href="/terms"
					className="text-cyan-400 hover:text-cyan-500 transition-colors underline"
				>
					利用規約
				</Link>
				と
				<Link
					href="/privacy"
					className="text-cyan-400 hover:text-cyan-500 transition-colors underline"
				>
					プライバシーポリシー
				</Link>
				に同意したことになります
			</p>
		</div>
	);
}
