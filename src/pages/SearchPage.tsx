import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, Loader2, Sparkles, Video } from 'lucide-react'
import { searchVideos } from '../lib/api'
import VideoCard from '../components/VideoCard'

const SHOT_TYPES = [
  'All Types',
  'B-Roll',
  'Interview',
  'Establishing',
  'Action',
  'Documentary',
  'Worship',
  'Portrait',
]

const QUICK_SEARCHES = [
  { label: '👶 Children', query: 'children' },
  { label: '🙏 Worship', query: 'worship' },
  { label: '🎤 Interview', query: 'interview' },
  { label: '🏗️ Construction', query: 'construction' },
  { label: '🍽️ Food', query: 'food' },
  { label: '⚽ Playing', query: 'playing' },
]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [shotType, setShotType] = useState('All Types')
  const [searchTerm, setSearchTerm] = useState('')

  const { data: results, isLoading } = useQuery({
    queryKey: ['search', searchTerm, shotType],
    queryFn: () => searchVideos(searchTerm, shotType === 'All Types' ? undefined : shotType),
    enabled: searchTerm.length > 0,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchTerm(query)
  }

  const handleQuickSearch = (q: string) => {
    setQuery(q)
    setSearchTerm(q)
  }

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Search Media
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Find the perfect footage using AI-powered descriptions. Search by scene, activity, or mood.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative mb-4">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for footage... (e.g., 'children playing', 'church worship', 'interview')"
              className="w-full pl-14 pr-6 py-4 bg-gray-900/80 border border-gray-700/50 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-white text-lg placeholder:text-gray-500 transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2 bg-orange-500 hover:bg-orange-600 rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Search
            </button>
          </div>
          
          {/* Quick searches */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-sm text-gray-500 mr-2">Quick:</span>
            {QUICK_SEARCHES.map(({ label, query: q }) => (
              <button
                key={q}
                type="button"
                onClick={() => handleQuickSearch(q)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  searchTerm === q
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* Results */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
          <p className="text-gray-500">Searching...</p>
        </div>
      ) : searchTerm ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">
              <span className="text-white font-semibold">{results?.length || 0}</span> results for "{searchTerm}"
            </p>
            <select
              value={shotType}
              onChange={(e) => setShotType(e.target.value)}
              className="px-4 py-2 bg-gray-900/80 border border-gray-700/50 rounded-xl focus:outline-none focus:border-orange-500 text-sm"
            >
              {SHOT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {results && results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {results.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Video className="w-16 h-16 mx-auto mb-4 text-gray-700" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No videos found</h3>
              <p className="text-gray-500">Try different keywords or browse by trip instead</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500/10 to-purple-500/10 flex items-center justify-center">
            <Search className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">Ready to search</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Enter a search term or click a quick search button to find footage by description, location, or activity
          </p>
        </div>
      )}
    </div>
  )
}
