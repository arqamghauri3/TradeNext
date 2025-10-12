export type Trade = {
  id: string;
  userId: string;
  symbol: string; // e.g. "AAPL"
  positionType: "long" | "short";
  entryPrice: number;
  exitPrice?: number; // optional if trade still open
  quantity: number;
  entryDate: string;
  exitDate?: string;
  pnl?: number; // profit or loss
  strategyId?: string;
  notes?: string;
  image?: string; // URLs of chart images
};

export const trade: Trade[] = [
  {
    id: "tr1",
    userId: "u1",
    symbol: "AAPL",
    positionType: "long",
    entryPrice: 150,
    exitPrice: 160,
    quantity: 10,
    entryDate: "2025-08-01T14:30:00Z",
    exitDate: "2025-08-05T14:30:00Z",
    pnl: 100,
    strategyId: "s1",
    notes: "Perfect breakout entry, scaled out at resistance",
    image: "https://example.com/screenshots/aapl-trade1.png",
  },
  {
    id: "tr2",
    userId: "u2",
    symbol: "XAUUSD",
    positionType: "short",
    entryPrice: 200,
    exitPrice: 190,
    quantity: 15,
    entryDate: "2025-08-01T14:30:00Z",
    exitDate: "2025-08-05T14:30:00Z",
    pnl: 200,
    strategyId: "s2",
    notes: "CAB 3",
    image: "https://example.com/screenshots/aapl-trade1.png",
  },
  // ...
];
