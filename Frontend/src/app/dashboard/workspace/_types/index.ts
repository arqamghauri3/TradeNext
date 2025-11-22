type ChartItem = {
    id: string
    w: number
    h: number
}

const MAX_CHARTS = 4
const MIN_CHARTS = 1
const GRID_COLS = 12
const ROW_HEIGHT_PX = 8;  
const COL_WIDTH_PX = 90;  
const STORAGE_KEY = "workspace-dnd-grid-v1";