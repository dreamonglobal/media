import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, Loader2 } from 'lucide-react'
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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Search Media</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for footage... (e.g., 'children playing', 'church worship', 'interview')"
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-orange-500 text-white"
              />
            </div>
          </div>
          
          <select
            value={shotType}
            onChange={(e) => setShotType(e.target.value)}
            className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-orange-500"
          >
            {SHOT_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-medium transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : searchTerm ? (
        <div>
          <p className="text-gray-400 mb-4">
            {results?.length || 0} results for "{searchTerm}"
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results?.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
          {results?.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No videos found. Try different keywords.
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p>Enter a search term to find footage</p>
          <p className="text-sm mt-2">
            Search by description, location, activities, or shot type
          </p>
        </div>
      )}
    </div>
  )
}
