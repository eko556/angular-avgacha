# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

### 基本的な開発
```bash
# 開発サーバー起動（変更時の自動リロード）
ng serve
# または
npm start

# 本番用ビルド
ng build

# ユニットテスト実行
ng test

# テストをウォッチモードで実行
ng test --watch

# ビルドして変更を監視
ng build --watch --configuration development
```

### コード生成
```bash
# 新しいコンポーネント生成
ng generate component component-name

# commonディレクトリにコンポーネント生成（既存パターンに従う）
ng generate component common/component-name
```

## プロジェクト構成

### アプリケーション構造
- **Angular 19 スタンドアロンコンポーネント**: NgModuleを使わず、モダンなスタンドアロンコンポーネント構成
- **シングルページアプリケーション**: 現在ルーティング未設定（`app.routes.ts`で空の配列）
- **コンポーネントレイアウト**: Header → Showcase → Gacha → Footer の縦並び構成
- **プロジェクト名**: `avgacha-ang`（angular.jsonで定義）

### 主要コンポーネント
- **GachaComponent**: スピン演出とモックデータを持つコアガチャシステム
- **ShowcaseComponent**: keen-sliderライブラリを使用したコンテンツ表示カルーセル
- **HeaderComponent**: AVガチャブランディング付きナビゲーション
- **FooterComponent**: サイトフッター

### 技術スタック
- **Angular 19** with TypeScript（strictモード有効）
- **Bootstrap 5.3.3** UIフレームワーク（グローバル読み込み）
- **keen-slider 6.8.6** 高機能カルーセルライブラリ
- **SCSS** コンポーネントスタイリング
- **Karma + Jasmine** テストフレームワーク

### 現在の実装状況
- **モックデータ**: すべてのコンポーネントでモック/サンプルデータを使用
- **API連携**: gachaコンポーネントでTODOマーク（`// TODO: APIからランダムな作品を取得する処理を実装`）
- **OpenAPI仕様**: `openapi: '3.0.yml`に定義済みだが未実装
- **Docker対応済み**: 本番デプロイ用にLiteSpeedサーバーで設定済み

### スタイリング方針
- レスポンシブレイアウト用のBootstrapクラス
- コンポーネントスコープのSCSSファイル
- gachaコンポーネントでダークテーマ＋ピンクアクセント（#ff1493）
- keen-sliderでレスポンシブブレークポイント設定

### バンドル設定
- 初期バンドルサイズ制限: 500kB警告、1MBエラー
- コンポーネントスタイル制限: 4kB警告、8kBエラー
- 本番ビルドでアウトプットハッシュ使用

### 開発時の注意点
- すべてのコンポーネントはスタンドアロンパターンで統一されたファイル構造（html, scss, ts, spec.ts）
- TypeScript strictモード有効＋experimental decorators使用
- アセットは`public/`ディレクトリから配信
- 本番デプロイ時はLiteSpeed経由でSPAルーティング設定済み