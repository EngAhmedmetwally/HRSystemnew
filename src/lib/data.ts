import type { Employee, AttendanceRecord, Payroll } from './types';
import { findImage } from './placeholder-images';

export const employees: Employee[] = [
  { id: 'E001', name: 'أحمد علي', avatar: findImage('avatar1')!, department: 'الهندسة', jobTitle: 'مهندس برمجيات', status: 'active' },
  { id: 'E002', name: 'فاطمة الزهراء', avatar: findImage('avatar2')!, department: 'التسويق', jobTitle: 'مديرة تسويق', status: 'active' },
  { id: 'E003', name: 'يوسف حسن', avatar: findImage('avatar3')!, department: 'الموارد البشرية', jobTitle: 'أخصائي موارد بشرية', status: 'on_leave' },
  { id: 'E004', name: 'مريم خالد', avatar: findImage('avatar4')!, department: 'التصميم', jobTitle: 'مصممة واجهات', status: 'active' },
  { id: 'E005', name: 'عمر سعيد', avatar: findImage('avatar5')!, department: 'الهندسة', jobTitle: 'مهندس DevOps', status: 'inactive' },
];

export const attendanceRecords: AttendanceRecord[] = [
  { employee: employees[0], checkInTime: '08:55 ص', status: 'on-time' },
  { employee: employees[1], checkInTime: '09:15 ص', status: 'late' },
  { employee: employees[3], checkInTime: '08:49 ص', status: 'on-time' },
];

export const payrollData: Payroll[] = [
    { id: 'P2407-001', employeeId: 'E001', employeeName: 'أحمد علي', month: 'يوليو 2024', baseSalary: 8000, allowances: 1000, deductions: -250, netSalary: 8750, status: 'paid' },
    { id: 'P2407-002', employeeId: 'E002', employeeName: 'فاطمة الزهراء', month: 'يوليو 2024', baseSalary: 12000, allowances: 2000, deductions: 0, netSalary: 14000, status: 'paid' },
    { id: 'P2407-004', employeeId: 'E004', employeeName: 'مريم خالد', month: 'يوليو 2024', baseSalary: 7500, allowances: 800, deductions: -50, netSalary: 8250, status: 'pending' },
];

export const chartData = [
  { date: 'الأحد', حاضر: 28, متأخر: 2, غائب: 1 },
  { date: 'الاثنين', حاضر: 29, متأخر: 1, غائب: 1 },
  { date: 'الثلاثاء', حاضر: 31, متأخر: 0, غائب: 0 },
  { date: 'الأربعاء', حاضر: 27, متأخر: 4, غائب: 0 },
  { date: 'الخميس', حاضر: 30, متأخر: 1, غائب: 0 },
];
