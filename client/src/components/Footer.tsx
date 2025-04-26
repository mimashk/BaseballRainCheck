export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold mb-2">甲子園 雨天中止予測</h2>
            <p className="text-sm text-gray-300">
              阪神タイガース公式サイトではありません。<br />
              当サイトの予測は参考情報であり、実際の試合中止判断と異なる場合があります。
            </p>
          </div>
          
          <div className="text-sm">
            <div className="mb-2">
              <h3 className="font-medium mb-1">データソース</h3>
              <ul className="text-gray-300">
                <li>気象庁 / Japan Meteorological Agency</li>
                <li>阪神タイガース公式サイト / Hanshin Tigers Official</li>
              </ul>
            </div>
            
            <div className="text-center md:text-right text-gray-400 text-xs mt-4">
              © {new Date().getFullYear()} 甲子園 雨天中止予測
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
