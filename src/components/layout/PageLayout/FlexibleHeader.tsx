"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils/helpers";

interface FlexibleHeaderProps {
	// 各セクションのコンテンツ
	leftContent?: React.ReactNode;
	centerContent?: React.ReactNode;
	rightContent?: React.ReactNode;

	// 領域配分の指定（指定がない場合は従来通りのjustify-between）
	leftRatio?: number;
	centerRatio?: number;
	rightRatio?: number;

	// スタイリング（Tailwindクラスで指定）
	className?: string;
}

export default function FlexibleHeader({
	leftContent,
	centerContent,
	rightContent,
	leftRatio,
	centerRatio,
	rightRatio,
	className = "",
}: FlexibleHeaderProps) {
	// コンテンツの有無を判定
	const hasLeft = Boolean(leftContent);
	const hasCenter = Boolean(centerContent);
	const hasRight = Boolean(rightContent);

	// スペーサー用のref
	const leftRef = useRef<HTMLDivElement>(null);
	const rightRef = useRef<HTMLDivElement>(null);
	const [spacerWidth, setSpacerWidth] = useState<number>(0);

	// 比率指定があるかチェック
	const hasRatioSpecified =
		leftRatio !== undefined ||
		centerRatio !== undefined ||
		rightRatio !== undefined;

	// スペーサーが必要かどうか
	const needsSpacer =
		(!hasLeft && hasCenter && hasRight) || (hasLeft && hasCenter && !hasRight);

	// スペーサー幅の測定
	useEffect(() => {
		if (!needsSpacer) {
			setSpacerWidth(0);
			return;
		}

		const measureSpacer = () => {
			if (!hasLeft && hasCenter && hasRight && rightRef.current) {
				setSpacerWidth(rightRef.current.offsetWidth);
			} else if (hasLeft && hasCenter && !hasRight && leftRef.current) {
				setSpacerWidth(leftRef.current.offsetWidth);
			}
		};

		// 初回測定
		measureSpacer();

		// ウィンドウリサイズ監視
		window.addEventListener("resize", measureSpacer);

		// コンテンツサイズ変更監視（ResizeObserver）
		const targetRef = !hasLeft && hasCenter && hasRight ? rightRef : leftRef;
		const resizeObserver = new ResizeObserver(() => {
			measureSpacer();
		});

		if (targetRef.current) {
			resizeObserver.observe(targetRef.current);
		}

		return () => {
			window.removeEventListener("resize", measureSpacer);
			resizeObserver.disconnect();
		};
	}, [hasLeft, hasCenter, hasRight, leftContent, rightContent, needsSpacer]);

	// 3列固定で安全に組み立て
	const toTrack = (n: number) =>
		n > 0 ? `minmax(0, ${n}fr)` : "minmax(0, auto)";

	const computedColumns = (() => {
		if (hasRatioSpecified) {
			const l = toTrack(leftRatio ?? 0);
			const c = toTrack(centerRatio ?? 0);
			const r = toTrack(rightRatio ?? 0);

			// 片側欠け時はミラーしてセンターを真ん中に
			if (hasLeft && hasCenter && !hasRight) return `${l} ${c} ${l}`;
			if (!hasLeft && hasCenter && hasRight) return `${r} ${c} ${r}`;

			// 1つだけのときも3列維持
			if (hasCenter && !hasLeft && !hasRight) return `1fr ${c} 1fr`;
			if (hasLeft && !hasCenter && !hasRight) return `${l} 1fr 1fr`;
			if (!hasLeft && !hasCenter && hasRight) return `1fr 1fr ${r}`;

			// 通常（3つある or 左右のどちらかのみ欠けない）
			return `${l} ${c} ${r}`;
		}

		// 比率なし：存在しない側は 1fr のスペーサー
		if (hasLeft && hasCenter && hasRight) return "auto auto auto";
		if (hasLeft && hasCenter && !hasRight) return "auto 1fr auto"; // 左と同じ幅を右に
		if (!hasLeft && hasCenter && hasRight) return "auto 1fr auto"; // 右と同じ幅を左に
		if (hasCenter && !hasLeft && !hasRight) return "1fr auto 1fr";
		if (hasLeft && !hasCenter && !hasRight) return "auto 1fr 1fr";
		if (!hasLeft && !hasCenter && hasRight) return "1fr 1fr auto";
		return "1fr 1fr 1fr";
	})();

	return (
		<header className={cn("flex items-center", className)}>
			<div
				className="grid items-center w-full"
				style={{ gridTemplateColumns: computedColumns }}
			>
				{/* 左 */}
				<div
					className="min-w-0 justify-self-start"
					style={
						!hasLeft && hasCenter && hasRight && spacerWidth > 0
							? { width: `${spacerWidth}px` }
							: undefined
					}
				>
					<div ref={leftRef}>{hasLeft ? leftContent : null}</div>
				</div>

				{/* 中央 */}
				<div className="min-w-0 justify-self-center">
					{hasCenter ? centerContent : null}
				</div>

				{/* 右 */}
				<div
					className="min-w-0 justify-self-end"
					style={
						hasLeft && hasCenter && !hasRight && spacerWidth > 0
							? { width: `${spacerWidth}px` }
							: undefined
					}
				>
					<div ref={rightRef}>{hasRight ? rightContent : null}</div>
				</div>
			</div>
		</header>
	);
}
