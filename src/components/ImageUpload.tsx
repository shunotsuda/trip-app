"use client";

import { useState } from "react";

interface ImageUploadProps {
	onImageSelect: (imageUrl: string) => void;
}

export default function ImageUpload({ onImageSelect }: ImageUploadProps) {
	const [isConverting, setIsConverting] = useState(false);

	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setIsConverting(true);

		try {
			// HEICファイルかどうかチェック
			if (
				file.type === "image/heic" ||
				file.name.toLowerCase().endsWith(".heic")
			) {
				// HEIC → JPG変換（高品質設定）
				const { default: heic2any } = await import("heic2any");
				const jpgBlob = (await heic2any({
					blob: file,
					toType: "image/jpeg",
					quality: 0.95, // 品質を向上
				})) as Blob;

				// BlobをURLに変換
				const imageUrl = URL.createObjectURL(jpgBlob);
				onImageSelect(imageUrl);
			} else {
				// 通常の画像ファイル
				const imageUrl = URL.createObjectURL(file);
				onImageSelect(imageUrl);
			}
		} catch (error) {
			console.error("画像の変換に失敗しました:", error);
			// エラー時は元のファイルを使用
			const imageUrl = URL.createObjectURL(file);
			onImageSelect(imageUrl);
		} finally {
			setIsConverting(false);
		}
	};

	return (
		<div className="flex items-center justify-center">
			<label className="cursor-pointer">
				<input
					type="file"
					accept="image/*,.heic"
					onChange={handleFileSelect}
					className="hidden"
				/>
				<div className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
					{isConverting ? "変換中..." : "写真を選択"}
				</div>
			</label>
		</div>
	);
}
