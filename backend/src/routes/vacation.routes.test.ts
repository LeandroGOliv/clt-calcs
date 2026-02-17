import { app } from "@/app";
import { VacationOutputSchema } from "@/schemas/vacation.schema";

describe("POST to /vacation", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST to /vacation return 200", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/vacation",
      payload: { grossSalary: 2700, sellVacationDays: true, vacationDays: 30 },
    });

    const body = response.json<VacationOutputSchema>();
    expect(response.statusCode).toBe(200);
    expect(body.vacationPay).toBeGreaterThan(0);
    expect(body.vacationSellValue).toBeGreaterThan(0);
    expect(body.vacationSellBonus).toBeGreaterThan(0);
    expect(body.totalVacationPay).toBeGreaterThan(0);
  });
});
