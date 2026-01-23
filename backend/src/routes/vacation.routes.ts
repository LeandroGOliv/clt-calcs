import {
  vacationInputSchema,
  vacationOutputSchema,
} from "@/schemas/vacation.schema";
import { vacationCalc } from "@/services/vacation.service";
import { FastiftyTypedInstance } from "@/types";

export default async function vacationRoutes(app: FastiftyTypedInstance) {
  app.post(
    "/",
    {
      schema: {
        body: vacationInputSchema,
        response: {
          200: vacationOutputSchema,
        },
      },
    },
    async (request, _reply) => {
      const body = request.body;
      const vacationResult = vacationCalc(body);
      return { ...vacationResult, ...body };
    }
  );
}
