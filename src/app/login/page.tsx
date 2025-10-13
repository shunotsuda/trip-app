"use client";
import Link from "next/link";
import { AppHeader, LoginOptions, LegalLinks } from "@/components";
import { useTheme } from "@/contexts";

export default function LoginPage() {
	const { toggleMode } = useTheme();

	return (
		<div className="h-dvh  flex items-center justify-center px-4 overflow-hidden">
			<div className="w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col justify-between h-full py-4">
				<div className="flex flex-col justify-between flex-1 pt-[10dvh] md:py-[10dvh]  lg:py-6">
					<div className="">
						<AppHeader />
						<LoginOptions />

						{/* Email Link */}
						<div className="text-center mt-4 md:mt-3">
							<Link
								href="/login/email"
								className="text-[var(--text-secondary)] hover:text-[var(--text-emphasis)] underline text-sm md:text-base transition-colors duration-150"
							>
								メールアドレスで続ける
							</Link>
						</div>
						<button onClick={toggleMode}>テーマを変更</button>
					</div>

					<LegalLinks />
				</div>
			</div>
		</div>
	);
}
