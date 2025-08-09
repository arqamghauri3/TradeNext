"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingUp, TrendingDown, Volume2, Maximize2, Settings, Play, Pause, RotateCcw, Monitor, Minus, Triangle, Square, Circle, Type, Ruler, Target, Zap, BarChart3, Activity, PenTool, MousePointer, Move, Trash2, Copy, Eye, EyeOff, Lock, Unlock, Palette, ChevronRight, ChevronDown } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

declare global {
  interface Window {
    TradingView: any;
  }
}

const symbols = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "NVDA", name: "NVIDIA Corp." },
  { symbol: "MSFT", name: "Microsoft Corp." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "SPY", name: "SPDR S&P 500 ETF" },
  { symbol: "QQQ", name: "Invesco QQQ Trust" },
  { symbol: "BTC", name: "Bitcoin", exchange: "BINANCE:BTCUSDT" },
  { symbol: "ETH", name: "Ethereum", exchange: "BINANCE:ETHUSDT" }
]

const intervals = [
  { value: "1", label: "1m" },
  { value: "5", label: "5m" },
  { value: "15", label: "15m" },
  { value: "60", label: "1h" },
  { value: "240", label: "4h" },
  { value: "1D", label: "1D" },
  { value: "1W", label: "1W" }
]

const drawingTools = [
  {
    category: "Lines & Trends",
    tools: [
      { id: "trend_line", name: "Trend Line", icon: Minus, description: "Draw trend lines" },
      { id: "horizontal_line", name: "Horizontal Line", icon: Minus, description: "Horizontal support/resistance" },
      { id: "vertical_line", name: "Vertical Line", icon: Minus, description: "Vertical time line" },
      { id: "ray", name: "Ray", icon: Minus, description: "Infinite line from point" },
      { id: "extended_line", name: "Extended Line", icon: Minus, description: "Line extended both ways" },
      { id: "parallel_channel", name: "Parallel Channel", icon: Minus, description: "Parallel trend lines" }
    ]
  },
  {
    category: "Fibonacci Tools",
    tools: [
      { id: "fib_retracement", name: "Fibonacci Retracement", icon: Target, description: "Fib retracement levels" },
      { id: "fib_extension", name: "Fibonacci Extension", icon: Target, description: "Fib extension levels" },
      { id: "fib_fan", name: "Fibonacci Fan", icon: Target, description: "Fib fan lines" },
      { id: "fib_arc", name: "Fibonacci Arc", icon: Target, description: "Fib arc curves" },
      { id: "fib_time_zone", name: "Fibonacci Time Zone", icon: Target, description: "Fib time projections" }
    ]
  },
  {
    category: "Geometric Shapes",
    tools: [
      { id: "rectangle", name: "Rectangle", icon: Square, description: "Draw rectangles" },
      { id: "circle", name: "Circle", icon: Circle, description: "Draw circles" },
      { id: "ellipse", name: "Ellipse", icon: Circle, description: "Draw ellipses" },
      { id: "triangle", name: "Triangle", icon: Triangle, description: "Draw triangles" },
      { id: "polygon", name: "Polygon", icon: Triangle, description: "Draw polygons" }
    ]
  },
  {
    category: "Gann Tools",
    tools: [
      { id: "gann_line", name: "Gann Line", icon: Ruler, description: "Gann angle lines" },
      { id: "gann_fan", name: "Gann Fan", icon: Ruler, description: "Gann fan lines" },
      { id: "gann_box", name: "Gann Box", icon: Square, description: "Gann square" }
    ]
  },
  {
    category: "Annotations",
    tools: [
      { id: "text", name: "Text", icon: Type, description: "Add text labels" },
      { id: "note", name: "Note", icon: Type, description: "Add notes" },
      { id: "arrow_up", name: "Arrow Up", icon: TrendingUp, description: "Bullish arrow" },
      { id: "arrow_down", name: "Arrow Down", icon: TrendingDown, description: "Bearish arrow" },
      { id: "flag", name: "Flag", icon: Target, description: "Price flag" }
    ]
  },
  {
    category: "Patterns",
    tools: [
      { id: "head_shoulders", name: "Head & Shoulders", icon: Activity, description: "H&S pattern" },
      { id: "double_top", name: "Double Top", icon: Activity, description: "Double top pattern" },
      { id: "double_bottom", name: "Double Bottom", icon: Activity, description: "Double bottom pattern" },
      { id: "wedge", name: "Wedge", icon: Triangle, description: "Wedge pattern" }
    ]
  }
]

