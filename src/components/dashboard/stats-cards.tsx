import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, AlertTriangle, UserX } from "lucide-react";

export function StatsCards() {
  const stats = [
    { title: "إجمالي الموظفين", value: "31", icon: Users, color: "text-primary" },
    { title: "حضور في الوقت", value: "28", icon: Clock, color: "text-green-500" },
    { title: "متأخر اليوم", value: "2", icon: AlertTriangle, color: "text-yellow-500" },
    { title: "غائب اليوم", value: "1", icon: UserX, color: "text-red-500" },
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
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
