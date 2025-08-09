"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, TrendingUp, Users, MessageSquare, ThumbsUp, Star } from 'lucide-react'

const leaderboard = [
  { rank: 1, name: "Alex Chen", returns: "127.5%", trades: 89, winRate: "78%", avatar: "AC" },
  { rank: 2, name: "Sarah Johnson", returns: "98.2%", trades: 156, winRate: "72%", avatar: "SJ" },
  { rank: 3, name: "Mike Rodriguez", returns: "85.7%", trades: 203, winRate: "68%", avatar: "MR" },
  { rank: 4, name: "Emma Wilson", returns: "79.3%", trades: 134, winRate: "71%", avatar: "EW" },
  { rank: 5, name: "John Doe", returns: "75.2%", trades: 98, winRate: "65%", avatar: "JD" },
]

const discussions = [
  {
    id: 1,
    title: "NVDA earnings play - thoughts?",
    author: "TechTrader99",
    replies: 23,
    likes: 45,
    time: "2 hours ago",
    preview: "Looking at NVDA's upcoming earnings. Historical volatility suggests..."
  },
  {
    id: 2,
    title: "Best momentum indicators for swing trading?",
    author: "SwingMaster",
    replies: 18,
    likes: 32,
    time: "4 hours ago",
    preview: "I've been experimenting with different momentum indicators..."
  },
  {
    id: 3,
    title: "Market correction incoming?",
    author: "BearishBull",
    replies: 67,
    likes: 89,
    time: "6 hours ago",
    preview: "Several technical indicators are flashing warning signs..."
  }
]

const strategies = [
  {
    name: "Momentum Breakout Pro",
    author: "Alex Chen",
    returns: "45.2%",
    followers: 234,
    rating: 4.8,
    description: "High-frequency momentum strategy focusing on breakout patterns"
  },
  {
    name: "Value Swing Trader",
    author: "Sarah Johnson", 
    returns: "32.1%",
    followers: 189,
    rating: 4.6,
    description: "Combines value analysis with swing trading techniques"
  },
  {
    name: "Tech Sector Rotation",
    author: "Mike Rodriguez",
    returns: "28.7%",
    followers: 156,
    rating: 4.4,
    description: "Sector rotation strategy focused on technology stocks"
  }
]

export default function Community() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Community</h1>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Tabs defaultValue="leaderboard" className="w-full">
          <TabsList>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="strategies">Shared Strategies</TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="space-y-4">
            {/* Community Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Traders</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">+12% this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">#5</div>
                  <p className="text-xs text-muted-foreground">Top 1% this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Community Return</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+23.4%</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Strategies Shared</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Leaderboard</CardTitle>
                <CardDescription>Top performing traders this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((trader) => (
                    <div key={trader.rank} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {trader.rank <= 3 && (
                            <Trophy className={`h-5 w-5 ${
                              trader.rank === 1 ? 'text-yellow-500' : 
                              trader.rank === 2 ? 'text-gray-400' : 
                              'text-amber-600'
                            }`} />
                          )}
                          <span className="font-bold text-lg">#{trader.rank}</span>
                        </div>
                        <Avatar>
                          <AvatarFallback>{trader.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{trader.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {trader.trades} trades • {trader.winRate} win rate
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">+{trader.returns}</div>
                          <div className="text-sm text-muted-foreground">30-day return</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Follow
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trading Discussions</CardTitle>
                <CardDescription>Join the conversation with fellow traders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium hover:text-primary">{discussion.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{discussion.preview}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>by {discussion.author}</span>
                            <span>{discussion.time}</span>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{discussion.replies}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{discussion.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">Start New Discussion</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Community Strategies</CardTitle>
                <CardDescription>Discover and follow successful trading strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {strategies.map((strategy, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{strategy.name}</CardTitle>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{strategy.rating}</span>
                          </div>
                        </div>
                        <CardDescription>by {strategy.author}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Returns:</span>
                            <span className="text-sm font-medium text-green-600">+{strategy.returns}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Followers:</span>
                            <span className="text-sm font-medium">{strategy.followers}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="flex-1">Follow</Button>
                          <Button size="sm" variant="outline" className="flex-1">Copy</Button>
                        </div>
                      </CardContent>
                    </Card>
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
