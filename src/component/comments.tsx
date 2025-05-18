import { Button } from "./button"
import { ThumbsUp, ThumbsDown } from "lucide-react"

export default function Comments() {
  const comments = [
    {
      id: 1,
      author: "Jane Cooper",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "2 months ago",
      content: "This is such an amazing video! I've learned so much from it.",
      likes: 245,
    },
    {
      id: 2,
      author: "Robert Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "1 month ago",
      content: "The animation quality is incredible. Thanks for sharing!",
      likes: 123,
    },
    {
      id: 3,
      author: "Emily Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "2 weeks ago",
      content: "I've watched this at least 10 times now. Never gets old!",
      likes: 87,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold">Comments</h2>
        <span className="text-gray-500 dark:text-gray-400">324</span>
      </div>

      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0"></div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 pb-2 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="space-y-6 mt-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{comment.author}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{comment.time}</span>
              </div>
              <p className="mt-1">{comment.content}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{comment.likes}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ThumbsDown className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="h-8 text-sm">
                  Reply
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
