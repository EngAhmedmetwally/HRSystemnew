import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>الإعدادات</CardTitle>
        <CardDescription>
          إدارة إعدادات النظام وسياسات الحضور والرواتب. هذه الصفحة قيد
          الإنشاء.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-64 items-center justify-center rounded-md border-2 border-dashed">
          <p className="text-muted-foreground">سيتم تنفيذ المحتوى قريبًا</p>
        </div>
      </CardContent>
    </Card>
  );
}
