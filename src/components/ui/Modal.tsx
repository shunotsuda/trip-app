"use client";

import React, { useEffect, useRef } from "react";
import { useModal } from "@/contexts/ModalContext";
import type {
	ModalConfig,
	ModalSize,
	ModalDirection,
	ModalBackdrop,
} from "@/contexts/ModalContext";

// モーダルコンポーネントのプロップス
interface ModalProps {
	config: ModalConfig;
	index: number;
}

// サイズクラスのマッピング
const sizeClasses: Record<ModalSize, string> = {
	full: "w-full h-full",
	large: "w-[90%] h-full max-w-4xl",
	medium: "w-[80%] h-full max-w-3xl",
	small: "w-[300px] h-auto max-h-[400px]",
};

// 方向別のアニメーションクラス
const directionClasses: Record<ModalDirection, string> = {
	right: "transform transition-transform duration-300 ease-in-out",
	top: "transform transition-transform duration-300 ease-in-out",
	bottom: "transform transition-transform duration-300 ease-in-out",
	center: "transform transition-all duration-300 ease-in-out",
};

// バックドロップクラスのマッピング
const backdropClasses: Record<ModalBackdrop, string> = {
	dark: "bg-black bg-opacity-50",
	light: "bg-white bg-opacity-50",
	none: "",
	blur: "backdrop-blur-sm bg-black bg-opacity-30",
};

// メインのモーダルコンポーネント
export default function Modal({ config, index }: ModalProps) {
	const { closeModal } = useModal();
	const modalRef = useRef<HTMLDivElement>(null);
	const isOpen = true; // このコンポーネントが表示されている時点で開いている

	// バックドロップクリック時の処理
	const handleBackdropClick = (event: React.MouseEvent) => {
		if (event.target === event.currentTarget && config.closeOnBackdrop) {
			closeModal(config.id);
			if (config.onClose) {
				config.onClose();
			}
		}
	};

	// モーダルが開いた時にフォーカスを設定し、アニメーションを開始
	useEffect(() => {
		if (modalRef.current) {
			modalRef.current.focus();

			// アニメーションを開始するために次のフレームでクラスを更新
			requestAnimationFrame(() => {
				if (modalRef.current) {
					// 初期状態のクラスを削除し、最終状態のクラスを追加
					const initialClasses = getTransformClasses(config.direction);
					const finalClasses = getFinalTransformClasses(config.direction);

					modalRef.current.classList.remove(...initialClasses.split(" "));
					modalRef.current.classList.add(...finalClasses.split(" "));
				}
			});
		}
	}, [config.direction]);

	// アニメーション用のクラス
	const animationClass = directionClasses[config.direction];
	const sizeClass = sizeClasses[config.size];
	const backdropClass = backdropClasses[config.backdrop];
	const zIndex = 50 + index * 10;

	// 方向別の初期位置と最終位置のクラス
	const getTransformClasses = (direction: ModalDirection) => {
		switch (direction) {
			case "right":
				return "translate-x-full"; // 初期状態：右側に隠れている
			case "top":
				return "-translate-y-full"; // 初期状態：上側に隠れている
			case "bottom":
				return "translate-y-full"; // 初期状態：下側に隠れている
			case "center":
				return "scale-95 opacity-0"; // 初期状態：小さくて透明
			default:
				return "";
		}
	};

	const getFinalTransformClasses = (direction: ModalDirection) => {
		switch (direction) {
			case "right":
				return "translate-x-0"; // 最終状態：通常位置
			case "top":
				return "translate-y-0"; // 最終状態：通常位置
			case "bottom":
				return "translate-y-0"; // 最終状態：通常位置
			case "center":
				return "scale-100 opacity-100"; // 最終状態：通常サイズで不透明
			default:
				return "";
		}
	};

	// 中央配置の場合の特別な処理
	const isCenter = config.direction === "center";
	const containerClass = isCenter
		? "flex items-center justify-center p-4"
		: config.direction === "right"
		? "flex justify-end"
		: config.direction === "top"
		? "flex justify-center items-start"
		: "flex justify-center items-end";

	return (
		<div
			className={`
				fixed inset-0 z-${zIndex}
				transition-all duration-300 ease-in-out
				${backdropClass}
			`}
			onClick={handleBackdropClick}
		>
			<div className={`h-full ${containerClass}`}>
				<div
					ref={modalRef}
					className={`
						bg-white shadow-2xl
						${sizeClass}
						${animationClass}
						${getTransformClasses(config.direction)}
						${isCenter ? "rounded-lg" : ""}
						${config.direction === "right" ? "h-full" : ""}
					`}
					tabIndex={-1}
					role="dialog"
					aria-modal="true"
				>
					{config.component}
				</div>
			</div>
		</div>
	);
}

// モーダルコンテナコンポーネント（全てのモーダルをレンダリング）
export function ModalContainer() {
	const { modals } = useModal();

	return (
		<>
			{modals.map((config, index) => (
				<Modal key={config.id} config={config} index={index} />
			))}
		</>
	);
}

// ヘルパーコンポーネント：モーダルヘッダー
interface ModalHeaderProps {
	title: string;
	onClose?: () => void;
	showCloseButton?: boolean;
	className?: string;
}

export function ModalHeader({
	title,
	onClose,
	showCloseButton = true,
	className = "",
}: ModalHeaderProps) {
	return (
		<div
			className={`flex items-center justify-between p-4 border-b ${className}`}
		>
			<h2 className="text-lg font-semibold text-gray-900">{title}</h2>
			{showCloseButton && onClose && (
				<button
					onClick={onClose}
					className="p-1 hover:bg-gray-100 rounded-full transition-colors"
					aria-label="閉じる"
				>
					<svg
						className="w-6 h-6 text-gray-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			)}
		</div>
	);
}

// ヘルパーコンポーネント：モーダルコンテンツ
interface ModalContentProps {
	children: React.ReactNode;
	className?: string;
}

export function ModalContent({ children, className = "" }: ModalContentProps) {
	return (
		<div className={`p-4 overflow-y-auto flex-1 ${className}`}>{children}</div>
	);
}

// ヘルパーコンポーネント：モーダルフッター
interface ModalFooterProps {
	children: React.ReactNode;
	className?: string;
}

export function ModalFooter({ children, className = "" }: ModalFooterProps) {
	return (
		<div className={`p-4 border-t bg-gray-50 ${className}`}>{children}</div>
	);
}
