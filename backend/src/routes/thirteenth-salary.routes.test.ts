import { app } from "@/app";
import { ThirteenthSalaryOutputSchema } from "@/schemas/thirteenth-salary.schema";

describe("POST /thirteenth-salary", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST to /thirteenth-salary return 200", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/thirteenth-salary",
      payload: {
        grossSalary: 2700,
        monthsWorked: 12,
        numberOfInstallments: 2,
      },
    });
    const body = response.json<ThirteenthSalaryOutputSchema>();
    expect(response.statusCode).toBe(200);
    expect(body.firstInstallment).toBeGreaterThan(0);
    expect(body.secondInstallment).toBeGreaterThan(0);
    expect(body.thirteenthSalaryTotal).toBeGreaterThan(0);
  });

  it("should return 400 for invalid input", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/thirteenth-salary",
      payload: {
        grossSalary: -100,
        monthsWorked: 12,
        numberOfInstallments: 2,
      },
    });
    expect(response.statusCode).toBe(400);
  });

  it("should return 400 for missing fields", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/thirteenth-salary",
      payload: {
        monthsWorked: 12,
        numberOfInstallments: 2,
      },
    });
    expect(response.statusCode).toBe(400);
  });
});
