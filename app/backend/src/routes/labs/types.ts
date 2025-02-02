import { Lab } from "@prisma/client";
import { ApiResponse } from "../../types/api/response";

export type CreateLabResponse = ApiResponse<Lab, unknown, "lab">;

