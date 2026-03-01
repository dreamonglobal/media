import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Calendar, MapPin, Loader2, ChevronRight, Video, Globe } from 'lucide-react'
import { fetchTrips, fetchVideos, type Trip } from '../lib/api'
import VideoCard from '../components/VideoCard'

export default function BrowsePage() {
  const { year, trip } = useParams()

  const { data: trips, isLoading: tripsLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: fetchTrips,
  })

  const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ['videos', year, trip],
    queryFn: () => fetchVideos(year, trip),
    enabled: !!(year && trip),
  })

  if (tripsLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
        <p className="text-gray-500">Loading archives...</p>
      </div>
    )
  }

  // Show trip selector if no trip selected
  if (!year || !trip) {
    const tripsByYear = trips?.reduce((acc, t) => {
      if (!acc[t.year]) acc[t.year] = []
      acc[t.year].push(t)
      return acc
    }, {} as Record<string, Trip[]>) || {}

    const years = Object.keys(tripsByYear).sort((a, b) => Number(b) - Number(a))
    const totalVideos = trips?.reduce((sum, t) => sum + t.videoCount, 0) || 0

    return (
      <div>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Mission Trip Archives
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Explore footage from Dream On's mission trips around the world. 
            Search by location, year, or let AI help you find the perfect clip.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full">
              <Video className="w-4 h-4 text-orange-500" />
              <span className="text-gray-300"><strong className="text-white">{totalVideos}</strong> videos</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300"><strong className="text-white">{trips?.length}</strong> trips</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full">
              <Calendar className="w-4 h-4 text-green-400" />
              <span className="text-gray-300"><strong className="text-white">{years.length}</strong> years</span>
            </div>
          </div>
        </div>
        
        {years.map(yr => (
          <div key={yr} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{yr}</h2>
                <p className="text-sm text-gray-500">{tripsByYear[yr].length} trip{tripsByYear[yr].length > 1 ? 's' : ''}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tripsByYear[yr].map(t => (
                <Link
                  key={`${t.year}-${t.name}`}
                  to={`/trip/${t.year}/${encodeURIComponent(t.name)}`}
                  className="group bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-5 hover:from-gray-800 hover:to-gray-900 transition-all duration-300 border border-gray-800/50 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <span className="font-semibold text-white group-hover:text-orange-400 transition-colors block">
                          {t.name}
                        </span>
                        <span className="text-sm text-gray-500">{t.year}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                        style={{ width: `${Math.min(100, t.videoCount / 2)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-400">
                      {t.videoCount} videos
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Show videos for selected trip
  return (
    <div>
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 text-sm mb-4 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to all trips
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <MapPin className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {decodeURIComponent(trip)}
            </h1>
            <p className="text-gray-500">{year} Mission Trip • {videos?.length || 0} videos</p>
          </div>
        </div>
      </div>

      {videosLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
          <p className="text-gray-500">Loading videos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {videos?.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  )
}
