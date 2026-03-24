import { applyCLTDeductions } from "@/utils/deductions";
import { thirteenthSalaryCalc } from "./thirteenth-salary.service";

jest.mock("@/utils/deductions");

describe("thirteenthSalaryCalc", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .mocked(applyCLTDeductions)
      .mockReturnValue({ inss: 100, irrf: 50, net: 850 });
  });

  it("should calculate thirteenth salary with one installment pay correctly", () => {
    const input = {
      grossSalary: 5000,
      monthsWorked: 12,
      numberOfInstallments: 1,
      averageOfBonus: 0,
    };

    const expectedSalaryGrossTotal = 5000 * (12 / 12); // sem bônus
    const expectedGrossTotalWithBonus = expectedSalaryGrossTotal + 0;

    const result = thirteenthSalaryCalc(input);

    expect(result.thirteenthSalaryGrossTotal).toBeCloseTo(
      expectedSalaryGrossTotal,
    );
    expect(result.firstInstallmentGross).toBeCloseTo(
      expectedGrossTotalWithBonus,
    );
    expect(result.secondInstallmentGross).toEqual(0);
  });

  it("should calculate thirteenth salary with two installments pay correctly", () => {
    const input = {
      grossSalary: 5000,
      monthsWorked: 12,
      numberOfInstallments: 2,
      averageOfBonus: 0,
    };

    const expectedSalaryGrossTotal = 5000 * (12 / 12);
    const expectedGrossTotalWithBonus = expectedSalaryGrossTotal + 0;
    const expectedFirstInstallmentGross = expectedGrossTotalWithBonus / 2;
    const expectedSecondInstallmentGross = expectedGrossTotalWithBonus / 2;

    const result = thirteenthSalaryCalc(input);

    expect(result.thirteenthSalaryGrossTotal).toBeCloseTo(
      expectedSalaryGrossTotal,
    );
    expect(result.firstInstallmentGross).toBeCloseTo(
      expectedFirstInstallmentGross,
    );
    expect(result.secondInstallmentGross).toBeCloseTo(
      expectedSecondInstallmentGross,
    );
  });

  it("should calculate proportional gross for partial year", () => {
    const input = {
      grossSalary: 6000,
      monthsWorked: 6,
      numberOfInstallments: 1,
      averageOfBonus: 0,
    };

    const result = thirteenthSalaryCalc(input);

    expect(result.thirteenthSalaryGrossTotal).toBeCloseTo(3000);
    // applyCLTDeductions recebe thirteenthSalaryGrossTotalWithBonus (3000 + 0)
    expect(jest.mocked(applyCLTDeductions)).toHaveBeenCalledWith(
      expect.closeTo(3000, 5),
    );
  });

  it("should calculate bonus proportional and pass total with bonus to deductions", () => {
    const input = {
      grossSalary: 6000,
      monthsWorked: 6,
      numberOfInstallments: 1,
      averageOfBonus: 1200,
    };

    const expectedGrossTotal = 6000 * (6 / 12); // 3000
    const expectedBonusProportional = 1200 * (6 / 12); // 600
    const expectedGrossTotalWithBonus =
      expectedGrossTotal + expectedBonusProportional; // 3600

    const result = thirteenthSalaryCalc(input);

    expect(result.thirteenthSalaryGrossTotal).toBeCloseTo(expectedGrossTotal);
    expect(result.bonusProportional).toBeCloseTo(expectedBonusProportional);
    expect(result.thirteenthSalaryGrossTotalWithBonus).toBeCloseTo(
      expectedGrossTotalWithBonus,
    );
    expect(jest.mocked(applyCLTDeductions)).toHaveBeenCalledWith(
      expect.closeTo(expectedGrossTotalWithBonus, 5),
    );
  });

  it("should apply deductions on single installment", () => {
    const input = {
      grossSalary: 5000,
      monthsWorked: 12,
      numberOfInstallments: 1,
      averageOfBonus: 0,
    };

    const result = thirteenthSalaryCalc(input);

    expect(result.firstInstallmentINSSDeduction).toBe(100);
    expect(result.firstInstallmentIRRFDeduction).toBe(50);
    expect(result.firstInstallmentNet).toBeCloseTo(
      result.firstInstallmentGross - 150,
    );
    expect(result.secondInstallmentNet).toBe(0);
    expect(result.secondInstallmentGross).toBe(0);
  });

  it("should apply deductions only on second installment when two installments", () => {
    const input = {
      grossSalary: 5000,
      monthsWorked: 12,
      numberOfInstallments: 2,
      averageOfBonus: 0,
    };

    const result = thirteenthSalaryCalc(input);

    expect(result.firstInstallmentNet).toBeCloseTo(
      result.firstInstallmentGross,
    );
    expect(result.firstInstallmentINSSDeduction).toBe(0);
    expect(result.firstInstallmentIRRFDeduction).toBe(0);

    expect(result.secondInstallmentINSSDeduction).toBe(100);
    expect(result.secondInstallmentIRRFDeduction).toBe(50);
    expect(result.secondInstallmentNet).toBeCloseTo(
      result.secondInstallmentGross - 150,
    );
  });
});
