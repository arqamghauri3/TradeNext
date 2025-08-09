"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, TrendingDown, Target, DollarSign, Percent } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const portfolioAllocation = [
  { name: "Technology", value: 35, color: "#3b82f6" },
  { name: "Healthcare", value: 20, color: "#10b981" },
  { name: "Finance", value: 15, color: "#f59e0b" },
  { name: "Consumer", value: 12, color: "#ef4444" },
  { name: "Energy", value: 10, color: "#8b5cf6" },
  { name: "Cash", value: 8, color: "#6b7280" },
]

const riskMetrics = [
  { metric: "Portfolio Beta", value: 1.25, benchmark: 1.0, status: "high" },
  { metric: "Value at Risk (1%)", value: 2850, benchmark: 2000, status: "high" },
  { metric: "Sharpe Ratio", value: 1.42, benchmark: 1.0, status: "good" },
  { metric: "Max Drawdown", value: 12.5, benchmark: 15.0, status: "good" },
]

const positions = [
  { symbol: "AAPL", allocation: 15, risk: "Low", beta: 1.2, var: 450 },
  { symbol: "TSLA", allocation: 12, risk: "High", beta: 2.1, var: 680 },
  { symbol: "MSFT", allocation: 10, risk: "Medium", beta: 0.9, var: 320 },
  { symbol: "NVDA", allocation: 8, risk: "High", beta: 1.8, var: 520 },
  { symbol: "GOOGL", allocation: 7, risk: "Medium", beta: 1.1, var: 380 },
]

export default function RiskManagement() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Risk Management</h1>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Risk Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">Medium</div>
              <Progress value={65} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">65/100 risk level</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Beta</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.25</div>
              <p className="text-xs text-muted-foreground">25% more volatile than market</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Value at Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">$2,850</div>
              <p className="text-xs text-muted-foreground">1% daily VaR</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Correlation Risk</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">High</div>
              <p className="text-xs text-muted-foreground">Tech sector concentration</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Portfolio Allocation */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
              <CardDescription>Sector diversification breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={portfolioAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {portfolioAllocation.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Metrics</CardTitle>
              <CardDescription>Key risk indicators vs benchmarks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      <Badge variant={metric.status === "good" ? "default" : "destructive"}>
                        {metric.status === "good" ? "Good" : "High Risk"}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Current: {typeof metric.value === 'number' && metric.value < 10 ? metric.value : `$${metric.value}`}</span>
                      <span className="text-muted-foreground">
                        Target: {typeof metric.benchmark === 'number' && metric.benchmark < 10 ? metric.benchmark : `$${metric.benchmark}`}
                      </span>
                    </div>
                    <Progress 
                      value={metric.status === "good" ? 75 : 85} 
                      className={metric.status === "good" ? "" : "bg-red-100"}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Position Risk Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Position Risk Analysis</CardTitle>
            <CardDescription>Individual position risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {positions.map((position, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-medium">{position.symbol}</div>
                      <div className="text-sm text-muted-foreground">{position.allocation}% of portfolio</div>
                    </div>
                    <Badge 
                      variant={
                        position.risk === "Low" ? "default" : 
                        position.risk === "Medium" ? "secondary" : 
                        "destructive"
                      }
                    >
                      {position.risk} Risk
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Beta: </span>
                      <span className="font-medium">{position.beta}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">VaR: </span>
                      <span className="font-medium">${position.var}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Adjust
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Management Recommendations</CardTitle>
            <CardDescription>AI-powered suggestions to optimize your risk profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-600">High Concentration Risk</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your tech allocation (35%) exceeds recommended limits. Consider reducing TSLA position by 3-5%.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-600">Correlation Warning</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      AAPL and MSFT show high correlation (0.85). Consider diversifying into other sectors.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-2">
                  <Target className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-600">Hedging Opportunity</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consider adding defensive positions or VIX hedges to reduce portfolio volatility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button>Generate Risk Report</Button>
          <Button variant="outline">Set Risk Limits</Button>
          <Button variant="outline">Rebalance Portfolio</Button>
          <Button variant="outline">Export Analysis</Button>
        </div>
      </div>
    </SidebarInset>
  )
}
