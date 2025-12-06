"use client"

import { Wallet, Send, Download, Activity } from "lucide-react"

export function WalletStatus() {
  const walletData = {
    address: "0x7E5F4552091A69125601A51F518B9FE93FA8476F",
    balance: 42.5,
    pendingRewards: 1250,
    totalEarned: 15680,
    lastTransaction: "2 hours ago",
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Balance Card */}
      <div className="lg:col-span-2 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 rounded-2xl p-8">
        <div className="flex items-start justify-between mb-12">
          <div>
            <p className="text-muted-foreground text-sm mb-2">Wallet Balance</p>
            <h2 className="text-5xl font-bold text-foreground">42.5</h2>
            <p className="text-muted-foreground mt-2">$MOVE tokens</p>
          </div>
          <div className="p-3 bg-primary/20 rounded-lg">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Address */}
        <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm text-foreground">
          <span className="text-muted-foreground">Address:</span> {walletData.address}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
            <Send className="w-4 h-4" />
            Send
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-semibold">
            <Download className="w-4 h-4" />
            Receive
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="space-y-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-muted-foreground text-sm">Pending Rewards</p>
            <Activity className="w-4 h-4 text-accent" />
          </div>
          <p className="text-2xl font-bold text-foreground">1,250</p>
          <p className="text-xs text-muted-foreground mt-2">From completed tasks</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-muted-foreground text-sm">Total Earned</p>
            <Wallet className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">15,680</p>
          <p className="text-xs text-muted-foreground mt-2">All time</p>
        </div>
      </div>
    </div>
  )
}
