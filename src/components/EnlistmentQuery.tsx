import { useState } from "react";
import { militaryTypes } from "@/data/militaryTypes";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEnlistmentDates } from "@/hooks/useEnlistmentDates";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface EnlistmentData {
  id: string;
  militaryTypeId: string;
  military_type_id: string;
  year: number;
  sequence: number;
  date: string;
}

const ITEMS_PER_PAGE = 5;

const EnlistmentQuery = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof EnlistmentData | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  const { data: enlistmentData = [], isLoading } = useEnlistmentDates();

  const processData = (data: EnlistmentData[]) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    let filteredData = data.map(item => ({
      ...item,
      militaryTypeId: item.military_type_id,
    })).filter(item => {
      const [month, day] = item.date.split("/").map(Number);
      return (
        item.year > currentYear ||
        (item.year === currentYear &&
          (month > currentMonth ||
            (month === currentMonth && day >= currentDay)))
      );
    });

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

  const filteredData = processData(enlistmentData);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <section id="enlistment-query" className="py-3">
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
            {isLoading ? (
              <div className="text-center text-white py-4">載入中...</div>
            ) : (
              <>
                <table className="w-full text-white">
                  <thead>
                    <tr className="text-left border-b border-gray-700">
                      <th className="p-4 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          onClick={() => toggleSort('militaryTypeId')}
                          className="text-white hover:text-gray-300 flex items-center gap-2"
                        >
                          服役役別
                          {sortConfig.key === 'militaryTypeId' && (
                            sortConfig.direction === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                          )}
                        </Button>
                      </th>
                      <th className="p-4 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          onClick={() => toggleSort('year')}
                          className="text-white hover:text-gray-300 flex items-center gap-2"
                        >
                          入伍年度
                          {sortConfig.key === 'year' && (
                            sortConfig.direction === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                          )}
                        </Button>
                      </th>
                      <th className="p-4 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          onClick={() => toggleSort('sequence')}
                          className="text-white hover:text-gray-300 flex items-center gap-2"
                        >
                          入伍梯次
                          {sortConfig.key === 'sequence' && (
                            sortConfig.direction === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                          )}
                        </Button>
                      </th>
                      <th className="p-4 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          onClick={() => toggleSort('date')}
                          className="text-white hover:text-gray-300 flex items-center gap-2"
                        >
                          入伍日期
                          {sortConfig.key === 'date' && (
                            sortConfig.direction === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                          )}
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
                            <span className={`inline-block px-4 py-2 rounded-full text-black ${militaryType?.colorClass || "bg-gray-700"}`}>
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
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                          className={`bg-gray-800 text-white hover:bg-gray-700 ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <span className="px-4 py-2 bg-gray-800 text-white rounded-md">
                          {currentPage} / {totalPages || 1}
                        </span>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                          className={`bg-gray-800 text-white hover:bg-gray-700 ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnlistmentQuery;
