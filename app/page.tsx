"use client"

import { useState } from "react"
import { Dashboard } from "@/components/dashboard"
import { BoardsList } from "@/components/boards-list"
import { BoardDetail } from "@/components/board-detail"
import { CreateBoardModal } from "@/components/create-board-modal"
import { Sidebar } from "@/components/sidebar"

export default function Home() {
  const [currentView, setCurrentView] = useState<"dashboard" | "boards" | "board">("dashboard")
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null)
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false)

  const [tasks, setTasks] = useState([
    {
      id: "t1",
      boardId: "1",
      title: "Setup API endpoints",
      description: "Create REST endpoints for user management",
      status: "in-progress",
      priority: "high",
      assignee: "Alice",
      dueDate: "2024-01-20",
      reward: 500,
      completed: false,
    },
    {
      id: "t2",
      boardId: "1",
      title: "Database schema design",
      description: "Design and document database schema",
      status: "completed",
      priority: "high",
      assignee: "Bob",
      dueDate: "2024-01-15",
      reward: 600,
      completed: true,
    },
    {
      id: "t3",
      boardId: "1",
      title: "Frontend components",
      description: "Build reusable React components",
      status: "todo",
      priority: "medium",
      assignee: "Charlie",
      dueDate: "2024-01-25",
      reward: 400,
      completed: false,
    },
    {
      id: "t4",
      boardId: "2",
      title: "Social media graphics",
      description: "Create graphics for social media posts",
      status: "in-progress",
      priority: "medium",
      assignee: "Diana",
      dueDate: "2024-01-22",
      reward: 300,
      completed: false,
    },
    {
      id: "t5",
      boardId: "2",
      title: "Email campaign setup",
      description: "Setup and schedule email campaign",
      status: "todo",
      priority: "high",
      assignee: "Eve",
      dueDate: "2024-01-24",
      reward: 250,
      completed: false,
    },
  ])

  const [boards, setBoards] = useState([
    {
      id: "1",
      name: "Q1 Development",
      description: "Main development tasks for Q1",
      progress: 65,
      taskCount: 12,
      rewardPool: 5000,
    },
    {
      id: "2",
      name: "Marketing Campaign",
      description: "Spring marketing push",
      progress: 45,
      taskCount: 8,
      rewardPool: 2500,
    },
    {
      id: "3",
      name: "Bug Fixes",
      description: "Critical and high-priority issues",
      progress: 78,
      taskCount: 15,
      rewardPool: 3000,
    },
  ])

  const handleCreateBoard = (boardData: { name: string; description: string; rewardPool: number }) => {
    const newBoard = {
      id: String(boards.length + 1),
      ...boardData,
      progress: 0,
      taskCount: 0,
    }
    setBoards([...boards, newBoard])
    setIsCreateBoardOpen(false)
  }

  const handleCreateTask = (taskData: {
    title: string
    description: string
    priority: string
    reward: number
    dueDate: string
  }) => {
    if (!selectedBoardId) return

    const newTask = {
      id: `t${Math.random()}`,
      boardId: selectedBoardId,
      ...taskData,
      status: "todo",
      assignee: "Unassigned",
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  const handleUpdateTask = (taskId: string, updates: any) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)))
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId))
  }

  const handleSelectBoard = (boardId: string) => {
    setSelectedBoardId(boardId)
    setCurrentView("board")
  }

  const boardTasks = selectedBoardId ? tasks.filter((t) => t.boardId === selectedBoardId) : []

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-1 overflow-hidden">
        {currentView === "dashboard" && <Dashboard onCreateBoard={() => setIsCreateBoardOpen(true)} />}
        {currentView === "boards" && (
          <BoardsList
            boards={boards}
            onSelectBoard={handleSelectBoard}
            onCreateBoard={() => setIsCreateBoardOpen(true)}
          />
        )}
        {currentView === "board" && selectedBoardId && (
          <BoardDetail
            board={boards.find((b) => b.id === selectedBoardId)!}
            tasks={boardTasks}
            onCreateTask={handleCreateTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onBack={() => setCurrentView("boards")}
          />
        )}
      </main>

      <CreateBoardModal
        isOpen={isCreateBoardOpen}
        onClose={() => setIsCreateBoardOpen(false)}
        onCreate={handleCreateBoard}
      />
    </div>
  )
}
