import { ReactNode } from "react";
import { BackButton, Logo } from "@/components/ui";

interface FormPageLayoutProps {
	title: string;
	backHref?: string;
	backOnClick?: () => void;
	children: ReactNode;
	showLogo?: boolean;
	logoSize?: "sm" | "md" | "lg";
}

export default function FormPageLayout({
	title,
	backHref,
	backOnClick,
	children,
	showLogo = true,
	logoSize = "md",
}: FormPageLayoutProps) {
	return (
		<div className="min-h-dvh px-4 py-4">
			<div className="w-full max-w-md md:max-w-lg lg:max-w-xl md:mx-auto pb-20 md:pb-0">
				{/* Desktop Header - Horizontal Layout */}
				{title && (
					<>
						{showLogo ? (
							<div className="hidden lg:flex items-center justify-between mb-6">
								<BackButton href={backHref} onClick={backOnClick} />
								<h1 className="text-2xl font-bold text-[var(--text-emphasis)]">
									{title}
								</h1>
								<Logo size={logoSize} />
							</div>
						) : (
							<div className="hidden lg:block mb-6">
								<div className="mb-4">
									<BackButton href={backHref} onClick={backOnClick} />
								</div>
								<h1 className="text-2xl font-bold text-[var(--text-emphasis)] text-center">
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
							<Logo size={logoSize} className="mx-auto" />
						</div>
					)}

					{title && (
						<h1 className="text-2xl font-bold text-[var(--text-emphasis)] text-center mb-6 md:mb-8">
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
