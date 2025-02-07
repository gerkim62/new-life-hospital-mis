import StockMovementsHistory from "@/components/pages/stock/item-history";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stock/$itemId")({
  component: StockMovementsHistory,
});
