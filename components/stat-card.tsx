"use client"

import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  label: string
  value: string
  subtext: string
  icon: LucideIcon
  trend?: { value: number; positive: boolean }
}

export function StatCard({ label, value, subtext, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
          <p className="text-xs text-muted-foreground mt-2">{subtext}</p>
        </div>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>

      {trend && (
        <div className={`text-xs font-semibold ${trend.positive ? "text-green-500" : "text-red-500"}`}>
          {trend.positive ? "↑" : "↓"} {trend.value}% from last month
        </div>
      )}
    </div>
  )
}
