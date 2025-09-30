/**
 * バリデーション関数の共通ライブラリ
 */

export const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
	return {
		length: password.length >= 8,
		alphanumeric: /[a-zA-Z]/.test(password) && /[0-9]/.test(password),
	};
};

export const getEmailError = (email: string): string => {
	if (!email) return "";
	return validateEmail(email) ? "" : "有効なメールアドレスを入力してください";
};

export const getPasswordError = (password: string): string => {
	if (!password) return "";
	const validation = validatePassword(password);
	if (!validation.length) return "8文字以上で入力してください";
	if (!validation.alphanumeric) return "英数字を含めて入力してください";
	return "";
};

export const getConfirmPasswordError = (password: string, confirmPassword: string): string => {
	if (!confirmPassword) return "";
	return password === confirmPassword ? "" : "パスワードが一致しません";
};
