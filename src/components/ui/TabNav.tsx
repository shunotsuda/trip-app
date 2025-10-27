interface TabNavProps {
	activeTab: number;
	onChange: (tab: number) => void;
	slideProgress?: number;
}

export function TabNav({ activeTab, onChange, slideProgress }: TabNavProps) {
	const tabs = [
		{ id: 0, label: "投稿" },
		{ id: 1, label: "お気に入り" },
		{ id: 2, label: "レビュー" },
	];

	// スライドの進行度に基づいてアンダーラインの位置を計算
	const underlinePosition =
		slideProgress !== undefined ? slideProgress : activeTab;
	const translateX = underlinePosition * 100; // 0, 100, 200% (タブの位置 × 100%)
	const width = 100 / tabs.length; // 各タブの幅（33.33%）

	return (
		<div className="relative flex">
			{tabs.map((tab) => (
				<button
					key={tab.id}
					onClick={() => onChange(tab.id)}
					onMouseDown={(e) => e.preventDefault()}
					className={`flex-1 py-3 text-sm font-medium transition-colors ${
						activeTab === tab.id
							? "text-gray-900"
							: "text-gray-500 hover:text-gray-700"
					}`}
				>
					{tab.label}
				</button>
			))}
			{/* 動的なアンダーライン */}
			<div
				className="absolute bottom-0 h-0.5 bg-gray-900"
				style={{
					width: `${width}%`,
					transform: `translateX(${translateX}%)`,
				}}
			/>
		</div>
	);
}
