'use client'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">甲子園天気予報</h3>
            <p className="text-gray-400 text-sm">
              阪神タイガースファンのための
              <br />
              試合中止確率予測サービス
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-3">機能</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• リアルタイム天気データ</li>
              <li>• AI予測アルゴリズム</li>
              <li>• 過去データ分析</li>
              <li>• 公式発表監視</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-3">注意事項</h4>
            <p className="text-gray-400 text-sm">
              本予測は参考情報です。
              <br />
              公式発表を必ずご確認ください。
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 甲子園天気予報. データ提供: 気象庁API
          </p>
        </div>
      </div>
    </footer>
  );
}