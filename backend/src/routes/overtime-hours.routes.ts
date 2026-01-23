import {
  overtimeHoursInput,
  overtimeHoursOutput,
} from "@/schemas/overtime-hours.schema";
import { overtimeHoursCalc } from "@/services/overtime-hours.service";
import { FastiftyTypedInstance } from "@/types";

export default async function overtimeHoursRoutes(app: FastiftyTypedInstance) {
  app.post(
    "/",
    {
      schema: {
        body: overtimeHoursInput,
        response: { 200: overtimeHoursOutput },
      },
    },

    async (request, _reply) => {
      const body = request.body;
      const overtimeHoursResult = overtimeHoursCalc(body);
      return overtimeHoursResult;
    }
  );
}
