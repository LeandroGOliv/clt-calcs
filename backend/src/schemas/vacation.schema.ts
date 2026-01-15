import z from "zod";

export const vacationInputSchema = z.object({});

export const vacationOutputSchema = z.object({});

export type VacationInputSchema = z.infer<typeof vacationInputSchema>;
export type VacationOutputSchema = z.infer<typeof vacationOutputSchema>;
