import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Calendar, MapPin, Loader2 } from 'lucide-react'
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
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
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

    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Mission Trip Archives</h1>
        
        {years.map(yr => (
          <div key={yr} className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              {yr}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tripsByYear[yr].map(t => (
                <Link
                  key={`${t.year}-${t.name}`}
                  to={`/trip/${t.year}/${encodeURIComponent(t.name)}`}
                  className="bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-colors border border-gray-800"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">{t.name}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {t.videoCount} videos • {t.totalSize}
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
        <Link to="/" className="text-orange-400 hover:text-orange-300 text-sm mb-2 inline-block">
          ← Back to all trips
        </Link>
        <h1 className="text-3xl font-bold">
          {decodeURIComponent(trip)} <span className="text-gray-500">{year}</span>
        </h1>
      </div>

      {videosLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos?.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  )
}
