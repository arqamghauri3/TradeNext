"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, BarChart3, TrendingUp, DollarSign, Target } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const backtestResults = [
  { date: "2023-01", value: 10000, benchmark: 10000 },
  { date: "2023-02", value: 10500, benchmark: 10200 },
  { date: "2023-03", value: 11200, benchmark: 10100 },
  { date: "2023-04", value: 10800, benchmark: 10300 },
  { date: "2023-05", value: 12100, benchmark: 10800 },
  { date: "2023-06", value: 13500, benchmark: 11200 },
  { date: "2023-07", value: 12900, benchmark: 11500 },
  { date: "2023-08", value: 14200, benchmark: 11800 },
  { date: "2023-09", value: 13800, benchmark: 11600 },
  { date: "2023-10", value: 15100, benchmark: 12200 },
  { date: "2023-11", value: 16200, benchmark: 12800 },
  { date: "2023-12", value: 17500, benchmark: 13500 },
]

const strategies = [
  {
    name: "Momentum Breakout",
    description: "Buy on breakout above 20-day high, sell on break below 10-day low",
    returns: "75.2%",
    sharpe: "1.42",
    maxDrawdown: "-12.5%",
    winRate: "68%",
    status: "completed"
  },
  {
    name: "Mean Reversion",
    description: "Buy oversold conditions (RSI < 30), sell overbought (RSI > 70)",
    returns: "32.1%",
    sharpe: "0.89",
    maxDrawdown: "-18.2%",
    winRate: "45%",
    status: "completed"
  },
  {
    name: "Moving Average Crossover",
    description: "Buy when 50-day MA crosses above 200-day MA",
    returns: "28.5%",
    sharpe: "0.76",
    maxDrawdown: "-15.8%",
    winRate: "52%",
    status: "running"
  }
]

export default function Backtesting() {
  const [isRunning, setIsRunning] = useState(false)

  const runBacktest = () => {
    setIsRunning(true)
    setTimeout(() => setIsRunning(false), 3000)
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Strategy Backtesting</h1>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Tabs defaultValue="builder" className="w-full">
          <TabsList>
            <TabsTrigger value="builder">Strategy Builder</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="library">Strategy Library</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Build Your Strategy</CardTitle>
                <CardDescription>Define your trading strategy parameters for backtesting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="strategy-name">Strategy Name</Label>
                    <Input id="strategy-name" placeholder="My Custom Strategy" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="symbol">Symbol/Market</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select market" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spy">SPY (S&P 500)</SelectItem>
                        <SelectItem value="qqq">QQQ (NASDAQ)</SelectItem>
                        <SelectItem value="aapl">AAPL</SelectItem>
                        <SelectItem value="tsla">TSLA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" defaultValue="2023-01-01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" defaultValue="2023-12-31" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initial-capital">Initial Capital</Label>
                    <Input id="initial-capital" type="number" defaultValue="10000" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Entry Conditions</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Technical Indicator</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select indicator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sma">Simple Moving Average</SelectItem>
                          <SelectItem value="ema">Exponential Moving Average</SelectItem>
                          <SelectItem value="rsi">RSI</SelectItem>
                          <SelectItem value="macd">MACD</SelectItem>
                          <SelectItem value="bollinger">Bollinger Bands</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Condition</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="above">Price above indicator</SelectItem>
                          <SelectItem value="below">Price below indicator</SelectItem>
                          <SelectItem value="crossover">Crossover above</SelectItem>
                          <SelectItem value="crossunder">Crossover below</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Exit Conditions</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Stop Loss %</Label>
                      <Input type="number" placeholder="5" />
                    </div>
                    <div className="space-y-2">
                      <Label>Take Profit %</Label>
                      <Input type="number" placeholder="10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Hold Days</Label>
                      <Input type="number" placeholder="30" />
                    </div>
                  </div>
                </div>

                <Button onClick={runBacktest} disabled={isRunning} className="w-full">
                  <Play className="mr-2 h-4 w-4" />
                  {isRunning ? "Running Backtest..." : "Run Backtest"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Return</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+75.2%</div>
                  <p className="text-xs text-muted-foreground">vs 35% benchmark</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.42</div>
                  <p className="text-xs text-muted-foreground">Risk-adjusted return</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">-12.5%</div>
                  <p className="text-xs text-muted-foreground">Largest peak-to-trough</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-xs text-muted-foreground">142 wins / 208 trades</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Strategy Performance vs Benchmark</CardTitle>
                <CardDescription>Cumulative returns over the backtesting period</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={backtestResults}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [`$${value}`, name === 'value' ? 'Strategy' : 'Benchmark']} />
                    <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} name="Strategy" />
                    <Line type="monotone" dataKey="benchmark" stroke="#6b7280" strokeWidth={2} name="Benchmark" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trade Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Trades:</span>
                      <span>208</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Winning Trades:</span>
                      <span className="text-green-600">142 (68%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Losing Trades:</span>
                      <span className="text-red-600">66 (32%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Average Win:</span>
                      <span>$285</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Average Loss:</span>
                      <span>-$142</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Profit Factor:</span>
                      <span>2.01</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Average Hold Time:</span>
                      <span>8.5 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Best Trade:</span>
                      <span className="text-green-600">+$1,250</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="library" className="space-y-4">
            <div className="space-y-4">
              {strategies.map((strategy, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{strategy.name}</CardTitle>
                        <CardDescription>{strategy.description}</CardDescription>
                      </div>
                      <Badge variant={strategy.status === "completed" ? "default" : "secondary"}>
                        {strategy.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{strategy.returns}</div>
                        <div className="text-sm text-muted-foreground">Total Return</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{strategy.sharpe}</div>
                        <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-600">{strategy.maxDrawdown}</div>
                        <div className="text-sm text-muted-foreground">Max Drawdown</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{strategy.winRate}</div>
                        <div className="text-sm text-muted-foreground">Win Rate</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Clone Strategy</Button>
                      <Button variant="outline" size="sm">Export</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  )
}
