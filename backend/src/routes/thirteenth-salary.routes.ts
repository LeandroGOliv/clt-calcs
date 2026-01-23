import {
  thirteenthSalaryInputSchema,
  thirteenthSalaryOutputSchema,
} from "@/schemas/thirteenth-salary.schema";
import { thirteenthSalaryCalc } from "@/services/thirteenth-salary.service";
import { FastiftyTypedInstance } from "@/types";

export default async function thirteenthSalaryRoutes(
  app: FastiftyTypedInstance,
) {
  app.post(
    "/",
    {
      schema: {
        body: thirteenthSalaryInputSchema,
        response: { 200: thirteenthSalaryOutputSchema },
      },
    },
    async (request, _reply) => {
      const body = request.body;
      const thirteenthSalaryResult = thirteenthSalaryCalc(body);
      return thirteenthSalaryResult;
    },
  );
}
