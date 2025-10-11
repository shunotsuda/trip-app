/**
 * モーダル管理のためのカスタムフック
 * ModalContextのラッパーとして、より使いやすいAPIを提供
 */

import { useModal as useModalContext } from "@/contexts/ModalContext";
import type {
	ModalSize,
	ModalDirection,
	ModalBackdrop,
	ModalConfig,
} from "@/contexts/ModalContext";

// モーダルを開く際のオプション
export interface OpenModalOptions {
	id?: string;
	size?: ModalSize;
	direction?: ModalDirection;
	backdrop?: ModalBackdrop;
	closeOnBackdrop?: boolean;
	closeOnEscape?: boolean;
	onClose?: () => void;
}

// モーダルを開くためのヘルパー関数
export function useModal() {
	const { openModal, closeModal, closeAllModals, modals } = useModalContext();

	// 簡単にモーダルを開くヘルパー関数
	const openModalHelper = (
		component: React.ReactNode,
		options: OpenModalOptions = {}
	) => {
		const {
			size = "large",
			direction = "right",
			backdrop = "dark",
			closeOnBackdrop = true,
			closeOnEscape = true,
			onClose,
		} = options;

		return openModal({
			component,
			size,
			direction,
			backdrop,
			closeOnBackdrop,
			closeOnEscape,
			onClose,
		});
	};

	// よく使われるモーダルパターンのヘルパー関数
	const openSettingsModal = (
		component: React.ReactNode,
		onClose?: () => void
	) => {
		return openModalHelper(component, {
			size: "large",
			direction: "right",
			backdrop: "dark",
			onClose,
		});
	};

	const openEditModal = (component: React.ReactNode, onClose?: () => void) => {
		return openModalHelper(component, {
			size: "full",
			direction: "top",
			backdrop: "none",
			onClose,
		});
	};

	const openDialogModal = (
		component: React.ReactNode,
		onClose?: () => void
	) => {
		return openModalHelper(component, {
			size: "small",
			direction: "center",
			backdrop: "dark",
			closeOnBackdrop: false,
			onClose,
		});
	};

	const openBottomSheet = (
		component: React.ReactNode,
		onClose?: () => void
	) => {
		return openModalHelper(component, {
			size: "medium",
			direction: "bottom",
			backdrop: "dark",
			onClose,
		});
	};

	// 現在開いているモーダルの数
	const modalCount = modals.length;

	// 最上位のモーダルID
	const topModalId = modals.length > 0 ? modals[modals.length - 1].id : null;

	// 特定のモーダルが開いているかチェック
	const isModalOpen = (id: string) => {
		return modals.some((modal) => modal.id === id);
	};

	return {
		// 基本的なAPI
		openModal: openModalHelper,
		closeModal,
		closeAllModals,
		modals,

		// ヘルパー関数
		openSettingsModal,
		openEditModal,
		openDialogModal,
		openBottomSheet,

		// 状態
		modalCount,
		topModalId,
		isModalOpen,
	};
}

// 型エクスポート
export type { ModalSize, ModalDirection, ModalBackdrop, ModalConfig };
