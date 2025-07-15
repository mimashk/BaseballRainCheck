// Migration Status Server - Temporary compatibility layer
import express from 'express';

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>甲子園天気予報 - 移行完了</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
          .container { max-width: 900px; margin: 0 auto; }
          .card { background: white; border-radius: 8px; padding: 24px; margin: 16px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
          .success { border-left: 4px solid #10b981; background: #ecfdf5; }
          .info { border-left: 4px solid #3b82f6; background: #eff6ff; }
          .warning { border-left: 4px solid #f59e0b; background: #fffbeb; }
          h1 { color: #1f2937; margin-bottom: 8px; }
          h2 { color: #374151; margin-top: 0; }
          h3 { color: #4b5563; margin-top: 0; }
          code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 14px; }
          pre { background: #f9fafb; padding: 16px; border-radius: 6px; overflow-x: auto; font-size: 14px; line-height: 1.5; }
          ul { margin: 12px 0; }
          li { margin: 4px 0; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <h1>⚾ 甲子園天気予報</h1>
            <h2>コンテナ化マイクロサービス構成への移行完了</h2>
          </div>
          
          <div class="card success">
            <h3>✅ 移行完了項目</h3>
            <ul>
              <li>Next.js 15 + TypeScript UI完全移植</li>
              <li>FastAPI + scikit-learn ML予測サービス実装</li>
              <li>Docker + Docker Compose設定完了</li>
              <li>全コンポーネント動作確認 (天気・予測・履歴・管理)</li>
              <li>不要ディレクトリクリーンアップ完了</li>
              <li>マイクロサービス分離アーキテクチャ構築</li>
            </ul>
          </div>

          <div class="card info">
            <h3>🏗️ 新しいアーキテクチャ</h3>
            <pre>プロジェクトルート/
├── next-app/          # Next.js UI + API Routes  
│   ├── app/           # App Router (UI + API)
│   ├── components/    # React Components
│   └── types/         # TypeScript Types
├── ml-service/        # Python FastAPI + ML
│   ├── main.py        # FastAPI Application
│   └── Dockerfile     # Container Config
├── docker-compose.yml # Multi-service orchestration
└── start-containers.sh # Startup script</pre>
          </div>

          <div class="grid">
            <div class="card warning">
              <h3>🚀 推奨: コンテナ環境</h3>
              <pre># 起動スクリプト実行
./start-containers.sh

# または Docker Compose直接
docker-compose up --build</pre>
            </div>

            <div class="card info">
              <h3>💻 開発時: 個別起動</h3>
              <pre># Terminal 1: ML Service
cd ml-service && python main.py

# Terminal 2: Next.js App
cd next-app && npm run dev</pre>
            </div>
          </div>

          <div class="card info">
            <h3>🌐 サービス構成</h3>
            <div class="grid">
              <div>
                <h4>Next.js App (port 3000)</h4>
                <ul>
                  <li><code>GET /api/weather/current</code></li>
                  <li><code>GET /api/weather/forecast</code></li>
                  <li><code>GET /api/game/today</code></li>
                  <li><code>GET /api/prediction</code></li>
                  <li><code>GET /api/history</code></li>
                </ul>
              </div>
              <div>
                <h4>Python ML Service (port 8000)</h4>
                <ul>
                  <li><code>GET /health</code></li>
                  <li><code>POST /predict</code></li>
                  <li>Random Forest ML Model</li>
                  <li>Weather Analysis Engine</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="card success">
            <h3>🔗 マイクロサービス連携</h3>
            <p>Next.js APIから Python ML Serviceへの接続は完全に実装済みです。ML Serviceが利用できない場合は、フォールバック予測ロジックが自動的に動作します。</p>
          </div>

          <div class="card info">
            <h3>📝 次のステップ</h3>
            <p>新しいコンテナ環境でアプリケーションを実行してください。この従来サーバーは新しいNext.js + Python構成への移行完了を示すステータス表示用です。</p>
          </div>
        </div>
      </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'Migration Complete',
    message: 'Please use containerized services',
    nextjs_app: 'http://localhost:3000',
    ml_service: 'http://localhost:8000'
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Migration status server running on port ${port}`);
  console.log('✅ Architecture migration completed successfully!');
  console.log('📦 Next.js App: port 3000 (containerized)');
  console.log('🤖 ML Service: port 8000 (containerized)');
  console.log('🚀 Use: ./start-containers.sh or docker-compose up');
});