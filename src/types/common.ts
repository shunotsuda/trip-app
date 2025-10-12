// 共通型定義

export interface BaseComponentProps {
	className?: string;
	children?: React.ReactNode;
}

export interface IconProps {
	className?: string;
	size?: number;
	filled?: boolean;
}

export interface ButtonProps extends BaseComponentProps {
	onClick?: () => void;
	disabled?: boolean;
	variant?: "primary" | "secondary" | "outline";
	size?: "sm" | "md" | "lg";
}

export interface NavigationItem {
	id: string;
	label?: string;
	href?: string;
	icon?: React.ReactNode;
}

export interface User {
	id: string;
	name: string;
	email: string;
	profileImage: string;
	username?: string;
}

export interface Post {
	id: string;
	userId: string;
	title: string;
	content: string;
	imageUrl?: string;
	location?: string;
	rating?: number;
	createdAt: string;
	updatedAt: string;
}

export interface Itinerary {
	id: string;
	userId: string;
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	locations: string[];
	imageUrl?: string;
	createdAt: string;
	updatedAt: string;
}

export interface ValidationResult {
	isValid: boolean;
	message?: string;
}

export interface LoadingState {
	isLoading: boolean;
	message?: string;
}

export interface ModalState {
	isOpen: boolean;
	content?: React.ReactNode;
	title?: string;
	size?: "sm" | "md" | "lg" | "xl";
}