const technicalIndicators = [
  {
    category: "Trend Indicators",
    indicators: [
      { id: "sma", name: "Simple Moving Average", params: ["Period: 20"] },
      { id: "ema", name: "Exponential Moving Average", params: ["Period: 20"] },
      { id: "bollinger", name: "Bollinger Bands", params: ["Period: 20", "StdDev: 2"] },
      { id: "ichimoku", name: "Ichimoku Cloud", params: ["9, 26, 52"] },
      { id: "parabolic_sar", name: "Parabolic SAR", params: ["Step: 0.02", "Max: 0.2"] }
    ]
  },
  {
    category: "Momentum Indicators",
    indicators: [
      { id: "rsi", name: "RSI", params: ["Period: 14"] },
      { id: "macd", name: "MACD", params: ["12, 26, 9"] },
      { id: "stochastic", name: "Stochastic", params: ["%K: 14", "%D: 3"] },
      { id: "williams_r", name: "Williams %R", params: ["Period: 14"] },
      { id: "cci", name: "CCI", params: ["Period: 20"] }
    ]
  },
  {
    category: "Volume Indicators",
    indicators: [
      { id: "volume", name: "Volume", params: [] },
      { id: "volume_profile", name: "Volume Profile", params: ["Rows: 24"] },
      { id: "obv", name: "On Balance Volume", params: [] },
      { id: "vwap", name: "VWAP", params: [] }
    ]
  }
]

