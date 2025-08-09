"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Bell, Plus, TrendingUp, TrendingDown, AlertTriangle, Check, X } from 'lucide-react'

const alerts = [
  {
    id: 1,
    symbol: "AAPL",
    type: "Price",
    condition: "Above $180",
    currentPrice: 175.50,
    targetPrice: 180,
    status: "active",
    created: "2024-01-15",
    triggered: false
  },
  {
    id: 2,
    symbol: "TSLA",
    type: "Volume",
    condition: "Volume > 50M",
    currentVolume: "32M",
    targetVolume: "50M",
    status: "active",
    created: "2024-01-14",
    triggered: false
  },
  {
    id: 3,
    symbol: "NVDA",
    type: "Technical",
    condition: "RSI < 30",
    currentRSI: 45,
    targetRSI: 30,
    status: "triggered",
    created: "2024-01-12",
    triggered: true,
    triggeredAt: "2024-01-16 09:30"
  },
  {
    id: 4,
    symbol: "MSFT",
    type: "Price",
    condition: "Below $350",
    currentPrice: 380.25,
    targetPrice: 350,
    status: "paused",
    created: "2024-01-10",
    triggered: false
  }
]

export default function Alerts() {
  const [isAddingAlert, setIsAddingAlert] = useState(false)

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Price Alerts</h1>
        <div className="ml-auto">
          <Dialog open={isAddingAlert} onOpenChange={setIsAddingAlert}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Alert
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Alert</DialogTitle>
                <DialogDescription>Set up a new price or technical alert</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="symbol">Symbol</Label>
                    <Input id="symbol" placeholder="AAPL" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alert-type">Alert Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price">Price Alert</SelectItem>
                        <SelectItem value="volume">Volume Alert</SelectItem>
                        <SelectItem value="technical">Technical Indicator</SelectItem>
                        <SelectItem value="news">News Alert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="above">Above</SelectItem>
                        <SelectItem value="below">Below</SelectItem>
                        <SelectItem value="crosses-above">Crosses Above</SelectItem>
                        <SelectItem value="crosses-below">Crosses Below</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target">Target Value</Label>
                    <Input id="target" type="number" placeholder="180.00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification">Notification Method</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="email" />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="push" defaultChecked />
                      <Label htmlFor="push">Push Notification</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms" />
                      <Label htmlFor="sms">SMS</Label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingAlert(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddingAlert(false)}>
                  Create Alert
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Alert Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Currently monitoring</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Triggered Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">3</div>
              <p className="text-xs text-muted-foreground">Alerts fired</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Close to Target</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <p className="text-xs text-muted-foreground">Within 5% of target</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">Actionable alerts</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
            <CardDescription>Your current price and technical alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {alert.status === "triggered" ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : alert.status === "active" ? (
                        <Bell className="h-5 w-5 text-blue-600" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400" />
                      )}
                      <div>
                        <div className="font-medium">{alert.symbol}</div>
                        <div className="text-sm text-muted-foreground">{alert.type} Alert</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{alert.condition}</div>
                      <div className="text-sm text-muted-foreground">
                        {alert.type === "Price" && `Current: $${alert.currentPrice}`}
                        {alert.type === "Volume" && `Current: ${alert.currentVolume}`}
                        {alert.type === "Technical" && `Current RSI: ${alert.currentRSI}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        alert.status === "active" ? "default" : 
                        alert.status === "triggered" ? "secondary" : 
                        "outline"
                      }
                    >
                      {alert.status}
                    </Badge>
                    {alert.triggered && (
                      <div className="text-sm text-muted-foreground">
                        Triggered: {alert.triggeredAt}
                      </div>
                    )}
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>Latest alert notifications and market updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium">NVDA RSI Alert Triggered</div>
                  <div className="text-sm text-muted-foreground">
                    RSI dropped below 30 (currently 28.5) - Potential oversold condition
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium">AAPL Approaching Target</div>
                  <div className="text-sm text-muted-foreground">
                    Price at $178.50, within 2% of your $180 target
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">4 hours ago</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <div className="font-medium">High Volume Alert</div>
                  <div className="text-sm text-muted-foreground">
                    TSLA volume spike detected - 45M shares traded (avg: 25M)
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">6 hours ago</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
