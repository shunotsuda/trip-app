import Link from "next/link";
import { AppHeader, LoginOptions, LegalLinks } from "@/components";

export default function LoginPage() {
	return (
		<div className="h-h-screen-fix bg-peach flex items-center justify-center px-4 overflow-hidden">
			<div className="w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col justify-between h-full py-4">
				<div className="flex flex-col justify-between flex-1">
					<div className="pt-20 md:pt-0 xl:pt-6">
						<AppHeader />
						<LoginOptions />

						{/* Email Link */}
						<div className="text-center mt-4 md:mt-3">
							<Link
								href="/login/email"
								className="text-gray-700 hover:text-gray-900 underline text-sm md:text-base transition-colors duration-150"
							>
								メールアドレスで続ける
							</Link>
						</div>
					</div>

					<LegalLinks />
				</div>
			</div>
		</div>
	);
}
