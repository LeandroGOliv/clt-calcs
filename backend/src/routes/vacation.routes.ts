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
    async (request, reply) => {
      const body = request.body;
      console.log(body);
      const vacationResult = vacationCalc(body);
      console.log(vacationResult);

      // REGRAS DE NEGOCIO QUE VAO VIR DA SERVICE

      return reply.status(200); // se não passar status ele ja manda 200
    }
  );
}
