# TRIP APP

旅行投稿アプリケーション（Instagram 風 UI）

## 🚀 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **UI Components**: カスタムコンポーネント
- **State Management**: React Hooks

## 📁 プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 認証関連ページ
│   │   ├── login/
│   │   └── signup/
│   ├── profile/           # プロフィールページ
│   └── globals.css        # グローバルスタイル
├── components/            # 再利用可能コンポーネント
│   ├── ui/               # 基本UIコンポーネント
│   ├── layout/           # レイアウトコンポーネント
│   ├── forms/            # フォームコンポーネント
│   ├── auth/             # 認証関連コンポーネント
│   ├── profile/          # プロフィール関連コンポーネント
│   └── posts/            # 投稿関連コンポーネント
├── lib/                   # ユーティリティ関数
├── types/                 # TypeScript型定義
└── constants/             # アプリケーション定数
```

## 🎨 デザインシステム

### カラーパレット

- **Primary**: Orange gradient (#fb923c → #f97316)
- **Background**: Peach gradient (#fefefe → #f5f0e8)
- **Text**: Gray scale (--text-muted, --text-dim, --text-subtle)

### コンポーネント命名規則

- **Atomic Design**: ui → layout → features
- **PascalCase**: コンポーネント名
- **kebab-case**: ファイル名（必要に応じて）

## 🔧 開発環境セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## 📝 コンポーネント開発ガイドライン

### 1. コンポーネント作成時のチェックリスト

- [ ] TypeScript 型定義を追加
- [ ] Props の JSDoc コメントを記述
- [ ] アクセシビリティ属性を確認
- [ ] レスポンシブデザインを実装
- [ ] Storybook ストーリーを作成（将来）

### 2. スタイリング方針

- Tailwind CSS クラスを優先使用
- カスタムスタイルは`globals.css`のユーティリティクラス
- `!important`は最小限に抑制
- CSS 変数を活用してテーマ対応

### 3. 状態管理

- ローカル状態: `useState`
- グローバル状態: Context API（必要に応じて）
- フォーム状態: 制御されたコンポーネント

## 🧪 テスト

```bash
# テスト実行（将来実装予定）
npm run test
```

## 📦 ビルドとデプロイ

```bash
# 本番ビルド
npm run build

# 本番サーバー起動
npm start
```

## 🤝 コントリビューション

1. 機能ブランチを作成
2. 変更をコミット
3. プルリクエストを作成
4. コードレビューを受ける

## 📄 ライセンス

MIT License
