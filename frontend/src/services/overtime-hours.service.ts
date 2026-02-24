// import da tipagem

import { API_URL } from "../config/api";
import type {
  OvertimeHoursResponseSchema,
  OvertimeHoursSchema,
} from "../utils/schemas/overtime-hours";

export const createPost = async (
  data: OvertimeHoursSchema,
): Promise<OvertimeHoursResponseSchema> => {
  const response = await fetch(`${API_URL}/overtime-hours`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao calcular horas extras.");
  }

  const result: OvertimeHoursResponseSchema = await response.json();
  return result;
};
