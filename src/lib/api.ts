// API Configuration
const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL || 'https://media.dreamon.world'

// Types
export interface Trip {
  year: string
  name: string
  videoCount: number
  totalSize: string
}

export interface Video {
  id: string
  filename: string
  year: string
  trip: string
  shotType: string
  description: string
  location: string
  peopleCount: string
  activities: string
  potentialUses: string
  proxyUrl: string
  thumbnailUrl?: string
}

// In-memory cache for metadata
let metadataCache: Video[] | null = null

async function loadMetadata(): Promise<Video[]> {
  if (metadataCache) return metadataCache

  try {
    const response = await fetch(`${R2_PUBLIC_URL}/metadata/index.json`)
    if (!response.ok) throw new Error('Failed to load metadata')
    metadataCache = await response.json()
    return metadataCache!
  } catch (error) {
    console.error('Error loading metadata:', error)
    // Return demo data for development
    return getDemoData()
  }
}

// Fetch all trips
export async function fetchTrips(): Promise<Trip[]> {
  const videos = await loadMetadata()
  
  const tripMap = new Map<string, { year: string; name: string; count: number }>()
  
  videos.forEach(v => {
    const key = `${v.year}-${v.trip}`
    if (!tripMap.has(key)) {
      tripMap.set(key, { year: v.year, name: v.trip, count: 0 })
    }
    tripMap.get(key)!.count++
  })

  return Array.from(tripMap.values()).map(t => ({
    year: t.year,
    name: t.name,
    videoCount: t.count,
    totalSize: `${t.count} videos`,
  }))
}

// Fetch videos for a trip
export async function fetchVideos(year?: string, trip?: string): Promise<Video[]> {
  const videos = await loadMetadata()
  
  if (!year || !trip) return videos.slice(0, 50) // Return first 50 if no filter
  
  return videos.filter(
    v => v.year === year && v.trip.toLowerCase() === decodeURIComponent(trip).toLowerCase()
  )
}

// Fetch single video
export async function fetchVideo(id: string): Promise<Video | undefined> {
  const videos = await loadMetadata()
  return videos.find(v => v.id === id)
}

// Search videos
export async function searchVideos(query: string, shotType?: string): Promise<Video[]> {
  const videos = await loadMetadata()
  const q = query.toLowerCase()
  
  return videos.filter(v => {
    const matchesQuery = 
      v.description?.toLowerCase().includes(q) ||
      v.activities?.toLowerCase().includes(q) ||
      v.location?.toLowerCase().includes(q) ||
      v.trip?.toLowerCase().includes(q) ||
      v.filename?.toLowerCase().includes(q)
    
    const matchesShotType = !shotType || v.shotType?.toLowerCase() === shotType.toLowerCase()
    
    return matchesQuery && matchesShotType
  })
}

// Demo data for development
function getDemoData(): Video[] {
  return [
    {
      id: '1',
      filename: 'GX010042.MP4',
      year: '2024',
      trip: 'Honduras',
      shotType: 'B-Roll',
      description: 'Children playing soccer in the village courtyard, late afternoon golden hour lighting',
      location: 'San Pedro Sula',
      peopleCount: '8-10',
      activities: 'playing, running, soccer',
      potentialUses: 'Social media, promo videos, documentary',
      proxyUrl: `${R2_PUBLIC_URL}/proxies/2024/Honduras/GX010042_proxy.mp4`,
    },
    {
      id: '2',
      filename: 'GX010043.MP4',
      year: '2024',
      trip: 'Honduras',
      shotType: 'Interview',
      description: 'Team member sharing testimony about the mission trip experience',
      location: 'Church',
      peopleCount: '1',
      activities: 'speaking, testimony',
      potentialUses: 'Documentary, website testimonials',
      proxyUrl: `${R2_PUBLIC_URL}/proxies/2024/Honduras/GX010043_proxy.mp4`,
    },
    {
      id: '3',
      filename: 'GX010044.MP4',
      year: '2023',
      trip: 'Brazil',
      shotType: 'Worship',
      description: 'Congregation singing worship songs during Sunday service',
      location: 'Local Church',
      peopleCount: '50+',
      activities: 'singing, worship, clapping',
      potentialUses: 'Worship highlight reels, social media',
      proxyUrl: `${R2_PUBLIC_URL}/proxies/2023/Brazil/GX010044_proxy.mp4`,
    },
  ]
}
