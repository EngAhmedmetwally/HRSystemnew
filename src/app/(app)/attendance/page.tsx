'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { LogIn, LogOut } from "lucide-react";
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
import { useEffect, useState } from "react";

export default function AttendancePage() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [countdown, setCountdown] = useState(60);

  const generateQrCode = () => {
    const timestamp = Date.now();
    const secret = "your-secret-key"; // In a real app, this should be more secure
    const dataToEncode = `${timestamp}-${secret}`;
    const newQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(dataToEncode)}`;
    setQrCodeUrl(newQrCodeUrl);
    setCountdown(60);
  };

  useEffect(() => {
    generateQrCode();
    const interval = setInterval(generateQrCode, 60000); // Generate new QR code every 60 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [qrCodeUrl]);


  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>إنشاء QR Code للحضور</CardTitle>
            <CardDescription>
              قم بإنشاء QR code ديناميكي للموظفين لتسجيل الحضور أو الانصراف.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-lg border bg-card p-4 shadow-inner">
              {qrCodeUrl ? (
                <Image
                  src={qrCodeUrl}
                  alt="Dynamic QR Code"
                  width={150}
                  height={150}
                  className="rounded-md"
                />
              ) : (
                <div className="h-[150px] w-[150px] bg-muted animate-pulse rounded-md" />
              )}
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              صالح لمدة {countdown} ثانية
            </p>
            <div className="grid w-full grid-cols-2 gap-4">
              <Button>
                <LogIn className="ml-2 h-4 w-4" />
                QR تسجيل حضور
              </Button>
              <Button variant="outline">
                <LogOut className="ml-2 h-4 w-4" />
                QR تسجيل انصراف
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>سجل حضور اليوم</CardTitle>
            <CardDescription>
              عرض سجلات الحضور والانصراف لليوم الحالي.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الموظف</TableHead>
                  <TableHead>وقت الحضور</TableHead>
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
  );
}
