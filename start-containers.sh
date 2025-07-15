#!/bin/bash

echo "甲子園天気予報 - コンテナ起動スクリプト"
echo "=================================="

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker が見つかりません。"
    echo "💡 Rancher Desktop または Docker Desktop をインストールしてください。"
    echo "💡 一時的に従来の開発環境で起動します..."
    npm run dev
    exit 1
fi

# Check if docker-compose is available (try both docker-compose and docker compose)
DOCKER_COMPOSE_CMD=""
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
else
    echo "❌ docker-compose が見つかりません。"
    echo "💡 個別サービスを起動しますか？ (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "🚀 ML Service を起動中 (port 8000)..."
        cd ml-service && python main.py &
        echo "🚀 Next.js App を起動中 (port 3000)..."
        cd ../next-app && npm run dev &
        wait
    else
        echo "💡 従来の開発環境で起動します..."
        npm run dev
    fi
    exit 0
fi

echo "🐳 Docker Compose でサービスを起動中..."
echo ""
echo "サービス構成:"
echo "  - Next.js App (UI + API): http://localhost:3000"
echo "  - Python ML Service: http://localhost:8000"
echo ""

# Clean up previous containers
echo "🧹 既存のコンテナをクリーンアップ中..."
$DOCKER_COMPOSE_CMD down

# Build and start services
echo "🔨 コンテナをビルド中..."
$DOCKER_COMPOSE_CMD build --no-cache

echo "🚀 サービスを起動中..."
$DOCKER_COMPOSE_CMD up -d

echo ""
echo "📊 サービス状態を確認中..."
$DOCKER_COMPOSE_CMD ps

echo ""
echo "🎉 サービスが正常に起動しました！"
echo "📱 アプリケーション: http://localhost:3000"
echo "🤖 ML Service: http://localhost:8000"
echo ""
echo "💡 ログを確認するには: $DOCKER_COMPOSE_CMD logs -f"
echo "💡 サービスを停止するには: $DOCKER_COMPOSE_CMD down"