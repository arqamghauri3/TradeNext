"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, TrendingUp, TrendingDown, Calendar, DollarSign, Target } from 'lucide-react'

const journalEntries = [
  {
    id: 1,
    date: "2024-01-15",
    symbol: "AAPL",
    type: "BUY",
    quantity: 100,
    entryPrice: 175.50,
    exitPrice: 182.25,
    pnl: 675,
    strategy: "Momentum",
    notes: "Strong earnings beat, bought on breakout above resistance",
    emotion: "Confident",
    aiInsight: "Good entry timing. Consider taking partial profits at resistance levels."
  },
  {
    id: 2,
    date: "2024-01-12",
    symbol: "TSLA",
    type: "SELL",
    quantity: 50,
    entryPrice: 245.80,
    exitPrice: 238.50,
    pnl: -365,
    strategy: "Mean Reversion",
    notes: "Overextended move, expected pullback",
    emotion: "Anxious",
    aiInsight: "Entry was premature. Wait for clearer reversal signals next time."
  },
]

export default function TradeJournal() {
  const [isAddingTrade, setIsAddingTrade] = useState(false)

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Trade Journal</h1>
        <div className="ml-auto">
          <Dialog open={isAddingTrade} onOpenChange={setIsAddingTrade}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Trade
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Trade</DialogTitle>
                <DialogDescription>Record your trade details for analysis</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="symbol">Symbol</Label>
                    <Input id="symbol" placeholder="AAPL" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy">BUY</SelectItem>
                        <SelectItem value="sell">SELL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entry">Entry Price</Label>
                    <Input id="entry" type="number" placeholder="175.50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exit">Exit Price</Label>
                    <Input id="exit" type="number" placeholder="182.25" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="strategy">Strategy</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="momentum">Momentum</SelectItem>
                      <SelectItem value="mean-reversion">Mean Reversion</SelectItem>
                      <SelectItem value="breakout">Breakout</SelectItem>
                      <SelectItem value="swing">Swing Trading</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Trade Notes</Label>
                  <Textarea id="notes" placeholder="Describe your reasoning, market conditions, etc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emotion">Emotional State</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="How did you feel?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confident">Confident</SelectItem>
                      <SelectItem value="anxious">Anxious</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="excited">Excited</SelectItem>
                      <SelectItem value="fearful">Fearful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingTrade(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddingTrade(false)}>
                  Save Trade
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Tabs defaultValue="entries" className="w-full">
          <TabsList>
            <TabsTrigger value="entries">Trade Entries</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="entries" className="space-y-4">
            {journalEntries.map((entry) => (
              <Card key={entry.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{entry.symbol}</CardTitle>
                      <Badge variant={entry.type === "BUY" ? "default" : "secondary"}>
                        {entry.type}
                      </Badge>
                      <Badge variant="outline">{entry.strategy}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {entry.date}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Quantity:</span>
                        <span>{entry.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Entry Price:</span>
                        <span>${entry.entryPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Exit Price:</span>
                        <span>${entry.exitPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">P&L:</span>
                        <span className={entry.pnl >= 0 ? "text-green-600" : "text-red-600"}>
                          {entry.pnl >= 0 ? "+" : ""}${entry.pnl}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-muted-foreground">Notes:</span>
                        <p className="text-sm mt-1">{entry.notes}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Emotion:</span>
                        <Badge variant="outline" className="ml-2">{entry.emotion}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium text-blue-600">AI Insight:</span>
                        <p className="text-sm text-muted-foreground mt-1">{entry.aiInsight}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">65%</div>
                  <p className="text-xs text-muted-foreground">13 wins out of 20 trades</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Win</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$425</div>
                  <p className="text-xs text-muted-foreground">Average winning trade</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Loss</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">-$180</div>
                  <p className="text-xs text-muted-foreground">Average losing trade</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Strategy Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Momentum</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                      <span className="text-sm">75%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mean Reversion</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <span className="text-sm">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Breakout</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "68%" }}></div>
                      </div>
                      <span className="text-sm">68%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Behavioral Patterns</CardTitle>
                <CardDescription>AI analysis of your trading behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-green-600 mb-2">Strength: Discipline</h4>
                  <p className="text-sm text-muted-foreground">
                    You consistently follow your stop-loss rules, which has saved you from larger losses. 
                    Your risk management is above average.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-yellow-600 mb-2">Area for Improvement: Position Sizing</h4>
                  <p className="text-sm text-muted-foreground">
                    Your position sizes vary significantly. Consider using a consistent risk-based position sizing method 
                    to optimize your risk-reward ratio.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-blue-600 mb-2">Pattern: Emotional Trading</h4>
                  <p className="text-sm text-muted-foreground">
                    Trades marked as "Anxious" have a 35% win rate vs 72% for "Confident" trades. 
                    Consider meditation or breaks when feeling anxious.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  )
}
