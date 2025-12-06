"use client"

import { TrendingUp, Award, Users } from "lucide-react"
import { WalletStatus } from "./wallet-status"
import { StatCard } from "./stat-card"

interface DashboardProps {
  onCreateBoard: () => void
}

export function Dashboard({ onCreateBoard }: DashboardProps) {
  return (
    <div className="overflow-auto h-full">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Welcome back</h1>
            <p className="text-muted-foreground mt-2">Here's an overview of your tasks and rewards</p>
          </div>
          <button
            onClick={onCreateBoard}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            New Board
          </button>
        </div>

        {/* Wallet Status */}
        <WalletStatus />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Boards"
            value="3"
            subtext="Active projects"
            icon={Trello}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            label="Active Tasks"
            value="35"
            subtext="In progress"
            icon={TrendingUp}
            trend={{ value: 8, positive: true }}
          />
          <StatCard
            label="Rewards Earned"
            value="12,450"
            subtext="$MOVE tokens"
            icon={Award}
            trend={{ value: 25, positive: true }}
          />
          <StatCard label="Team Members" value="8" subtext="Contributors" icon={Users} />
        </div>

        {/* Recent Boards */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Recent Boards</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer"
              >
                <div>
                  <h3 className="font-semibold text-foreground">Board {i}</h3>
                  <p className="text-sm text-muted-foreground">12 tasks • 65% complete</p>
                </div>
                <div className="w-12 h-1 bg-secondary rounded-full overflow-hidden">
                  <div className="w-8 h-full bg-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import { Trello } from "lucide-react"
