'use client'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="material-icons text-3xl text-primary">
              sports_baseball
            </span>
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                甲子園天気予報
              </h1>
              <p className="text-gray-600 text-sm">
                野球試合中止確率予測システム
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
            <span className="material-icons text-lg">schedule</span>
            <span>リアルタイム更新</span>
          </div>
        </div>
      </div>
    </header>
  );
}