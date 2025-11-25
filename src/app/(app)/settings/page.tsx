'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    checkInTime: '09:00',
    checkOutTime: '17:00',
    qrRefreshRate: 60,
    latePolicy: {
      gracePeriod: 15,
      deductionPerMinute: 1,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handlePolicyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      latePolicy: { ...prev.latePolicy, [name]: parseInt(value, 10) },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would save these settings to a database.
    toast({
      title: 'تم حفظ الإعدادات',
      description: 'تم تحديث إعدادات النظام بنجاح.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">إدارة الإعدادات</h2>
        <p className="text-muted-foreground">
          إدارة إعدادات النظام وسياسات الحضور والرواتب.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الحضور العامة</CardTitle>
              <CardDescription>
                تحديد أوقات العمل الرسمية وسياسات الحضور.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="checkInTime">وقت الحضور العام</Label>
                <Input
                  id="checkInTime"
                  name="checkInTime"
                  type="time"
                  value={settings.checkInTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkOutTime">وقت الانصراف العام</Label>
                <Input
                  id="checkOutTime"
                  name="checkOutTime"
                  type="time"
                  value={settings.checkOutTime}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إعدادات QR Code</CardTitle>
              <CardDescription>
                تكوين سلوك رمز الاستجابة السريعة للحضور.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qrRefreshRate">
                  تحديث الـ QR Code كل (بالثواني)
                </Label>
                <Input
                  id="qrRefreshRate"
                  name="qrRefreshRate"
                  type="number"
                  value={settings.qrRefreshRate}
                  onChange={handleInputChange}
                  min="10"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>لائحة التأخير</CardTitle>
              <CardDescription>
                إعداد قواعد الخصم بناءً على دقائق التأخير.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid gap-4 sm:grid-cols-2">
                 <div className="space-y-2">
                    <Label htmlFor="gracePeriod">فترة السماح (بالدقائق)</Label>
                    <Input
                      id="gracePeriod"
                      name="gracePeriod"
                      type="number"
                      value={settings.latePolicy.gracePeriod}
                      onChange={handlePolicyChange}
                      min="0"
                    />
                     <p className="text-xs text-muted-foreground">
                        عدد الدقائق المسموح بها قبل بدء حساب التأخير.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deductionPerMinute">
                      قيمة الخصم لكل دقيقة تأخير (SAR)
                    </Label>
                    <Input
                      id="deductionPerMinute"
                      name="deductionPerMinute"
                      type="number"
                      value={settings.latePolicy.deductionPerMinute}
                      onChange={handlePolicyChange}
                      min="0"
                      step="0.1"
                    />
                     <p className="text-xs text-muted-foreground">
                        المبلغ الذي يتم خصمه عن كل دقيقة تأخير بعد فترة السماح.
                    </p>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit">
            <Save className="ml-2 h-4 w-4" />
            حفظ التغييرات
          </Button>
        </div>
      </form>
    </div>
  );
}
