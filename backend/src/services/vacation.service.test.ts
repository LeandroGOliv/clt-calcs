import { applyCLTDeductions } from "@/utils/deductions";

jest.mock("@/utils/deductions");

describe("vacationCalc", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .mocked(applyCLTDeductions)
      .mockReturnValue({ inss: 100, irrf: 50, net: 850 });
  });

  it("should calculate vacations pay correctly", () => {});

  it("should apply CLT deductions on total gross pay", () => {});
});
