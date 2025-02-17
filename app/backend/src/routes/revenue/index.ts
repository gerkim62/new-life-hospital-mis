import { Response, Router } from "express";
import { GetRevenueRouteResponse } from "./types";
import { getRevenue } from "./controllers";

const revenueRouter = Router();

revenueRouter.get("/", async (_, res: Response<GetRevenueRouteResponse>) => {
  const revenue = await getRevenue();
  res.json({
    success: true,
    message: "Revenue fetched successfully",
    revenue,
  });
});

export default revenueRouter;