import { overtimeHoursService } from "./overtime-hours.service";
import { thirteenthSalaryService } from "./thirteenth-salary.service";
import { vacationService } from "./vacation.service";

const services = {
  vacation: vacationService,
  thirteenthSalary: thirteenthSalaryService,
  overtimeHours: overtimeHoursService,
};

export default services;
