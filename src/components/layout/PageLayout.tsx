import { ReactNode } from "react";
import { BackButton, Logo } from "@/components/common";

interface PageLayoutProps {
	title: string;
	backHref?: string;
	backOnClick?: () => void;
	children: ReactNode;
	showLogo?: boolean;
	logoSize?: "sm" | "md" | "lg";
	logoHref?: string;
}

export default function PageLayout({
	title,
	backHref,
	backOnClick,
	children,
	showLogo = true,
	logoSize = "md",
	logoHref = "/login",
}: PageLayoutProps) {
	return (
		<div className="min-h-screen bg-stone-50 px-4 py-4">
			<div className="w-full max-w-md md:max-w-lg lg:max-w-xl md:mx-auto pb-20 md:pb-0">
				{/* Desktop Header - Horizontal Layout */}
				{title && (
					<>
						{showLogo ? (
							<div className="hidden lg:flex items-center justify-between mb-6">
								<BackButton href={backHref} onClick={backOnClick} />
								<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
								<Logo size={logoSize} href={logoHref} />
							</div>
						) : (
							<div className="hidden lg:block mb-6">
								<div className="mb-4">
									<BackButton href={backHref} onClick={backOnClick} />
								</div>
								<h1 className="text-2xl font-bold text-gray-900 text-center">
									{title}
								</h1>
							</div>
						)}
					</>
				)}

				{/* Mobile Layout */}
				<div className="lg:hidden">
					<div className="mb-4 md:mb-3">
						<BackButton href={backHref} onClick={backOnClick} />
					</div>

					{showLogo && (
						<div className="text-center mb-4 md:mb-3">
							<Logo size={logoSize} href={logoHref} className="mx-auto" />
						</div>
					)}

					{title && (
						<h1 className="text-2xl font-bold text-gray-900 text-center mb-6 md:mb-8">
							{title}
						</h1>
					)}
				</div>

				{/* Content */}
				{children}
			</div>
		</div>
	);
}
