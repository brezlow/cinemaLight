import VideoPlayer from "@/component/video-player";
import Comments from "@/component/comments";
import VideoInfo from "@/component/video-info";
import RelatedVideos from "@/component/related-videos";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2">YouTube-Style Video Player with Ambient Lighting</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Experience theater-like ambient lighting that adapts to your video content
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer />
            <VideoInfo />
            <Comments />
          </div>
          <div className="lg:col-span-1">
            <RelatedVideos />
          </div>
        </div>
      </div>
    </div>
  )
}
