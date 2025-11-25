import { StatsCards } from "@/components/dashboard/stats-cards";
import { AttendanceChart } from "@/components/dashboard/attendance-chart";
import { RealtimeAttendance } from "@/components/dashboard/realtime-attendance";
import { AnomalyDetector } from "@/components/dashboard/anomaly-detector";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4">
      <StatsCards />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AttendanceChart />
        </div>
        <div className="row-start-3 lg:row-start-auto">
          <AnomalyDetector />
        </div>
        <div className="xl:col-span-2">
          <RealtimeAttendance />
        </div>
      </div>
    </div>
  );
}
