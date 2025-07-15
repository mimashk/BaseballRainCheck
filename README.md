# 甲子園天気予報野球試合中止予測アプリケーション

阪神タイガース戦の中止確率を天気データと機械学習で予測するWebアプリケーション。

## 🏗️ アーキテクチャ

- **Next.js App (port 3000)**: UI + API Routes
- **Python ML Service (port 8000)**: FastAPI + scikit-learn予測モデル
- **Docker Compose**: マイクロサービス統合管理

## 🚀 実行方法

### 1. 推奨：Docker環境

#### 必要な環境
- [Rancher Desktop](https://rancherdesktop.io/) または [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- `docker` コマンドが利用可能

#### 起動手順

```bash
# 1. 起動スクリプトを実行
./start-containers.sh

# または Docker Compose直接実行
docker-compose up --build
```

#### サービス確認

- **アプリケーション**: http://localhost:3000
- **ML Service**: http://localhost:8000/health

### 2. 開発環境（個別起動）

```bash
# Terminal 1: Python ML Service
cd ml-service
python main.py

# Terminal 2: Next.js App
cd next-app
npm run dev
```

## 🔧 Rancher Desktop 設定

1. Rancher Desktop をインストール
2. 設定で **dockerd (moby)** を選択
3. Kubernetes は無効化してもOK
4. **Apply & Restart** を実行

## 📊 サービス構成

### Next.js App (port 3000)
- `GET /api/weather/current` - 現在の天気
- `GET /api/weather/forecast` - 時間別予報  
- `GET /api/game/today` - 今日の試合情報
- `GET /api/prediction` - AI予測結果
- `GET /api/history` - 過去の試合履歴
- `GET /api/health` - ヘルスチェック

### Python ML Service (port 8000)
- `GET /health` - ヘルスチェック
- `POST /predict` - 機械学習予測
- Random Forest MLモデル
- 気象データ分析エンジン

## 🐳 Docker 関連コマンド

```bash
# コンテナ状態確認
docker-compose ps

# ログ確認
docker-compose logs -f

# 特定サービスのログ
docker-compose logs -f nextjs-app
docker-compose logs -f ml-service

# サービス停止
docker-compose down

# 完全クリーンアップ
docker-compose down --volumes --remove-orphans
```

## 🔄 トラブルシューティング

### Docker関連
- Rancher Desktop が起動しているか確認
- `docker ps` でコンテナ確認
- ポート3000、8000が他のプロセスで使用されていないか確認

### アプリケーション関連
- ML Service のヘルスチェック: `curl http://localhost:8000/health`
- Next.js App のヘルスチェック: `curl http://localhost:3000/api/health`

## 📝 機能実装状況

- ✅ 4項目天気データ表示（気温・降水量・湿度・風速）
- ✅ AI機械学習予測（Random Forest モデル）
- ✅ 試合ステータス管理（予定・中止・進行中・終了）
- ✅ 過去履歴データ表示
- ✅ 管理者手動更新パネル
- ✅ Docker コンテナ化
- ✅ マイクロサービス分離
- 🚧 外部API自動監視（フレームワーク準備済み）

## 📂 プロジェクト構成

```
プロジェクトルート/
├── next-app/          # Next.js UI + API Routes
│   ├── app/           # App Router (UI + API)
│   ├── components/    # React Components
│   ├── types/         # TypeScript Types
│   └── Dockerfile     # Next.js Container
├── ml-service/        # Python FastAPI + ML
│   ├── main.py        # FastAPI Application
│   ├── requirements.txt
│   └── Dockerfile     # Python Container
├── docker-compose.yml # Multi-service orchestration
├── start-containers.sh # Startup script
└── README.md          # This file
```