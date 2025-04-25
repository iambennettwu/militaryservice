
import { useState } from "react";
import { militaryTypes } from "@/data/militaryTypes";

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

  // 篩選資料
  const filteredData = mockEnlistmentData.filter((item) => {
    if (selectedType && item.militaryTypeId !== selectedType) return false;
    if (selectedYear && item.year !== selectedYear) return false;
    if (selectedMonth) {
      const month = parseInt(item.date.split("/")[0]);
      if (month !== selectedMonth) return false;
    }
    return true;
  });

  const displayData = showAll ? filteredData : filteredData.slice(0, 4);

  return (
    <section id="enlistment-query" className="py-16 pt-28">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-8">入伍日期查詢</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                請選擇服役役別
              </label>
              <select
                className="w-full p-3 border rounded-md bg-gray-100"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                請選擇入伍年度
              </label>
              <select
                className="w-full p-3 border rounded-md bg-gray-100"
                value={selectedYear || ""}
                onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">全部年度</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                請選擇入伍月份
              </label>
              <select
                className="w-full p-3 border rounded-md bg-gray-100"
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
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-4 whitespace-nowrap">服役役別</th>
                  <th className="p-4 whitespace-nowrap">入伍年度</th>
                  <th className="p-4 whitespace-nowrap">入伍梯次</th>
                  <th className="p-4 whitespace-nowrap">入伍日期</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((item) => {
                  const militaryType = militaryTypes.find(
                    (type) => type.id === item.militaryTypeId
                  );
                  return (
                    <tr key={item.id} className="border-t">
                      <td className="p-4">
                        <span
                          className={`inline-block px-4 py-2 rounded-full ${
                            militaryType?.colorClass || "bg-gray-200"
                          }`}
                        >
                          {militaryType?.name || "未知"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="bg-gray-200 px-4 py-2 rounded-full">
                          {item.year}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="bg-gray-200 px-4 py-2 rounded-full">
                          {item.sequence}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="bg-gray-200 px-4 py-2 rounded-full">
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
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-200"
              >
                {showAll ? "顯示較少" : "顯示更多"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EnlistmentQuery;
