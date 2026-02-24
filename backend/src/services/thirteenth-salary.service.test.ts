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

  it("should calculate thirteenth salaray with one installment pay correctly", () => {
    const input = {
      grossSalary: 5000,
      monthsWorked: 12,
      numberOfInstallments: 1,
    };

    const expectedSalaryGrossTotal = (5000 / 12) * 12;
    const expectedFirstInstallmentGross = expectedSalaryGrossTotal;

    const result = thirteenthSalaryCalc(input);

    expect(result.thirteenthSalaryGrossTotal).toBeCloseTo(
      expectedSalaryGrossTotal,
    );
    expect(result.firstInstallmentGross).toBeCloseTo(
      expectedFirstInstallmentGross,
    );
    expect(result.secondInstallmentGross).toEqual(0);
  });

  it("should calculate thirteenth salaray with two installments pay correctly", () => {
    const input = {
      grossSalary: 5000,
      monthsWorked: 12,
      numberOfInstallments: 2,
    };

    const expectedSalaryGrossTotal = (5000 / 12) * 12;
    const expectedFirstInstallmentGross = expectedSalaryGrossTotal / 2;
    const expectedSecondInstallmentGross = expectedSalaryGrossTotal / 2;

    const result = thirteenthSalaryCalc(input);

    expect(result.thirteenthSalaryGrossTotal).toBeCloseTo(
      expectedSalaryGrossTotal,
    );
    expect(result.firstInstallmentGross).toBeCloseTo(
      expectedFirstInstallmentGross,
    );
    expect(result.secondInstallmentGross).toEqual(
      expectedSecondInstallmentGross,
    );
  });

  it("should calculate proportional gross for partial year", () => {
    const input = {
      grossSalary: 6000,
      monthsWorked: 6,
      numberOfInstallments: 1,
    };
    const result = thirteenthSalaryCalc(input);

    expect(result.thirteenthSalaryGrossTotal).toBeCloseTo(3000);
    expect(jest.mocked(applyCLTDeductions)).toHaveBeenCalledWith(
      expect.closeTo(3000, 5),
    );
  });

  it("should apply deductions on single installment", () => {
    const input = {
      grossSalary: 5000,
      monthsWorked: 12,
      numberOfInstallments: 1,
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
