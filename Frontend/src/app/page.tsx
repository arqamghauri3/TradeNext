"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, Target, AlertTriangle, Users } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const portfolioData = [
  { date: "Jan", value: 10000 },
  { date: "Feb", value: 12000 },
  { date: "Mar", value: 11500 },
  { date: "Apr", value: 13200 },
  { date: "May", value: 15800 },
  { date: "Jun", value: 14200 },
]

const recentTrades = [
  { symbol: "AAPL", type: "BUY", quantity: 100, price: 175.50, pnl: 250, status: "closed" },
  { symbol: "TSLA", type: "SELL", quantity: 50, price: 245.80, pnl: -120, status: "open" },
  { symbol: "MSFT", type: "BUY", quantity: 75, price: 380.25, pnl: 180, status: "closed" },
  { symbol: "NVDA", type: "BUY", quantity: 25, price: 450.00, pnl: 320, status: "open" },
]

export default function Dashboard() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$14,200</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+$4,200</div>
              <p className="text-xs text-muted-foreground">
                42% win rate this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                2 positions at risk
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">Medium</div>
              <p className="text-xs text-muted-foreground">
                Portfolio exposure: 65%
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Portfolio Performance Chart */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Your portfolio value over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={portfolioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Portfolio Value"]} />
                  <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Trades */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
              <CardDescription>Your latest trading activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTrades.map((trade, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant={trade.type === "BUY" ? "default" : "secondary"}>
                        {trade.type}
                      </Badge>
                      <span className="font-medium">{trade.symbol}</span>
                      <span className="text-sm text-muted-foreground">
                        {trade.quantity} @ ${trade.price}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trade.pnl >= 0 ? '+' : ''}${trade.pnl}
                      </span>
                      <Badge variant={trade.status === "open" ? "outline" : "secondary"}>
                        {trade.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle>AI Trading Insights</CardTitle>
            <CardDescription>Personalized recommendations based on your trading patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">Opportunity</h4>
                <p className="text-sm text-muted-foreground">
                  Your tech sector allocation is underweight. Consider increasing exposure to NVDA or AMD based on recent momentum.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-yellow-600">Risk Alert</h4>
                <p className="text-sm text-muted-foreground">
                  Your TSLA position represents 15% of portfolio. Consider reducing exposure or setting tighter stop-loss.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-blue-600">Pattern Recognition</h4>
                <p className="text-sm text-muted-foreground">
                  You tend to perform better on momentum trades. Your breakout strategy has a 68% success rate.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button>Add New Trade</Button>
          <Button variant="outline">Run Backtest</Button>
          <Button variant="outline">Set Alert</Button>
          <Button variant="outline">View Risk Report</Button>
        </div>
      </div>
    </SidebarInset>
  )
}
