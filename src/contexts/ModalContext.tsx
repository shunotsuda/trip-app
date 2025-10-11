"use client";

import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";

// モーダルのサイズ定義
export type ModalSize = "full" | "large" | "medium" | "small";

// モーダルのスライド方向
export type ModalDirection = "right" | "top" | "center" | "bottom";

// バックドロップの種類
export type ModalBackdrop = "dark" | "light" | "none" | "blur";

// 個別モーダルの設定
export interface ModalConfig {
	id: string;
	component: React.ReactNode;
	size: ModalSize;
	direction: ModalDirection;
	backdrop: ModalBackdrop;
	closeOnBackdrop: boolean;
	closeOnEscape: boolean;
	onClose?: () => void;
}

// モーダルスタックの状態
interface ModalState {
	modals: ModalConfig[];
}

// モーダルコンテキストの型
interface ModalContextType {
	openModal: (config: Omit<ModalConfig, "id">) => string;
	closeModal: (id: string) => void;
	closeAllModals: () => void;
	modals: ModalConfig[];
}

// コンテキストの作成
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// モーダルプロバイダー
export function ModalProvider({ children }: { children: React.ReactNode }) {
	const [state, setState] = useState<ModalState>({
		modals: [],
	});

	// モーダルを開く
	const openModal = useCallback((config: Omit<ModalConfig, "id">) => {
		const id = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
		const modalConfig: ModalConfig = {
			id,
			...config,
		};

		setState((prev) => ({
			modals: [...prev.modals, modalConfig],
		}));

		// bodyのスクロールを無効化
		document.body.style.overflow = "hidden";

		return id;
	}, []);

	// モーダルを閉じる
	const closeModal = useCallback((id: string) => {
		setState((prev) => {
			const newModals = prev.modals.filter((modal) => modal.id !== id);

			// 全てのモーダルが閉じられたらbodyのスクロールを有効化
			if (newModals.length === 0) {
				document.body.style.overflow = "unset";
			}

			return { modals: newModals };
		});
	}, []);

	// 全てのモーダルを閉じる
	const closeAllModals = useCallback(() => {
		setState({ modals: [] });
		document.body.style.overflow = "unset";
	}, []);

	// ESCキーでモーダルを閉じる
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape" && state.modals.length > 0) {
				const topModal = state.modals[state.modals.length - 1];
				if (topModal.closeOnEscape) {
					closeModal(topModal.id);
				}
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [state.modals, closeModal]);

	// ブラウザバック対応
	useEffect(() => {
		const handlePopState = () => {
			if (state.modals.length > 0) {
				const topModal = state.modals[state.modals.length - 1];
				closeModal(topModal.id);
			}
		};

		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, [state.modals, closeModal]);

	const value: ModalContextType = {
		openModal,
		closeModal,
		closeAllModals,
		modals: state.modals,
	};

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
}

// カスタムフック
export function useModal() {
	const context = useContext(ModalContext);
	if (context === undefined) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
}

// モーダルスタックの高さを取得するヘルパー関数
export function getModalZIndex(index: number): number {
	return 50 + index * 10; // z-50, z-60, z-70, z-80, z-90
}
