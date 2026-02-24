// import da tipagem

import { API_URL } from "../config/api";
import type {
  ThirteenthSalaryResponseSchema,
  ThirteenthSalarySchema,
} from "../utils/schemas/thirteenth-salary";

export const createPost = async (
  data: ThirteenthSalarySchema,
): Promise<ThirteenthSalaryResponseSchema> => {
  const response = await fetch(`${API_URL}/thirteenth-salary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || "Erro ao calcular décimo terceiro salário.",
    );
  }

  const result: ThirteenthSalaryResponseSchema = await response.json();
  return result;
};
