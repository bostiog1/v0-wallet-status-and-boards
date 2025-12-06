"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface CreateBoardModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: { name: string; description: string; rewardPool: number }) => void
}

export function CreateBoardModal({ isOpen, onClose, onCreate }: CreateBoardModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rewardPool: 5000,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim()) {
      onCreate(formData)
      setFormData({ name: "", description: "", rewardPool: 5000 })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Create New Board</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Board Name</label>
            <input
              type="text"
              placeholder="e.g., Q1 Development"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
            <textarea
              placeholder="What is this board about?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none h-24"
            />
          </div>

          {/* Reward Pool */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Reward Pool ($MOVE)</label>
            <input
              type="number"
              placeholder="5000"
              value={formData.rewardPool}
              onChange={(e) => setFormData({ ...formData, rewardPool: Number(e.target.value) })}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-secondary text-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
