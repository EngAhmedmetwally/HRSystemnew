import { StatsCards } from "@/components/dashboard/stats-cards";
import { AttendanceChart } from "@/components/dashboard/attendance-chart";
import { AnomalyDetector } from "@/components/dashboard/anomaly-detector";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { attendanceRecords } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 md:space-y-8">
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>
        <div className="lg:col-span-1">
          <AnomalyDetector />
        </div>
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>سجل الحضور اليومي</CardTitle>
              <CardDescription>
                عرض سجلات الحضور والانصراف لجميع الموظفين اليوم.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الموظف</TableHead>
                    <TableHead>وقت الحضور</TableHead>
                    <TableHead>وقت الانصراف</TableHead>
                    <TableHead>الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={record.employee.avatar.imageUrl} alt="Avatar" />
                            <AvatarFallback>{record.employee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{record.employee.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{record.checkInTime}</TableCell>
                      <TableCell>--:--</TableCell>
                      <TableCell>
                        <Badge
                          variant={record.status === 'on-time' ? 'secondary' : 'destructive'}
                          className={record.status === 'on-time' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400'}
                        >
                          {record.status === 'on-time' ? 'في الوقت المحدد' : 'متأخر'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
