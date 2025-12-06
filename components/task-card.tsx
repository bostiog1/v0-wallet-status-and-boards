"use client"

import { useState } from "react"
import { Trash2, MoreVertical, Award } from "lucide-react"

interface Task {
  id: string
  boardId: string
  title: string
  description: string
  status: string
  priority: string
  assignee: string
  dueDate: string
  reward: number
  completed: boolean
}

interface TaskCardProps {
  task: Task
  onUpdate: (id: string, updates: any) => void
  onDelete: (id: string) => void
  onStatusChange: (status: string) => void
}

export function TaskCard({ task, onUpdate, onDelete, onStatusChange }: TaskCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const priorityColors = {
    high: "bg-red-500/20 text-red-400 border-red-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low: "bg-green-500/20 text-green-400 border-green-500/30",
  }

  const getPriorityColor = (priority: string) => {
    return priorityColors[priority as keyof typeof priorityColors] || priorityColors.medium
  }

  const nextStatus = {
    todo: "in-progress",
    "in-progress": "completed",
    completed: "todo",
  }

  const daysLeft = Math.ceil((new Date(task.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all group">
      {/* Header with Menu */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground text-sm leading-tight">{task.title}</h4>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-8 bg-secondary border border-border rounded-lg shadow-lg z-10 min-w-48">
              <button
                onClick={() => {
                  onStatusChange(nextStatus[task.status as keyof typeof nextStatus])
                  setIsMenuOpen(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-primary/20 text-foreground text-sm border-b border-border"
              >
                Mark as {nextStatus[task.status as keyof typeof nextStatus]}
              </button>
              <button
                onClick={() => {
                  onDelete(task.id)
                  setIsMenuOpen(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-destructive/20 text-destructive text-sm flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>

      {/* Tags and Info */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-semibold px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">{task.assignee}</span>
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">{daysLeft > 0 ? `${daysLeft}d left` : "Due soon"}</span>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <Award className="w-3 h-3" />
            <span className="text-xs font-semibold">{task.reward}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
