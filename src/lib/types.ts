import type { ImagePlaceholder } from './placeholder-images';

export interface Employee {
  id: string;
  name: string;
  avatar: ImagePlaceholder;
  department: string;
  jobTitle: string;
  status: 'active' | 'on_leave' | 'inactive';
}

export interface AttendanceRecord {
  employee: Employee;
  checkInTime: string;
  status: 'on-time' | 'late';
}

export interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'paid' | 'pending';
}
