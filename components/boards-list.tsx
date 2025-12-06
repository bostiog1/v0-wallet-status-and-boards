"use client"

import { Plus, MoreVertical, Award } from "lucide-react"

interface Board {
  id: string
  name: string
  description: string
  progress: number
  taskCount: number
  rewardPool: number
}

interface BoardsListProps {
  boards: Board[]
  onSelectBoard: (id: string) => void
  onCreateBoard: () => void
}

export function BoardsList({ boards, onSelectBoard, onCreateBoard }: BoardsListProps) {
  return (
    <div className="overflow-auto h-full">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Boards</h1>
            <p className="text-muted-foreground mt-2">Manage your projects and tasks</p>
          </div>
          <button
            onClick={onCreateBoard}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Board
          </button>
        </div>

        {/* Boards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <div
              key={board.id}
              onClick={() => onSelectBoard(board.id)}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {board.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{board.description}</p>
                </div>
                <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground">Progress</span>
                  <span className="text-xs font-bold text-primary">{board.progress}%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                    style={{ width: `${board.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Tasks</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{board.taskCount}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Rewards</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{board.rewardPool.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Create New Board Card */}
          <button
            onClick={onCreateBoard}
            className="bg-card border-2 border-dashed border-border rounded-2xl p-6 hover:border-primary/50 hover:bg-secondary/30 transition-all duration-300 flex items-center justify-center min-h-64"
          >
            <div className="text-center">
              <div className="p-3 bg-primary/10 rounded-lg mx-auto mb-3">
                <Plus className="w-6 h-6 text-primary mx-auto" />
              </div>
              <p className="font-semibold text-foreground">Create New Board</p>
              <p className="text-sm text-muted-foreground mt-1">Start organizing tasks</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
