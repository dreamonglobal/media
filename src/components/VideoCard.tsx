import { Link } from 'react-router-dom'
import { Play, MapPin, Users } from 'lucide-react'
import type { Video } from '../lib/api'

interface VideoCardProps {
  video: Video
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link
      to={`/video/${video.id}`}
      className="group bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden border border-gray-800/50 hover:border-orange-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/10"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.filename}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-purple-500/10">
            <div className="w-16 h-16 rounded-full bg-gray-800/80 flex items-center justify-center">
              <Play className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        )}
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg shadow-orange-500/50">
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </div>
        </div>

        {/* Shot type badge */}
        {video.shotType && video.shotType !== 'Video' && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs font-medium text-gray-200">
            {video.shotType}
          </span>
        )}

        {/* Year badge */}
        <span className="absolute top-3 right-3 px-2.5 py-1 bg-orange-500/90 backdrop-blur-sm rounded-full text-xs font-bold text-white">
          {video.year}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-white truncate mb-2 group-hover:text-orange-400 transition-colors" title={video.filename}>
          {video.filename.replace('_proxy.mp4', '').replace(/_/g, ' ')}
        </h3>
        
        {video.description && video.description !== `Mission footage from ${video.trip} ${video.year}` ? (
          <p className="text-sm text-gray-400 line-clamp-2 mb-3 leading-relaxed">
            {video.description}
          </p>
        ) : (
          <p className="text-sm text-gray-500 italic mb-3">
            Mission footage
          </p>
        )}
        
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 rounded-full">
            <MapPin className="w-3 h-3 text-orange-500" />
            <span>{video.trip}</span>
          </span>
          {video.peopleCount && (
            <span className="flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 rounded-full">
              <Users className="w-3 h-3 text-blue-400" />
              <span>{video.peopleCount}</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
