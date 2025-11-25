# **App Name**: HR Pulse

## Core Features:

- Employee Management: Add, modify, and remove employee records including personal info, salary, and contract details.
- Attendance Tracking via QR: Generate secure, dynamic QR codes daily for employees to scan for check-in/out. Captures timestamp and optional location.
- Attendance Anomaly Detection: AI-powered tool identifies and flags unusual attendance patterns that deviate from employee history, such as clock-in times far from usual, or attempts to clock in from suspicious locations.
- Automated Payroll Calculation: Calculates payroll based on attendance, delays, deductions, and allowances, using predefined policies. Generates monthly payroll reports.
- Real-time Monitoring Dashboard: Provides a dashboard for HR and management to monitor real-time attendance and generate reports.
- Role-Based Access Control: Firebase Authentication ensures secure access with different roles (employee, HR, admin), each having specific permissions to view and modify data.
- Data Storage: Utilizes Firebase Realtime Database to store employee data, attendance records, delays, and deductions with real-time updates.

## Style Guidelines:

- Primary color: A calm, trustworthy blue (#4A8FE7) evokes reliability.
- Background color: Very light blue-gray (#F0F4F8), with approximately the same hue as the primary, allows content to stand out while keeping things gentle on the eyes.
- Accent color: A vibrant, complementary purple (#8254C8) distinguishes calls to action.
- Body and headline font: 'PT Sans' (sans-serif) delivers a balance of modern aesthetic with some warmth or personality.
- Fully supports Arabic (RTL) interface design.
- Simple, clear icons that represent HR functions such as attendance, payroll, and employee management.
- Subtle animations and transitions to enhance user experience during QR code scanning and data loading.