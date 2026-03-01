import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Download, ArrowLeft, MapPin, Calendar, Tag, Loader2, HardDrive } from 'lucide-react'
import { fetchVideo } from '../lib/api'

export default function VideoPage() {
  const { id } = useParams()

  const { data: video, isLoading } = useQuery({
    queryKey: ['video', id],
    queryFn: () => fetchVideo(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    )
  }

  if (!video) {
    return <div className="text-center py-20 text-gray-500">Video not found</div>
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        to={`/trip/${video.year}/${encodeURIComponent(video.trip)}`}
        className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {video.trip}
      </Link>

      {/* Video Player */}
      <div className="bg-black rounded-xl overflow-hidden mb-6">
        <video
          src={video.proxyUrl}
          controls
          className="w-full aspect-video"
          poster={video.thumbnailUrl}
        />
      </div>

      {/* Info Panel */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold">{video.filename}</h1>
          
          <p className="text-gray-300">{video.description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {video.location || video.trip}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {video.year}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              {video.shotType}
            </span>
          </div>

          {video.activities && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Activities</h3>
              <div className="flex flex-wrap gap-2">
                {video.activities.split(',').map((activity, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-800 rounded-full text-sm"
                  >
                    {activity.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {video.potentialUses && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Potential Uses</h3>
              <p className="text-gray-300">{video.potentialUses}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Download Proxy */}
          <a
            href={video.proxyUrl}
            download
            className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-medium transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Proxy (720p)
          </a>

          {/* Request Full-Res */}
          <button
            onClick={() => alert('Full-res request sent! Team will be notified.')}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium transition-colors border border-gray-700"
          >
            <HardDrive className="w-5 h-5" />
            Request Full Resolution
          </button>

          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-sm">
            <h3 className="font-medium mb-2">File Info</h3>
            <div className="space-y-1 text-gray-400">
              <p>People visible: {video.peopleCount || 'Unknown'}</p>
              <p>Shot type: {video.shotType}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
