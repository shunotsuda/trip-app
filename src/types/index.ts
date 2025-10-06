// Common Types
export interface BaseComponentProps {
	className?: string;
	children?: React.ReactNode;
}

// Auth Types
export interface LoginFormData {
	email: string;
	password: string;
}

export interface SignupFormData extends LoginFormData {
	confirmPassword: string;
}

// Profile Types
export interface ProfileData {
	username: string;
	posts: number;
	followers: number;
	following: number;
	bio: string[];
	profileImage: string;
}

export interface Post {
	id: string;
	image: string;
	isFavorite: boolean;
}

export interface ItineraryData {
	id: string;
	title: string;
	startDate: string;
	endDate: string;
	images: string[];
	members: Array<{
		id: string;
		name: string;
		avatar: string;
	}>;
}

// Tab Types
export interface TabItem {
	id: string;
	label: string;
	icon: (isActive: boolean) => React.ReactNode;
}

// Form Types
export interface FormInputProps extends BaseComponentProps {
	type?: string;
	id: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	error?: string;
	required?: boolean;
}

export interface PasswordValidation {
	length: boolean;
	alphanumeric: boolean;
}
