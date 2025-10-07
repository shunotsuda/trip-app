import { Logo } from "@/components/ui";

interface AppHeaderProps {
	className?: string;
}

export default function AppHeader({ className = "" }: AppHeaderProps) {
	return (
		<div className={`text-center mb-4 md:mb-3 ${className}`}>
			<Logo size="md" className="mx-auto mb-3 md:mb-2" />
			<h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-2">
				TRIP APP
			</h1>
			<p className="text-base md:text-base text-gray-600">旅行をより楽しく</p>
		</div>
	);
}
