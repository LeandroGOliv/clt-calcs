import {
  vacationInputSchema,
  vacationOutputSchema,
} from "@/schemas/vacation.schema";
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
      // nÃo precisa ser /vacation na rota porque la no app ja registrei com prefix declarado, dai ele ja faz isso
      const { body } = request.body;

      console.log(body);

      // REGRAS DE NEGOCIO QUE VAO VIR DA SERVICE

      return reply.status(200); // se não passar status ele ja manda 200
    }
  );
}
