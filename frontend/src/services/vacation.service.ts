import { API_URL } from "../config/api";
import type {
  VacationResponseSchema,
  VacationSchema,
} from "../utils/schemas/vacation";

export const createPost = async (
  data: VacationSchema,
): Promise<VacationResponseSchema> => {
  const response = await fetch(`${API_URL}/vacation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao calcular férias.");
  }

  const result: VacationResponseSchema = await response.json();
  return result;
};
