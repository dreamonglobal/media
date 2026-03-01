import { Outlet, Link, useLocation } from 'react-router-dom'
import { Search, Upload, FolderOpen } from 'lucide-react'

export default function Layout() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: FolderOpen, label: 'Browse' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/upload', icon: Upload, label: 'Upload' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            {/* Dream On Logo */}
            <img 
              src="https://dreamon.world/download.png" 
              alt="Dream On" 
              className="h-10 w-auto invert"
            />
            <div className="border-l border-white/20 pl-4">
              <span className="text-lg font-semibold text-white">
                Media Archive
              </span>
              <div className="text-xs text-gray-400">
                Mission Trip Footage
              </div>
            </div>
          </Link>
          
          <nav className="flex items-center gap-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                  location.pathname === path
                    ? 'bg-[#F97316] text-white shadow-lg shadow-orange-500/25'
                    : 'hover:bg-white/10 text-gray-300 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-16 bg-black/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src="https://dreamon.world/download.png" 
                alt="Dream On" 
                className="h-6 w-auto invert opacity-70"
              />
              <span className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Dream On Global
              </span>
            </div>
            <div className="text-sm text-gray-500 italic">
              "Igniting faith, sparking dreams, and transforming lives through the power of Jesus."
            </div>
            <a 
              href="https://dreamon.world" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-[#F97316] hover:text-orange-400 transition-colors"
            >
              dreamon.world →
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
