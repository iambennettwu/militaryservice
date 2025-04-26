
import { useState } from "react";
import { militaryTypes } from "@/data/militaryTypes";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EnlistmentData {
  id: number;
  militaryTypeId: string;
  year: number;
  sequence: number;
  date: string;
}

// 模擬資料，實際應從後端獲取
const mockEnlistmentData: EnlistmentData[] = [
  { id: 1, militaryTypeId: "alternative", year: 2025, sequence: 269, date: "07/08" },
  { id: 2, militaryTypeId: "army", year: 2025, sequence: 111, date: "07/03" },
  { id: 3, militaryTypeId: "airForce", year: 2025, sequence: 123, date: "07/02" },
  { id: 4, militaryTypeId: "supplementary", year: 2025, sequence: 999, date: "07/09" },
  { id: 5, militaryTypeId: "navy", year: 2025, sequence: 222, date: "08/15" },
  { id: 6, militaryTypeId: "marines", year: 2025, sequence: 333, date: "09/22" },
  { id: 7, militaryTypeId: "alternative", year: 2026, sequence: 100, date: "01/15" },
  { id: 8, militaryTypeId: "army", year: 2026, sequence: 200, date: "02/20" },
];

const EnlistmentQuery = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof EnlistmentData | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  // 篩選及排序資料
  const processData = (data: EnlistmentData[]) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    // 只顯示未來的日期
    let filteredData = data.filter(item => {
      const [month, day] = item.date.split("/").map(Number);
      return (
        item.year > currentYear ||
        (item.year === currentYear &&
          (month > currentMonth ||
            (month === currentMonth && day >= currentDay)))
      );
    });

    // 應用篩選條件
    if (selectedType) {
      filteredData = filteredData.filter(item => item.militaryTypeId === selectedType);
    }
    if (selectedYear) {
      filteredData = filteredData.filter(item => item.year === selectedYear);
    }
    if (selectedMonth) {
      filteredData = filteredData.filter(item => {
        const month = parseInt(item.date.split("/")[0]);
        return month === selectedMonth;
      });
    }

    // 應用排序
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        if (sortConfig.key === 'date') {
          const [monthA, dayA] = a.date.split("/").map(Number);
          const [monthB, dayB] = b.date.split("/").map(Number);
          const dateA = new Date(2000, monthA - 1, dayA);
          const dateB = new Date(2000, monthB - 1, dayB);
          return sortConfig.direction === 'asc' 
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        }
        return sortConfig.direction === 'asc'
          ? a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
          : b[sortConfig.key] > a[sortConfig.key] ? 1 : -1;
      });
    }

    return filteredData;
  };

  const toggleSort = (key: keyof EnlistmentData) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const filteredData = processData(mockEnlistmentData);
  const displayData = showAll ? filteredData : filteredData.slice(0, 4);

  const SortIcon = ({ column }: { column: keyof EnlistmentData }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === 'asc' ? <ArrowUp className="inline w-4 h-4 ml-1" /> : <ArrowDown className="inline w-4 h-4 ml-1" />;
  };

  return (
    <section id="enlistment-query" className="py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-white">入伍日期查詢</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                請選擇服役役別
              </label>
              <select
                className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">全部役別</option>
                {militaryTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                請選擇入伍年度
              </label>
              <select
                className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
                value={selectedYear || ""}
                onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">全部年度</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                請選擇入伍月份
              </label>
              <select
                className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
                value={selectedMonth || ""}
                onChange={(e) => setSelectedMonth(e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">全部月份</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {month}月
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="p-4 whitespace-nowrap">
                    <Button
                      variant="ghost"
                      onClick={() => toggleSort('militaryTypeId')}
                      className="text-white hover:text-gray-300"
                    >
                      服役役別
                      <SortIcon column="militaryTypeId" />
                    </Button>
                  </th>
                  <th className="p-4 whitespace-nowrap">
                    <Button
                      variant="ghost"
                      onClick={() => toggleSort('year')}
                      className="text-white hover:text-gray-300"
                    >
                      入伍年度
                      <SortIcon column="year" />
                    </Button>
                  </th>
                  <th className="p-4 whitespace-nowrap">
                    <Button
                      variant="ghost"
                      onClick={() => toggleSort('sequence')}
                      className="text-white hover:text-gray-300"
                    >
                      入伍梯次
                      <SortIcon column="sequence" />
                    </Button>
                  </th>
                  <th className="p-4 whitespace-nowrap">
                    <Button
                      variant="ghost"
                      onClick={() => toggleSort('date')}
                      className="text-white hover:text-gray-300"
                    >
                      入伍日期
                      <SortIcon column="date" />
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((item) => {
                  const militaryType = militaryTypes.find(
                    (type) => type.id === item.militaryTypeId
                  );
                  return (
                    <tr key={item.id} className="border-b border-gray-700/50">
                      <td className="p-4">
                        <span className={`inline-block px-4 py-2 rounded-full ${militaryType?.colorClass || "bg-gray-700"}`}>
                          {militaryType?.name || "未知"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="bg-gray-800 px-4 py-2 rounded-full">
                          {item.year}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="bg-gray-800 px-4 py-2 rounded-full">
                          {item.sequence}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="bg-gray-800 px-4 py-2 rounded-full">
                          {item.date}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredData.length > 4 && (
            <div className="mt-6 text-center">
              <Button
                onClick={() => setShowAll(!showAll)}
                variant="outline"
                className="text-white border-gray-700 hover:bg-gray-800"
              >
                {showAll ? "顯示較少" : "顯示更多"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EnlistmentQuery;
