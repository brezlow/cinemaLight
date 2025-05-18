import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal } from "lucide-react"
import { Button } from "./button"

export default function VideoInfo() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Big Buck Bunny - Sample Video</h1>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div>
            <p className="font-medium">Channel Name</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">1.2M subscribers</p>
          </div>
          <Button className="ml-4 bg-red-600 hover:bg-red-700 text-white">Subscribe</Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>12K</span>
          </Button>

          <Button variant="outline" className="flex items-center gap-1">
            <ThumbsDown className="w-4 h-4" />
          </Button>

          <Button variant="outline" className="flex items-center gap-1">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>

          <Button variant="outline" className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </Button>

          <Button variant="outline" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>1.2M views</span>
          <span>•</span>
          <span>3 years ago</span>
        </div>
        <p className="mt-2">
          Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three
          rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon
          tradition he prepares the nasty rodents a comical revenge.
        </p>
      </div>
    </div>
  )
}
