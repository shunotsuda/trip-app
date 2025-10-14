/**
 * フォーム送信用ボタンコンポーネント
 *
 * 汎用Buttonコンポーネントをベースとした、
 * フォーム送信に特化したボタンUI。
 * バリデーション状態やローディング状態を考慮。
 */

import { BaseComponentProps } from "@/types";
import Button from "@/components/ui/Button";

/**
 * SubmitButton のプロパティ定義
 */
interface SubmitButtonProps extends BaseComponentProps {
	/** フォームのバリデーション状態 */
	isValid: boolean;
	/** ローディング状態フラグ */
	isLoading: boolean;
	/** ローディング時に表示するテキスト */
	loadingText?: string;
	/** ボタンに表示するコンテンツ */
	children: React.ReactNode;
}

/**
 * SubmitButton コンポーネント
 *
 * フォーム送信専用のボタン。内部で汎用Buttonコンポーネントを使用し、
 * type="submit"とフル幅表示を自動設定。
 *
 * @param isValid - フォームのバリデーション結果
 * @param isLoading - 送信処理中フラグ
 * @param loadingText - ローディング時表示テキスト
 * @param children - ボタンの表示内容
 * @param className - 追加CSSクラス
 */
export default function SubmitButton({
	isValid,
	isLoading,
	loadingText = "送信中...",
	children,
	className,
}: SubmitButtonProps) {
	return (
		<Button
			type="submit"
			variant="primary"
			size="lg"
			fullWidth
			disabled={!isValid}
			isLoading={isLoading}
			loadingText={loadingText}
			className={className}
		>
			{children}
		</Button>
	);
}
