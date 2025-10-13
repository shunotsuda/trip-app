# 色の変数マッピング（整理版）

## 🌓 ダークモード対応が必要な色（ページ全体の色）

### ページ構造の背景色

```
bg-white         → --bg-page              ✅ ダークで反転必要
bg-stone-100     → --bg-content           ✅ ダークで反転必要
bg-stone-50      → --bg-content-light     ✅ ダークで反転必要
bg-peach         → --bg-accent            ✅ ダークで反転必要
```

### テキスト色（構造）

```
text-black       → --text-primary         ✅ ダークで反転必要（黒→白）
text-gray-900    → --text-emphasis        ✅ ダークで反転必要
text-gray-800    → --text-strong          ✅ ダークで反転必要
text-gray-700    → --text-secondary       ✅ ダークで反転必要
text-gray-600    → --text-tertiary        ✅ ダークで反転必要
text-gray-500    → --text-muted           ⚠️ 両モードで同じでもOK
text-gray-400    → --text-disabled        ✅ ダークで反転必要
text-white       → --text-white           ✅ ダークで反転必要（白→黒）
```

### ボーダー色（構造）

```
border-gray-200  → --border               ✅ ダークで反転必要
border-gray-300  → --border-input         ✅ ダークで反転必要
border-gray-100  → --border-subtle        ✅ ダークで反転必要
border-black     → --border-emphasis      ✅ ダークで反転必要
```

### インタラクション（ホバーなど）

```
bg-gray-100      → --bg-hover             ✅ ダークで反転必要
bg-gray-50       → --bg-hover-subtle      ✅ ダークで反転必要
```

---

## 🎨 ダークモード対応が不要な色（装飾・アクセント）

### ブランドカラー・アクセント（常に同じ色）

```
bg-blue-600      → そのまま bg-blue-600   ❌ 変えない（ボタン色）
bg-blue-700      → そのまま bg-blue-700   ❌ 変えない（ボタンホバー）
text-blue-500    → そのまま text-blue-500 ❌ 変えない（リンク色）
text-blue-600    → そのまま text-blue-600 ❌ 変えない
border-blue-500  → そのまま border-blue-500 ❌ 変えない（選択状態）
border-blue-400  → そのまま border-blue-400 ❌ 変えない
```

### エラー・警告（常に同じ色）

```
bg-red-50        → そのまま bg-red-50      ❌ 変えない
bg-red-100       → そのまま bg-red-100     ❌ 変えない
text-red-500     → そのまま text-red-500   ❌ 変えない
text-red-600     → そのまま text-red-600   ❌ 変えない
border-red-300   → そのまま border-red-300 ❌ 変えない
```

### 成功・情報（常に同じ色）

```
bg-green-50      → そのまま bg-green-50    ❌ 変えない
bg-green-100     → そのまま bg-green-100   ❌ 変えない
text-green-500   → そのまま text-green-500 ❌ 変えない
text-green-600   → そのまま text-green-600 ❌ 変えない
```

### その他の装飾色（常に同じ色）

```
bg-purple-50     → そのまま bg-purple-50   ❌ 変えない
bg-purple-100    → そのまま bg-purple-100  ❌ 変えない
bg-pink-50       → そのまま bg-pink-50     ❌ 変えない
bg-yellow-50     → そのまま bg-yellow-50   ❌ 変えない
bg-blue-50       → そのまま bg-blue-50     ❌ 変えない
text-purple-500  → そのまま text-purple-500 ❌ 変えない
text-purple-600  → そのまま text-purple-600 ❌ 変えない
text-pink-500    → そのまま text-pink-500  ❌ 変えない
text-yellow-500  → そのまま text-yellow-500 ❌ 変えない
text-cyan-400    → そのまま text-cyan-400  ❌ 変えない
text-cyan-500    → そのまま text-cyan-500  ❌ 変えない
```

### 特殊（ダーク・グレー系）

```
bg-gray-800      → そのまま bg-gray-800    ❌ 変えない（すでに暗い）
bg-gray-200      → そのまま bg-gray-200    ⚠️ 場合による
bg-gray-300      → そのまま bg-gray-300    ⚠️ 場合による
text-gray-200    → そのまま text-gray-200  ❌ 変えない（装飾）
```

---

## 📝 まとめ

✅ **変数化してダークモード対応する色（13 個）:**

- ページ背景: `bg-white`, `bg-stone-100`, `bg-stone-50`, `bg-peach`
- テキスト: `text-black`, `text-gray-900~400`, `text-white`
- ボーダー: `border-gray-200`, `border-gray-300`, `border-gray-100`, `border-black`
- ホバー: `bg-gray-100`, `bg-gray-50`

❌ **そのまま使う色（残りすべて）:**

- ブランドカラー（青、赤、緑など）
- 装飾色（紫、ピンク、黄色など）
- 常に同じ意味を持つ色（エラーは赤、成功は緑）

わかりやすくなりましたか？

---

## 例

### Before（現在）

```tsx
<div className="bg-white border-gray-200 text-black">
	<p className="text-gray-500">説明</p>
</div>
```

### After（変数化後）

```tsx
<div className="bg-[var(--page-bg)] border-[var(--border)] text-[var(--text-primary)]">
	<p className="text-[var(--text-muted)]">説明</p>
</div>
```

### CSS（globals.css）

```css
:root {
	--page-bg: #ffffff;
	--text-primary: #000000;
	--text-muted: #6b7280;
}

[data-theme="dark"] {
	--page-bg: #1a1a1a;
	--text-primary: #ffffff;
	--text-muted: #6b7280;
}
```

---
