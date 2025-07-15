# 甲子園天気予報野球試合中止予測アプリケーション

## プロジェクト概要
甲子園球場での阪神タイガース戦の中止確率を天気データと機械学習で予測するWebアプリケーション。

## 現在の状態 (2025-07-08)
**✅ コンテナ化マイクロサービス構成に移行完了**

### アーキテクチャ
- **Next.js App** (port 3000): UI + 中間API層
- **Python ML Service** (port 8000): FastAPI + scikit-learn予測モデル
- **Docker Compose**: サービス統合管理

### 実行環境
1. **従来環境**: `npm run dev` (Express + Vite, port 5000)
2. **新コンテナ環境**: `./start-containers.sh` または `docker-compose up`

## プロジェクト構成変更

### クリーンアップ後の構成
```
プロジェクトルート/
├── next-app/          # Next.js UI + API Routes
│   ├── app/           # App Router (UI + API)
│   ├── components/    # React Components
│   └── types/         # TypeScript Types
├── ml-service/        # Python FastAPI + ML
│   ├── main.py        # FastAPI Application
│   └── Dockerfile     # Container Config
├── docker-compose.yml # Multi-service orchestration
└── start-containers.sh # Startup script
```

## 最近の変更 (2025-07-15)
- ✅ Next.js 15 + TypeScript フロントエンド完全移植
- ✅ Next.js API Routes による中間API層実装
- ✅ FastAPI + scikit-learn による独立ML予測サービス
- ✅ Docker + Docker Compose設定完了
- ✅ 全コンポーネント移植完了 (天気・予測・履歴・管理パネル)
- ✅ Tailwind CSS + Material Icons デザイン
- ✅ レスポンシブ対応とローディング状態
- ✅ Rancher Desktop対応とDocker設定最適化
- ✅ ヘルスチェック機能とエラーハンドリング強化
- ✅ 起動スクリプトとREADME作成

## 機能実装状況
- ✅ 4項目天気データ表示（気温・降水量・湿度・風速）
- ✅ AI機械学習予測（Random Forest モデル）
- ✅ 試合ステータス管理（予定・中止・進行中・終了）
- ✅ 過去履歴データ表示
- ✅ 管理者手動更新パネル
- 🚧 外部API自動監視（フレームワーク準備済み）

## ユーザー設定
- 日本語でのコミュニケーション
- 技術的な詳細は簡潔に説明
- マイクロサービス＋コンテナ構成採用
- Docker Compose による統合管理