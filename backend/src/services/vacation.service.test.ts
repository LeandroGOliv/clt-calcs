import { applyCLTDeductions } from "@/utils/deductions";
import { vacationCalc } from "./vacation.service";

jest.mock("@/utils/deductions");

describe("vacationCalc", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .mocked(applyCLTDeductions)
      .mockReturnValue({ inss: 100, irrf: 50, net: 850 });
  });

  it("should calculate vacations pay correctly", () => {
    const input = {
      grossSalary: 5000,
      sellVacationDays: true,
      vacationDays: 30,
      averageExtraEarnings: 200,
    };

    const dailyRate =
      (input.grossSalary + input.averageExtraEarnings) / input.vacationDays;

    const expectedVacationPay = dailyRate * input.vacationDays;
    const expectedVacationBonus = expectedVacationPay / 3;
    const expectedSellValue = dailyRate * 10;
    const expectedSellBonus = expectedSellValue / 3;
    const expectedTotalVacationGrossPay =
      expectedVacationPay +
      expectedVacationBonus +
      expectedSellValue +
      expectedSellBonus;

    const result = vacationCalc(input);

    expect(result.vacationPay).toBeCloseTo(expectedVacationPay);
    expect(result.vacationBonus).toBeCloseTo(expectedVacationBonus);
    expect(result.vacationSellValue).toBeCloseTo(expectedSellValue);
    expect(result.vacationSellBonus).toBeCloseTo(expectedSellBonus);
    expect(result.totalVacationGrossPay).toBeCloseTo(
      expectedTotalVacationGrossPay,
    );
  });

  it("should apply CLT deductions on total gross pay", () => {
    const input = {
      grossSalary: 5000,
      sellVacationDays: false,
      vacationDays: 30,
      averageExtraEarnings: 0,
    };
    vacationCalc(input);

    const expectedTotalVacationGrossPay = 5000 + 5000 / 3;

    expect(jest.mocked(applyCLTDeductions)).toHaveBeenCalledTimes(1);
    expect(jest.mocked(applyCLTDeductions)).toHaveBeenCalledWith(
      expect.closeTo(expectedTotalVacationGrossPay, 5),
    );
  });
});
