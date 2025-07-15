// Temporary server to redirect to Next.js app documentation
const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>甲子園天気予報 - アーキテクチャ変更完了</title>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .container { max-width: 800px; margin: 0 auto; }
          .success { background: #d4edda; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .info { background: #d1ecf1; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .warning { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; }
          code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
          pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🏟️ 甲子園天気予報</h1>
          <h2>コンテナ化マイクロサービス構成移行完了</h2>
          
          <div class="success">
            <h3>✅ 移行完了項目</h3>
            <ul>
              <li>Next.js 15 + TypeScript フロントエンド完全移植</li>
              <li>Next.js API Routes による中間API層実装</li>
              <li>FastAPI + scikit-learn 独立ML予測サービス</li>
              <li>Docker + Docker Compose設定</li>
              <li>全コンポーネント移植 (天気・予測・履歴・管理パネル)</li>
              <li>不要ディレクトリクリーンアップ (client/, server/削除)</li>
            </ul>
          </div>

          <div class="info">
            <h3>🏗️ 新しいアーキテクチャ</h3>
            <pre>
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
            </pre>
          </div>

          <div class="warning">
            <h3>🚀 新しい実行方法</h3>
            <h4>推奨: コンテナ環境</h4>
            <pre>
# 方法1: 起動スクリプト
./start-containers.sh

# 方法2: Docker Compose直接
docker-compose up --build
            </pre>
            
            <h4>開発時: 個別サービス起動</h4>
            <pre>
# Terminal 1: ML Service
cd ml-service && python main.py

# Terminal 2: Next.js App  
cd next-app && npm run dev
            </pre>
          </div>

          <div class="info">
            <h3>📡 API エンドポイント</h3>
            <h4>Next.js API Routes (port 3000)</h4>
            <ul>
              <li><code>GET /api/weather/current</code> - 現在の天気</li>
              <li><code>GET /api/weather/forecast</code> - 時間別予報</li>
              <li><code>GET /api/game/today</code> - 今日の試合情報</li>
              <li><code>GET /api/prediction</code> - AI予測結果</li>
              <li><code>GET /api/history</code> - 過去の試合履歴</li>
            </ul>
            
            <h4>Python ML Service (port 8000)</h4>
            <ul>
              <li><code>GET /health</code> - ヘルスチェック</li>
              <li><code>POST /predict</code> - 機械学習予測</li>
            </ul>
          </div>

          <div class="success">
            <h3>🔗 サービス連携</h3>
            <p>Next.js APIから Python ML Serviceへの接続は完全に実装済みです。</p>
            <p>ML Serviceが利用できない場合は、フォールバック予測ロジックが動作します。</p>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Migration Complete',
    message: 'Please use containerized services',
    nextjs_app: 'port 3000',
    ml_service: 'port 8000'
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(\`Legacy server running on port \${port}\`);
  console.log('Architecture migration completed!');
  console.log('Next.js App: port 3000');
  console.log('ML Service: port 8000');
});