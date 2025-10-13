import Link from "next/link";

interface LegalLinksProps {
	className?: string;
}

export default function LegalLinks({ className = "" }: LegalLinksProps) {
	return (
		<div
			className={`text-center text-xs md:text-sm text-[var(--text-muted)] pt-20 md:pt-8 ${className}`}
		>
			<p className="mb-1 md:mb-2">本サービスの利用開始により</p>
			<p>
				<Link
					href="/terms"
					className="text-[var(--link-cyan)] hover:text-[var(--link-cyan-hover)]  transition-colors underline"
				>
					利用規約
				</Link>
				と
				<Link
					href="/privacy"
					className="text-[var(--link-cyan)] hover:text-[var(--link-cyan-hover)]  transition-colors underline"
				>
					プライバシーポリシー
				</Link>
				に同意したことになります
			</p>
		</div>
	);
}
