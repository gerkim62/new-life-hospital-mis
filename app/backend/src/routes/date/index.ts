import { Response, Router } from "express";
import { DateRouteResponse } from "./types";

const dateRouter = Router();

dateRouter.get("/", (_, res: Response<DateRouteResponse>) => {
  const readableDateInKenya = new Date().toLocaleString("en-KE", {
    timeZone: "Africa/Nairobi",
  });
  res.json({
    success: true,
    message: "Current date is " + readableDateInKenya,
    date: {
      current: new Date().toISOString(),
    },
  });
});

export default dateRouter;
