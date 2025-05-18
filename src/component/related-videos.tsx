import Image from "next/image"

export default function RelatedVideos() {
  const videos = [
    {
      id: 1,
      title: "Elephant's Dream - Sample Video",
      channel: "Sample Channel",
      views: "1.5M views",
      time: "2 years ago",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
    {
      id: 2,
      title: "Sintel - Sample Animation",
      channel: "Animation Studio",
      views: "3.2M views",
      time: "1 year ago",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
    {
      id: 3,
      title: "Tears of Steel - Sci-Fi Short Film",
      channel: "Sci-Fi Channel",
      views: "987K views",
      time: "8 months ago",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
    {
      id: 4,
      title: "Cosmos Laundromat - Animation",
      channel: "Blender Foundation",
      views: "2.1M views",
      time: "3 years ago",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
    {
      id: 5,
      title: "Nature Documentary - Wildlife",
      channel: "Nature Channel",
      views: "5.7M views",
      time: "1 month ago",
      thumbnail: "/placeholder.svg?height=180&width=320",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="font-bold">Related Videos</h2>

      <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg"
          >
            <div className="flex-shrink-0 relative w-40 h-24 rounded-lg overflow-hidden">
              <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium line-clamp-2">{video.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{video.channel}</p>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <span>{video.views}</span>
                <span>•</span>
                <span>{video.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
