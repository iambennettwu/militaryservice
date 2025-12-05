import { useState, useEffect } from "react";
import { differenceInDays, addYears, addMonths, addDays, format } from "date-fns";
import { Calendar, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DischargeCalculator = () => {
  // 入伍日期
  const [enlistmentYear, setEnlistmentYear] = useState<number | "">("");
  const [enlistmentMonth, setEnlistmentMonth] = useState<number | "">("");
  const [enlistmentDay, setEnlistmentDay] = useState<number | "">("");

  // 役期長短
  const [servicePeriodYears, setServicePeriodYears] = useState<number | "">("");
  const [servicePeriodMonths, setServicePeriodMonths] = useState<number | "">("");
  const [servicePeriodDays, setServicePeriodDays] = useState<number | "">("");

  // 折抵天數
  const [deductionDays, setDeductionDays] = useState<number | "">("");

  // 計算結果
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [dischargeDate, setDischargeDate] = useState<Date | null>(null);

  // 行事曆彈窗
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);

  // 產生行事曆連結
  const generateCalendarUrls = (date: Date) => {
    const eventTitle = "我的退伍日";
    const dateStr = format(date, "yyyyMMdd");
    
    // Google Calendar
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${dateStr}/${dateStr}&details=${encodeURIComponent("軍旅生涯結束！")}`;
    
    // Apple Calendar (ICS file)
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART;VALUE=DATE:${dateStr}
DTEND;VALUE=DATE:${dateStr}
SUMMARY:${eventTitle}
DESCRIPTION:軍旅生涯結束！
END:VEVENT
END:VCALENDAR`;
    const icsBlob = new Blob([icsContent], { type: "text/calendar" });
    const appleUrl = URL.createObjectURL(icsBlob);
    
    // Outlook
    const outlookUrl = `https://outlook.live.com/calendar/0/action/compose?subject=${encodeURIComponent(eventTitle)}&startdt=${format(date, "yyyy-MM-dd")}&enddt=${format(date, "yyyy-MM-dd")}&allday=true&body=${encodeURIComponent("軍旅生涯結束！")}`;
    
    return { googleUrl, appleUrl, outlookUrl };
  };

  // 每次輸入變更時重新計算
  useEffect(() => {
    calculateDischargeDate();
  }, [
    enlistmentYear,
    enlistmentMonth,
    enlistmentDay,
    servicePeriodYears,
    servicePeriodMonths,
    servicePeriodDays,
    deductionDays,
  ]);

  const calculateDischargeDate = () => {
    // 檢查所有必要欄位是否都已填寫
    if (
      enlistmentYear === "" ||
      enlistmentMonth === "" ||
      enlistmentDay === ""
    ) {
      setDaysRemaining(null);
      setDischargeDate(null);
      return;
    }

    try {
      const enlistmentDate = new Date(
        +enlistmentYear,
        (+enlistmentMonth) - 1,
        +enlistmentDay
      );

      let dischargeDateValue = new Date(enlistmentDate);

      // Add service period
      if (servicePeriodYears !== "") {
        dischargeDateValue = addYears(dischargeDateValue, +servicePeriodYears);
      }
      if (servicePeriodMonths !== "") {
        dischargeDateValue = addMonths(dischargeDateValue, +servicePeriodMonths);
      }
      if (servicePeriodDays !== "") {
        dischargeDateValue = addDays(dischargeDateValue, +servicePeriodDays);
      }

      // Subtract deduction days and one additional day
      if (deductionDays !== "") {
        dischargeDateValue = addDays(dischargeDateValue, -(Number(deductionDays) + 1));
      } else {
        dischargeDateValue = addDays(dischargeDateValue, -1);
      }

      // Calculate remaining days
      const today = new Date();
      const remainingDays = differenceInDays(dischargeDateValue, today);

      setDaysRemaining(remainingDays > 0 ? remainingDays : 0);
      setDischargeDate(dischargeDateValue);
    } catch (error) {
      console.error("計算日期時出錯:", error);
      setDaysRemaining(null);
      setDischargeDate(null);
    }
  };

  // 產生年份選項
  const yearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => currentYear - 3 + i);
  };

  // 產生月份選項
  const monthOptions = () => {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  };

  // 產生日期選項
  const dayOptions = () => {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  };

  return (
    <section id="discharge-calculator" className="py-1">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-8">退伍日試算</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* 入伍日期 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  入伍日期
                </label>
                <div className="flex space-x-2">
                  <select
                    value={enlistmentYear}
                    onChange={(e) => setEnlistmentYear(e.target.value ? parseInt(e.target.value) : "")}
                    className="flex-1 p-3 border rounded-md bg-gray-100"
                  >
                    <option value="">年</option>
                    {yearOptions().map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <select
                    value={enlistmentMonth}
                    onChange={(e) => setEnlistmentMonth(e.target.value ? parseInt(e.target.value) : "")}
                    className="flex-1 p-3 border rounded-md bg-gray-100"
                  >
                    <option value="">月</option>
                    {monthOptions().map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    value={enlistmentDay}
                    onChange={(e) => setEnlistmentDay(e.target.value ? parseInt(e.target.value) : "")}
                    className="flex-1 p-3 border rounded-md bg-gray-100"
                  >
                    <option value="">日</option>
                    {dayOptions().map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 役期長度 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  役期長度
                </label>
                <div className="flex flex-wrap md:flex-nowrap gap-2">
                  <select
                    value={servicePeriodYears}
                    onChange={(e) => setServicePeriodYears(e.target.value ? parseInt(e.target.value) : "")}
                    className="flex-1 p-3 border rounded-md bg-gray-100 min-w-[100px]"
                  >
                    <option value="">年</option>
                    {[0, 1, 2, 3, 4].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <select
                    value={servicePeriodMonths}
                    onChange={(e) => setServicePeriodMonths(e.target.value ? parseInt(e.target.value) : "")}
                    className="flex-1 p-3 border rounded-md bg-gray-100 min-w-[100px]"
                  >
                    <option value="">月</option>
                    {monthOptions().map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    value={servicePeriodDays}
                    onChange={(e) => setServicePeriodDays(e.target.value ? parseInt(e.target.value) : "")}
                    className="flex-1 p-3 border rounded-md bg-gray-100 min-w-[100px]"
                  >
                    <option value="">日</option>
                    {dayOptions().map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 折抵天數 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  兵役折抵
                </label>
                <div className="flex items-center space-x-2 w-full">
                  <input
                    type="number"
                    min="0"
                    value={deductionDays}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDeductionDays(value === "" ? "" : parseInt(value));
                    }}
                    className="flex-1 p-3 border rounded-md bg-gray-100 w-full"
                    placeholder="天數"
                  />
                  <span className="text-gray-500 whitespace-nowrap">日</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 rounded-xl flex items-center justify-center p-6 h-full">
              <div className="text-center">
                <h3 className="text-xl mb-4">距離退伍</h3>
                <div className="text-7xl font-bold">
                  {daysRemaining !== null ? daysRemaining : "99"}
                </div>
                <p className="mt-2 text-lg">天</p>
                {dischargeDate && (
                  <>
                    <p className="mt-4 text-sm text-gray-600">
                      預計退伍日為： {format(dischargeDate, "yyyy/MM/dd")}
                    </p>
                    <Button
                      onClick={() => setCalendarDialogOpen(true)}
                      className="mt-4 bg-primary hover:bg-primary/90"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      加入行事曆
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 行事曆選擇彈窗 */}
      <Dialog open={calendarDialogOpen} onOpenChange={setCalendarDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">加入行事曆</DialogTitle>
          </DialogHeader>
          {dischargeDate && (
            <div className="flex flex-col gap-3 py-4">
              <a
                href={generateCalendarUrls(dischargeDate).googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Google Calendar
              </a>
              <a
                href={generateCalendarUrls(dischargeDate).appleUrl}
                download="我的退伍日.ics"
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors"
              >
                Apple Calendar
              </a>
              <a
                href={generateCalendarUrls(dischargeDate).outlookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Outlook
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DischargeCalculator;
