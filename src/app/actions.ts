"use server";

import { detectAttendanceAnomaly } from "@/ai/flows/attendance-anomaly-detection";
import type { AttendanceAnomalyOutput } from "@/ai/flows/attendance-anomaly-detection";

interface FormState {
  isAnomaly?: boolean;
  reason?: string;
  error?: string;
}

export async function runAttendanceAnomalyDetection(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const employeeId = formData.get("employeeId") as string;
  const clockInTime = formData.get("clockInTime") as string;

  if (!employeeId || !clockInTime) {
    return { error: "معرف الموظف ووقت الحضور مطلوبان." };
  }

  // In a real app, you'd fetch real attendance history from your database.
  // For this demo, we'll use a hardcoded history.
  const attendanceHistory = JSON.stringify([
    { date: "2024-07-20", clockIn: "09:05", clockOut: "17:02" },
    { date: "2024-07-19", clockIn: "08:58", clockOut: "17:05" },
    { date: "2024-07-18", clockIn: "09:10", clockOut: "17:15" },
    { date: "2024-07-17", clockIn: "09:02", clockOut: "16:58" },
  ]);

  try {
    const result: AttendanceAnomalyOutput = await detectAttendanceAnomaly({
      employeeId,
      clockInTime,
      attendanceHistory,
    });
    return result;
  } catch (error) {
    console.error("Error running anomaly detection flow:", error);
    return { error: "حدث خطأ أثناء تحليل البيانات. يرجى المحاولة مرة أخرى." };
  }
}
