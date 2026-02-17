import { app } from "@/app";
import { OvertimeHoursOutput } from "@/schemas/overtime-hours.schema";

describe("POST /overtime-hours", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST to /overtime-hours should return 200", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/overtime-hours",
      payload: {
        grossSalary: 2700,
        monthlyWorkHours: 176,
        overtimeHours: {
          daily: 0,
          night: 0,
          holiday: 15,
          holidayAndNight: 0,
        },
      },
    });

    const body = response.json<OvertimeHoursOutput>();
    expect(response.statusCode).toBe(200);
    expect(body.overtimeHoursPay.holiday).toBeGreaterThan(0);
    expect(body.totalOvertimeHoursPay).toBeGreaterThan(0);
  });

  it("should return 400 for invalid input", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/overtime-hours",
      payload: {
        grossSalary: -100,
        monthlyWorkHours: 176,
        overtimeHours: {
          daily: 0,
          night: 0,
          holiday: 15,
          holidayAndNight: 0,
        },
      },
    });

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 for missing fields", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/overtime-hours",
      payload: {
        grossSalary: 2700,
      },
    });

    expect(response.statusCode).toBe(400);
  });
});
