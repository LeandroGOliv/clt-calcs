import { applyCLTDeductions } from "@/utils/deductions";
import { overtimeHoursCalc } from "./overtime-hours.service";

jest.mock("@/utils/deductions");

describe("overtimeHoursCalc", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .mocked(applyCLTDeductions)
      .mockReturnValue({ inss: 100, irrf: 50, net: 850 });
  });

  it("should calculate overtime pay correctly for all types", () => {
    const input = {
      grossSalary: 5000,
      monthlyWorkHours: 220,
      overtimeHours: {
        daily: 4,
        night: 2,
        holiday: 1,
        holidayAndNight: 1,
      },
    };

    const hourlyRate = 5000 / 220;

    const expectedPay = {
      daily: hourlyRate * input.overtimeHours.daily * 1.5,
      night: hourlyRate * input.overtimeHours.night * 1.7,
      holiday: hourlyRate * input.overtimeHours.holiday * 2,
      holidayAndNight: hourlyRate * input.overtimeHours.holidayAndNight * 2.2,
    };

    const expectedGross =
      expectedPay.daily +
      expectedPay.night +
      expectedPay.holiday +
      expectedPay.holidayAndNight;

    const expectedGrossWithSalary = expectedGross + input.grossSalary;

    const result = overtimeHoursCalc(input);

    expect(result.overtimeHoursPay.daily).toBeCloseTo(expectedPay.daily);
    expect(result.overtimeHoursPay.night).toBeCloseTo(expectedPay.night);
    expect(result.overtimeHoursPay.holiday).toBeCloseTo(expectedPay.holiday);
    expect(result.overtimeHoursPay.holidayAndNight).toBeCloseTo(
      expectedPay.holidayAndNight,
    );
    expect(result.totalOvertimeHoursGrossPay).toBeCloseTo(expectedGross);
    expect(result.totalOvertimeHoursGrossPayWithSalary).toBeCloseTo(
      expectedGrossWithSalary,
    );
  });

  it("should apply CLT deductions on total gross pay with salary", () => {
    const input = {
      grossSalary: 5000,
      monthlyWorkHours: 220,
      overtimeHours: { daily: 2, night: 0, holiday: 0, holidayAndNight: 0 },
    };

    overtimeHoursCalc(input);

    const expectedOvertimePay = (5000 / 220) * 2 * 1.5;
    const expectedGrossWithSalary = expectedOvertimePay + input.grossSalary;

    expect(jest.mocked(applyCLTDeductions)).toHaveBeenCalledTimes(1);
    expect(jest.mocked(applyCLTDeductions)).toHaveBeenCalledWith(
      expect.closeTo(expectedGrossWithSalary, 5),
    );
  });

  it("should return correct deductions from applyCLTDeductions", () => {
    const input = {
      grossSalary: 5000,
      monthlyWorkHours: 220,
      overtimeHours: { daily: 2, night: 0, holiday: 0, holidayAndNight: 0 },
    };

    const result = overtimeHoursCalc(input);

    expect(result.inssDeduction).toBe(100);
    expect(result.irrfDeduction).toBe(50);
    expect(result.totalOvertimeHoursNetPayWithSalary).toBe(850);
  });

  it("should return zero overtime pay when all overtime hours are zero", () => {
    const input = {
      grossSalary: 5000,
      monthlyWorkHours: 220,
      overtimeHours: { daily: 0, night: 0, holiday: 0, holidayAndNight: 0 },
    };

    const result = overtimeHoursCalc(input);

    expect(result.totalOvertimeHoursGrossPay).toBe(0);
    expect(result.overtimeHoursPay).toEqual({
      daily: 0,
      night: 0,
      holiday: 0,
      holidayAndNight: 0,
    });
    // Sem horas extras, applyCLTDeductions ainda recebe o salário base
    expect(jest.mocked(applyCLTDeductions)).toHaveBeenCalledWith(
      input.grossSalary,
    );
    expect(result.totalOvertimeHoursGrossPayWithSalary).toBe(input.grossSalary);
  });
});
