import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { attendanceRecords } from "@/lib/data";

export function RealtimeAttendance() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>الحضور اللحظي</CardTitle>
        <CardDescription>
          قائمة بالموظفين الذين سجلوا حضورهم اليوم.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الموظف</TableHead>
              <TableHead>القسم</TableHead>
              <TableHead className="hidden md:table-cell">وقت الحضور</TableHead>
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
                <TableCell>{record.employee.department}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {record.checkInTime}
                </TableCell>
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
  );
}
