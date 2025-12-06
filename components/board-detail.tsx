"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Filter } from "lucide-react"
import { TaskCard } from "./task-card"
import { CreateTaskModal } from "./create-task-modal"

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

interface Board {
  id: string
  name: string
  description: string
  progress: number
  taskCount: number
  rewardPool: number
}

interface BoardDetailProps {
  board: Board
  tasks: Task[]
  onCreateTask: (data: any) => void
  onUpdateTask: (id: string, updates: any) => void
  onDeleteTask: (id: string) => void
  onBack: () => void
}

export function BoardDetail({ board, tasks, onCreateTask, onUpdateTask, onDeleteTask, onBack }: BoardDetailProps) {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const statuses = ["todo", "in-progress", "completed"]
  const filteredTasks = selectedStatus ? tasks.filter((t) => t.status === selectedStatus) : tasks

  const todoCount = tasks.filter((t) => t.status === "todo").length
  const inProgressCount = tasks.filter((t) => t.status === "in-progress").length
  const completedCount = tasks.filter((t) => t.status === "completed").length

  return (
    <div className="overflow-auto h-full">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Boards
            </button>
            <h1 className="text-4xl font-bold text-foreground">{board.name}</h1>
            <p className="text-muted-foreground mt-2">{board.description}</p>
          </div>
          <button
            onClick={() => setIsCreateTaskOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>

        {/* Board Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Tasks</p>
            <p className="text-3xl font-bold text-foreground">{tasks.length}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm mb-2">To Do</p>
            <p className="text-3xl font-bold text-foreground">{todoCount}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm mb-2">In Progress</p>
            <p className="text-3xl font-bold text-accent">{inProgressCount}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm mb-2">Completed</p>
            <p className="text-3xl font-bold text-green-500">{completedCount}</p>
          </div>
        </div>

        {/* Kanban-style Task View */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Tasks</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statuses.map((status) => (
              <div key={status} className="bg-secondary/30 rounded-xl p-4 border border-border">
                {/* Column Header */}
                <div className="mb-6">
                  <h3 className="font-bold text-foreground capitalize flex items-center gap-2">
                    {status === "todo" && "To Do"}
                    {status === "in-progress" && "In Progress"}
                    {status === "completed" && "Completed"}
                    <span className="text-xs font-semibold text-muted-foreground bg-card px-2 py-1 rounded">
                      {tasks.filter((t) => t.status === status).length}
                    </span>
                  </h3>
                </div>

                {/* Task Cards */}
                <div className="space-y-3">
                  {tasks
                    .filter((t) => t.status === status)
                    .map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onUpdate={onUpdateTask}
                        onDelete={onDeleteTask}
                        onStatusChange={(newStatus) => onUpdateTask(task.id, { status: newStatus })}
                      />
                    ))}

                  {tasks.filter((t) => t.status === status).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">No tasks yet</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CreateTaskModal isOpen={isCreateTaskOpen} onClose={() => setIsCreateTaskOpen(false)} onCreate={onCreateTask} />
    </div>
  )
}
