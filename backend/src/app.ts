import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import vacationRoutes from "./routes/vacation.routes";
import overtimeHoursRoutes from "./routes/overtime-hours.routes";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: true,
  methods: ["POST"],
  credentials: false,
});

app.register(vacationRoutes, { prefix: "/vacation" });
app.register(overtimeHoursRoutes, { prefix: "/overtime-hours" });
