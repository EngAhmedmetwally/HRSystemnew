'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, AlertTriangle, UserX, Loader2 } from "lucide-react";
import { useCollection, useFirebase, useMemoFirebase, useUser } from "@/firebase";
import { collection, query, where, Timestamp } from "firebase/firestore";
import type { Employee, WorkDay } from "@/lib/types";
import { useMemo } from "react";

export function StatsCards() {
  const { firestore } = useFirebase();
  const { user, isUserLoading } = useUser();

  const employeesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'employees');
  }, [firestore, user]);
  const { data: employees, isLoading: isLoadingEmployees } = useCollection<Employee>(employeesQuery);

  const dailyWorkDaysQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const startOfDayTimestamp = Timestamp.fromDate(startOfDay);
    return query(collection(firestore, 'workDays'), where('checkInTime', '>=', startOfDayTimestamp));
  }, [firestore, user]);
  const { data: workDays, isLoading: isLoadingWorkDays } = useCollection<WorkDay>(dailyWorkDaysQuery);

  const statsData = useMemo(() => {
    if (!employees || !workDays) {
      return {
        totalEmployees: null,
        onTime: null,
        late: null,
        absent: null,
      };
    }
    
    const activeEmployees = employees.filter(e => e.status === 'active');
    const presentIds = new Set(workDays.map(wd => wd.employeeId));

    const totalEmployees = activeEmployees.length;
    const onTime = workDays.filter(wd => wd.delayMinutes === 0).length;
    const late = workDays.filter(wd => wd.delayMinutes > 0).length;
    const absent = activeEmployees.filter(emp => !presentIds.has(emp.id)).length;
    
    return { totalEmployees, onTime, late, absent };

  }, [employees, workDays]);

  const isLoading = isUserLoading || isLoadingEmployees || isLoadingWorkDays;

  const stats = [
    { title: "إجمالي الموظفين", value: statsData.totalEmployees, icon: Users, color: "text-primary" },
    { title: "حضور في الوقت", value: statsData.onTime, icon: Clock, color: "text-green-500" },
    { title: "متأخر اليوم", value: statsData.late, icon: AlertTriangle, color: "text-yellow-500" },
    { title: "غائب اليوم", value: statsData.absent, icon: UserX, color: "text-red-500" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 text-muted-foreground ${stat.color}`} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className="h-7 w-6 animate-pulse rounded-md bg-muted" />
            ) : (
                <div className="text-2xl font-bold">{stat.value ?? '0'}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
