# 甲子園天気予報 - 野球試合中止予測システム

阪神タイガース戦の中止確率をAIで予測するコンテナ化アプリケーション

## アーキテクチャ

### マイクロサービス構成
- **Next.js App** (port 3000): UI + 中間API
- **Python ML Service** (port 8000): 機械学習予測モデル
- **PostgreSQL** (port 5432): データ永続化 (オプション)

### 技術スタック
- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend API**: Next.js API Routes
- **ML Service**: FastAPI, scikit-learn, pandas, numpy
- **Container**: Docker, Docker Compose
- **Database**: PostgreSQL (production), In-memory (development)

## 開発環境での実行

### 1. 従来のReplit開発環境
```bash
npm run dev  # Express + Vite サーバー (port 5000)
```

### 2. 新しいコンテナ環境

#### 個別サービス起動
```bash
# ML Service
cd ml-service
python main.py  # port 8000

# Next.js App
cd next-app
npm run dev     # port 3000
```

#### Docker Compose (推奨)
```bash
docker-compose up --build
```

## API エンドポイント

### Next.js API Routes
- `GET /api/weather/current` - 現在の天気
- `GET /api/weather/forecast` - 時間別予報
- `GET /api/game/today` - 今日の試合情報
- `POST /api/game/today` - 試合ステータス更新
- `GET /api/prediction` - AI予測結果
- `GET /api/history` - 過去の試合履歴

### Python ML Service
- `GET /health` - ヘルスチェック
- `POST /predict` - 機械学習予測

## 主な機能

### ✓ 実装済み
- リアルタイム天気データ表示
- 4時間先までの天気予報（気温・降水量・湿度・風速）
- AI機械学習による中止確率予測
- 過去の試合履歴と実績
- 試合ステータス管理（予定・中止・進行中・終了）
- 管理者パネル（手動ステータス更新）
- レスポンシブデザイン

### 🚧 開発中
- 外部API自動監視
- PostgreSQL連携
- リアルタイム通知
- より高度なML予測モデル

## デプロイメント

### Dockerコンテナ構成
```yaml
# docker-compose.yml
services:
  nextjs-app:    # Next.js UI + API
  ml-service:    # Python FastAPI ML
  # postgres:    # データベース (今後)
```

### 環境変数
```bash
NODE_ENV=production
ML_SERVICE_URL=http://ml-service:8000
# DATABASE_URL=postgresql://... (今後)
```

## 開発ガイド

### コンポーネント構造
```
next-app/
├── app/                 # Next.js App Router
│   ├── api/            # API Routes
│   ├── layout.tsx      # Root Layout
│   └── page.tsx        # Home Page
├── components/         # React Components
├── types/             # TypeScript Types
└── lib/               # Utilities
```

### ML Service
```
ml-service/
├── main.py            # FastAPI Application
├── requirements.txt   # Python Dependencies
└── Dockerfile         # Container Definition
```

## 注意事項

- 本システムの予測は参考情報です
- 公式発表を必ずご確認ください
- 天気データは模擬データを使用（実際のAPIキーが必要）