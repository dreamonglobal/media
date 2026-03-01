import { Link } from 'react-router-dom'
import { Play, MapPin } from 'lucide-react'
import type { Video } from '../lib/api'

interface VideoCardProps {
  video: Video
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link
      to={`/video/${video.id}`}
      className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all hover:scale-[1.02]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-800">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.filename}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="w-12 h-12 text-gray-600" />
          </div>
        )}
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </div>
        </div>

        {/* Shot type badge */}
        <span className="absolute top-2 left-2 px-2 py-1 bg-black/70 rounded text-xs">
          {video.shotType || 'Video'}
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-medium truncate mb-1" title={video.filename}>
          {video.filename}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 mb-2">
          {video.description || 'No description'}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <MapPin className="w-3 h-3" />
          <span>{video.trip}</span>
          <span>•</span>
          <span>{video.year}</span>
        </div>
      </div>
    </Link>
  )
}
