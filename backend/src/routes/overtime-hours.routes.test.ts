import { OvertimeHoursInput } from "@/schemas/overtime-hours.schema";

const body = <OvertimeHoursInput>{
  grossSalary: 2700,
  monthlyWorkHours: 176,
  overtimeHours: {
    daily: 0,
    night: 0,
    holiday: 15,
    holidayAndNight: 0,
  },
};

describe("Faz calculo de horas extras", () => {
  it("POST to /overtime-hours should return 200", async () => {
    const response = await fetch("http://localhost:3333/overtime-hours", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    expect(response.status).toBe(200);
  });
});
