import { Outlet, Link, useLocation } from 'react-router-dom'
import { Search, Upload, FolderOpen, Film } from 'lucide-react'

export default function Layout() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: FolderOpen, label: 'Browse' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/upload', icon: Upload, label: 'Upload' },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Film className="w-8 h-8 text-orange-500" />
            <span className="text-xl font-bold">Dream On Media</span>
          </Link>
          
          <nav className="flex items-center gap-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === path
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          Dream On Global © {new Date().getFullYear()} • Media Archive
        </div>
      </footer>
    </div>
  )
}
