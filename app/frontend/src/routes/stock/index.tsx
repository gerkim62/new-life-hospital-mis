import { StockList } from '@/components/pages/stock/stock-list'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stock/')({
  component: StockList,
})

