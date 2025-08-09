"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, BarChart3, Activity, DollarSign } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const marketData = [
  { time: "09:30", spy: 485.20, qqq: 395.80, vix: 18.5 },
  { time: "10:00", spy: 486.15, qqq: 396.45, vix: 17.8 },
  { time: "10:30", spy: 485.90, qqq: 395.95, vix: 18.2 },
  { time: "11:00", spy: 487.30, qqq: 397.20, vix: 17.1 },
  { time: "11:30", spy: 488.75, qqq: 398.60, vix: 16.5 },
  { time: "12:00", spy: 487.95, qqq: 397.85, vix: 17.0 },
]

const topMovers = [
  { symbol: "NVDA", price: 875.50, change: 45.20, changePercent: 5.45, volume: "89.2M" },
  { symbol: "TSLA", price: 245.80, change: -12.30, changePercent: -4.76, volume: "67.8M" },
  { symbol: "AAPL", price: 175.50, change: 3.25, changePercent: 1.89, volume: "45.6M" },
  { symbol: "MSFT", price: 380.25, change: -5.80, changePercent: -1.50, volume: "32.1M" },
  { symbol: "GOOGL", price: 142.75, change: 2.15, changePercent: 1.53, volume: "28.9M" },
]

const sectors = [
  { name: "Technology", change: 2.34, color: "text-green-600" },
  { name: "Healthcare", change: 1.12, color: "text-green-600" },
  { name: "Finance", change: -0.85, color: "text-red-600" },
  { name: "Energy", change: -1.45, color: "text-red-600" },
  { name: "Consumer", change: 0.67, color: "text-green-600" },
  { name: "Utilities", change: -0.23, color: "text-red-600" },
]

const newsItems = [
  {
    title: "Fed Signals Potential Rate Cut in Q2",
    time: "2 hours ago",
    impact: "Bullish",
    summary: "Federal Reserve hints at dovish policy shift amid cooling inflation data"
  },
  {
    title: "NVDA Beats Earnings Expectations",
    time: "4 hours ago", 
    impact: "Bullish",
    summary: "Chip giant reports record revenue driven by AI demand"
  },
  {
    title: "Oil Prices Surge on Supply Concerns",
    time: "6 hours ago",
    impact: "Mixed",
    summary: "Geopolitical tensions drive energy sector volatility"
  }
]

export default function MarketAnalysis() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Market Analysis</h1>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Market Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">S&P 500</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,875.20</div>
              <p className="text-xs text-green-600">+1.25% (+15.80)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">NASDAQ</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15,420.85</div>
              <p className="text-xs text-green-600">+2.10% (+318.45)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">VIX</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">17.0</div>
              <p className="text-xs text-red-600">-5.5% (-1.0)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.8B</div>
              <p className="text-xs text-muted-foreground">Above average</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="charts" className="w-full">
          <TabsList>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="movers">Top Movers</TabsTrigger>
            <TabsTrigger value="sectors">Sectors</TabsTrigger>
            <TabsTrigger value="news">Market News</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Intraday Market Performance</CardTitle>
                <CardDescription>Real-time market indices and volatility</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={marketData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="spy" stroke="#22c55e" strokeWidth={2} name="SPY" />
                    <Line type="monotone" dataKey="qqq" stroke="#3b82f6" strokeWidth={2} name="QQQ" />
                    <Line type="monotone" dataKey="vix" stroke="#ef4444" strokeWidth={2} name="VIX" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="movers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Movers</CardTitle>
                <CardDescription>Most active stocks by volume and price movement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topMovers.map((stock, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-medium text-lg">{stock.symbol}</div>
                          <div className="text-sm text-muted-foreground">Vol: {stock.volume}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">${stock.price}</div>
                          <div className={`text-sm flex items-center gap-1 ${
                            stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stock.change >= 0 ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent}%)
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Trade
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sector Performance</CardTitle>
                <CardDescription>Today's sector rotation and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sectors.map((sector, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="font-medium">{sector.name}</div>
                      <div className={`flex items-center gap-2 ${sector.color}`}>
                        {sector.change >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-medium">
                          {sector.change >= 0 ? '+' : ''}{sector.change}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market News</CardTitle>
                <CardDescription>Latest market-moving news and analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsItems.map((news, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{news.title}</h4>
                        <Badge variant={news.impact === "Bullish" ? "default" : news.impact === "Bearish" ? "destructive" : "secondary"}>
                          {news.impact}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{news.summary}</p>
                      <div className="text-xs text-muted-foreground">{news.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  )
}
