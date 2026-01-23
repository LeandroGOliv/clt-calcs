import {
  overtimeHoursInputSchema,
  overtimeHoursOutputSchema,
} from "@/schemas/overtime-hours.schema";
import { overtimeHoursCalc } from "@/services/overtime-hours.service";
import { FastiftyTypedInstance } from "@/types";

export default async function overtimeHoursRoutes(app: FastiftyTypedInstance) {
  app.post(
    "/",
    {
      schema: {
        body: overtimeHoursInputSchema,
        response: { 200: overtimeHoursOutputSchema },
      },
    },

    async (request, _reply) => {
      const body = request.body;
      const overtimeHoursResult = overtimeHoursCalc(body);
      return overtimeHoursResult;
    },
  );
}