export default function Charts() {
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL")
  const [selectedInterval, setSelectedInterval] = useState("60")
  const [isRealTime, setIsRealTime] = useState(true)
  const [theme, setTheme] = useState("dark")
  const [chartStyle, setChartStyle] = useState("1")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showToolsPanel, setShowToolsPanel] = useState(true)
  const [selectedTool, setSelectedTool] = useState("cursor")
  const [lineColor, setLineColor] = useState("#2196F3")
  const [lineWidth, setLineWidth] = useState([2])
  const [lineStyle, setLineStyle] = useState("solid")
  const [openCategories, setOpenCategories] = useState<string[]>(["Lines & Trends", "Trend Indicators"])
  const [isChartReady, setIsChartReady] = useState(false)
  
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<any>(null)
  const tickerWidgetRef = useRef<HTMLDivElement>(null)

  // Load TradingView script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = () => {
      initializeChart()
    }
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  // Initialize main chart
  const initializeChart = () => {
    if (typeof window !== 'undefined' && window.TradingView && chartContainerRef.current) {
      const selectedSymbolData = symbols.find(s => s.symbol === selectedSymbol)
      const symbolString = selectedSymbolData?.exchange || `NASDAQ:${selectedSymbol}`
    
      try {
        widgetRef.current = new window.TradingView.widget({
          width: "100%",
          height: isFullscreen ? window.innerHeight - 100 : 600,
          symbol: symbolString,
          interval: selectedInterval,
          timezone: "Etc/UTC",
          theme: theme,
          style: chartStyle,
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          container_id: "tradingview_chart",
          studies: [
            "Volume@tv-basicstudies"
          ],
          overrides: {
            "paneProperties.background": theme === "dark" ? "#1a1a1a" : "#ffffff",
            "paneProperties.vertGridProperties.color": theme === "dark" ? "#2a2a2a" : "#e1e1e1",
            "paneProperties.horzGridProperties.color": theme === "dark" ? "#2a2a2a" : "#e1e1e1",
            "symbolWatermarkProperties.transparency": 90,
            "scalesProperties.textColor": theme === "dark" ? "#ffffff" : "#000000",
          },
          disabled_features: [
            "use_localstorage_for_settings"
          ],
          enabled_features: [
            "study_templates",
            "side_toolbar_in_fullscreen_mode",
            "header_symbol_search",
            "header_resolutions",
            "header_chart_type",
            "header_settings",
            "header_indicators",
            "header_compare",
            "header_undo_redo",
            "header_screenshot",
            "header_fullscreen_button",
            "left_toolbar",
            "control_bar",
            "timeframes_toolbar"
          ],
          // Correct way to set up the callback
          onChartReady: function() {
            console.log("Chart is ready for drawing tools")
            setIsChartReady(true)
          
            const chart = widgetRef.current.chart()
            if (chart) {
              console.log("Chart API is available")
            
              // Additional chart setup can go here
              try {
                // Example: Set up chart event listeners
                chart.onDataLoaded().subscribe(null, () => {
                  console.log("Chart data loaded")
                })
              } catch (error) {
                console.log("Chart event setup:", error)
              }
            }
          }
        })

      } catch (error) {
        console.error("Error initializing TradingView widget:", error)
        // Fallback: set chart ready after a delay
        setTimeout(() => {
          setIsChartReady(true)
        }, 2000)
      }
    }
  }

  // Update chart when symbol or interval changes
  useEffect(() => {
    if (widgetRef.current && widgetRef.current.chart && isChartReady) {
      const selectedSymbolData = symbols.find(s => s.symbol === selectedSymbol)
      const symbolString = selectedSymbolData?.exchange || `NASDAQ:${selectedSymbol}`
      
      widgetRef.current.chart().setSymbol(symbolString, () => {
        console.log("Symbol changed to", symbolString)
      })
    } else if (!isChartReady) {
      setTimeout(initializeChart, 100)
    }
  }, [selectedSymbol, isChartReady])

  useEffect(() => {
    if (widgetRef.current && widgetRef.current.chart && isChartReady) {
      widgetRef.current.chart().setResolution(selectedInterval, () => {
        console.log("Interval changed to", selectedInterval)
      })
    }
  }, [selectedInterval, isChartReady])

  // Initialize ticker widget
  useEffect(() => {
    if (tickerWidgetRef.current) {
      // Clear previous content
      tickerWidgetRef.current.innerHTML = ''
      
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
      script.async = true
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
          { proName: "FOREXCOM:NSXUSD", title: "US 100" },
          { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
          { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
          { proName: "BITSTAMP:ETHUSD", title: "Ethereum" }
        ],
        showSymbolLogo: true,
        colorTheme: theme,
        isTransparent: false,
        displayMode: "adaptive",
        locale: "en"
      })
      tickerWidgetRef.current.appendChild(script)
    }
  }, [theme])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    setIsChartReady(false)
    setTimeout(() => {
      if (widgetRef.current) {
        widgetRef.current.remove()
        initializeChart()
      }
    }, 100)
  }

  const selectDrawingTool = (toolId: string) => {
    setSelectedTool(toolId)
    
    if (widgetRef.current && widgetRef.current.chart && isChartReady) {
      const chart = widgetRef.current.chart()
      
      // Map our tool IDs to TradingView tool names
      const toolMapping: { [key: string]: string } = {
        'cursor': 'cursor',
        'crosshair': 'crosshair',
        'trend_line': 'LineToolTrendLine',
        'horizontal_line': 'LineToolHorzLine',
        'vertical_line': 'LineToolVertLine',
        'ray': 'LineToolRay',
        'extended_line': 'LineToolExtended',
        'parallel_channel': 'LineToolParallelChannel',
        'fib_retracement': 'LineToolFibRetracement',
        'fib_extension': 'LineToolFibExtension',
        'fib_fan': 'LineToolFibFan',
        'fib_arc': 'LineToolFibArc',
        'fib_time_zone': 'LineToolFibTimeZone',
        'rectangle': 'LineToolRectangle',
        'circle': 'LineToolCircle',
        'ellipse': 'LineToolEllipse',
        'triangle': 'LineToolTriangle',
        'polygon': 'LineToolPolyline',
        'gann_line': 'LineToolGannLine',
        'gann_fan': 'LineToolGannFan',
        'gann_box': 'LineToolGannBox',
        'text': 'LineToolText',
        'note': 'LineToolNote',
        'arrow_up': 'LineToolArrowUp',
        'arrow_down': 'LineToolArrowDown',
        'flag': 'LineToolFlag'
      }
      
      const tradingViewTool = toolMapping[toolId]
      if (tradingViewTool) {
        try {
          console.log(`Activating drawing tool: ${tradingViewTool}`)
          // Note: TradingView's drawing tools are typically activated through the UI
          // The actual API for programmatic tool activation may vary
        } catch (error) {
          console.log("Drawing tool activation:", error)
        }
      }
    }
    
    console.log("Selected drawing tool:", toolId)
  }

  const addIndicator = (indicatorId: string) => {
    if (widgetRef.current && widgetRef.current.chart && isChartReady) {
      const chart = widgetRef.current.chart()
      
      // Map indicator IDs to TradingView study names
      const indicatorMapping: { [key: string]: string } = {
        'sma': 'Moving Average',
        'ema': 'Moving Average Exponential',
        'bollinger': 'Bollinger Bands',
        'ichimoku': 'Ichimoku Cloud',
        'parabolic_sar': 'Parabolic SAR',
        'rsi': 'Relative Strength Index',
        'macd': 'MACD',
        'stochastic': 'Stochastic',
        'williams_r': 'Williams %R',
        'cci': 'Commodity Channel Index',
        'volume': 'Volume',
        'volume_profile': 'Volume Profile',
        'obv': 'On Balance Volume',
        'vwap': 'VWAP'
      }
      
      const studyName = indicatorMapping[indicatorId]
      if (studyName) {
        try {
          chart.createStudy(studyName, false, false)
          console.log(`Added indicator: ${studyName}`)
        } catch (error) {
          console.log("Error adding indicator:", error)
        }
      }
    }
  }

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const selectedSymbolData = symbols.find(s => s.symbol === selectedSymbol)

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">TradingView Charts</h1>
        
        {/* Chart Controls */}
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant={showToolsPanel ? "default" : "outline"}
            size="sm"
            onClick={() => setShowToolsPanel(!showToolsPanel)}
          >
            <PenTool className="h-4 w-4 mr-2" />
            Tools
          </Button>

          <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {symbols.map(symbol => (
                <SelectItem key={symbol.symbol} value={symbol.symbol}>
                  {symbol.symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedInterval} onValueChange={setSelectedInterval}>
            <SelectTrigger className="w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {intervals.map(interval => (
                <SelectItem key={interval.value} value={interval.value}>
                  {interval.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant={isRealTime ? "default" : "outline"}
            size="sm"
            onClick={() => setIsRealTime(!isRealTime)}
          >
            {isRealTime ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isRealTime ? "Live" : "Paused"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
          >
            <Monitor className="h-4 w-4" />
            {isFullscreen ? "Exit" : "Fullscreen"}
          </Button>
        </div>
      </header>

      <div className={`flex flex-1 ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
        {/* Drawing Tools Sidebar */}
        {showToolsPanel && (
          <div className="w-80 border-r bg-background flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold mb-2">Drawing Tools & Indicators</h3>
              <p className="text-sm text-muted-foreground">Professional charting tools</p>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {/* Tool Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Selection Tools</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={selectedTool === "cursor" ? "default" : "outline"}
                      size="sm"
                      onClick={() => selectDrawingTool("cursor")}
                      className="justify-start"
                    >
                      <MousePointer className="h-4 w-4 mr-2" />
                      Cursor
                    </Button>
                    <Button
                      variant={selectedTool === "crosshair" ? "default" : "outline"}
                      size="sm"
                      onClick={() => selectDrawingTool("crosshair")}
                      className="justify-start"
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Crosshair
                    </Button>
                  </div>
                </div>

                {/* Drawing Tools */}
                {drawingTools.map((category) => (
                  <Collapsible
                    key={category.category}
                    open={openCategories.includes(category.category)}
                    onOpenChange={() => toggleCategory(category.category)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-2">
                        <span className="font-medium">{category.category}</span>
                        {openCategories.includes(category.category) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1">
                      {category.tools.map((tool) => (
                        <Button
                          key={tool.id}
                          variant={selectedTool === tool.id ? "default" : "ghost"}
                          size="sm"
                          onClick={() => selectDrawingTool(tool.id)}
                          className="w-full justify-start text-left"
                          title={tool.description}
                        >
                          <tool.icon className="h-4 w-4 mr-2" />
                          <span className="truncate">{tool.name}</span>
                        </Button>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}

                {/* Line Properties */}
                <div className="space-y-3 pt-4 border-t">
                  <Label className="text-sm font-medium">Line Properties</Label>
                  
                  <div className="space-y-2">
                    <Label className="text-xs">Color</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={lineColor}
                        onChange={(e) => setLineColor(e.target.value)}
                        className="w-8 h-8 rounded border"
                      />
                      <Input
                        value={lineColor}
                        onChange={(e) => setLineColor(e.target.value)}
                        className="flex-1 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Width: {lineWidth[0]}px</Label>
                    <Slider
                      value={lineWidth}
                      onValueChange={setLineWidth}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Style</Label>
                    <Select value={lineStyle} onValueChange={setLineStyle}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solid">Solid</SelectItem>
                        <SelectItem value="dashed">Dashed</SelectItem>
                        <SelectItem value="dotted">Dotted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Technical Indicators */}
                {technicalIndicators.map((category) => (
                  <Collapsible
                    key={category.category}
                    open={openCategories.includes(category.category)}
                    onOpenChange={() => toggleCategory(category.category)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-2">
                        <span className="font-medium">{category.category}</span>
                        {openCategories.includes(category.category) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1">
                      {category.indicators.map((indicator) => (
                        <div key={indicator.id} className="space-y-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addIndicator(indicator.id)}
                            className="w-full justify-start text-left"
                          >
                            <BarChart3 className="h-4 w-4 mr-2" />
                            <div className="flex-1">
                              <div className="truncate">{indicator.name}</div>
                              {indicator.params.length > 0 && (
                                <div className="text-xs text-muted-foreground">
                                  {indicator.params.join(", ")}
                                </div>
                              )}
                            </div>
                          </Button>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}

                {/* Drawing Management */}
                <div className="space-y-2 pt-4 border-t">
                  <Label className="text-sm font-medium">Drawing Management</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                    <Button variant="outline" size="sm">
                      <Lock className="h-4 w-4 mr-1" />
                      Lock
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Hide
                    </Button>
                  </div>
                </div>

                {/* Chart Status */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isChartReady ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <span className="text-xs text-muted-foreground">
                      {isChartReady ? 'Chart Ready' : 'Loading...'}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Main Chart Area */}
        <div className="flex-1 flex flex-col gap-4 p-4">
          {/* Market Ticker */}
          <Card>
            <CardContent className="p-0">
              <div ref={tickerWidgetRef} className="h-16" />
            </CardContent>
          </Card>

          {/* Price Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedSymbol}</h2>
                    <p className="text-sm text-muted-foreground">{selectedSymbolData?.name}</p>
                  </div>
                  <Badge variant="default">LIVE</Badge>
                </div>
                
                {/* Chart Style Controls */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="candles" className="text-sm">Chart Style:</Label>
                    <Select value={chartStyle} onValueChange={setChartStyle}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Candles</SelectItem>
                        <SelectItem value="2">Hollow Candles</SelectItem>
                        <SelectItem value="3">Line</SelectItem>
                        <SelectItem value="4">Area</SelectItem>
                        <SelectItem value="5">Bars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main TradingView Chart */}
          <Card className="flex-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedSymbol} Professional Chart</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="default">TradingView</Badge>
                    <span className="text-sm text-muted-foreground">
                      Advanced charting with professional tools and indicators
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                    <Maximize2 className="h-4 w-4 mr-2" />
                    {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <div 
                ref={chartContainerRef}
                id="tradingview_chart"
                style={{ 
                  height: isFullscreen ? 'calc(100vh - 200px)' : '600px',
                  width: '100%'
                }}
              />
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">
                <p className="mb-2"><strong>How to use drawing tools:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Use the TradingView toolbar at the top of the chart to access drawing tools</li>
                  <li>Click the drawing tool icon in the chart toolbar, then draw on the chart</li>
                  <li>The sidebar tools are for reference - use the native TradingView interface</li>
                  <li>Right-click on drawings to modify properties or delete them</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Chart Actions */}
          {!isFullscreen && (
            <div className="flex gap-2">
              <Button>Add to Watchlist</Button>
              <Button variant="outline">Set Alert</Button>
              <Button variant="outline">Trade {selectedSymbol}</Button>
              <Button variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Chart
              </Button>
            </div>
          )}
        </div>
      </div>
    </SidebarInset>
  )
}
