
import { useState } from "react";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  url: string;
}

// 模擬資料，實際應從後端獲取
const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "延長替代役申請通知",
    date: "2025/04/25",
    url: "https://www.example.com/news/1",
  },
  {
    id: 2,
    title: "役男體檢時間調整公告",
    date: "2025/04/25",
    url: "https://www.example.com/news/2",
  },
  {
    id: 3,
    title: "國軍招募資訊日程表發布",
    date: "2025/04/25",
    url: "https://www.example.com/news/3",
  },
  {
    id: 4,
    title: "新制軍人薪資調整方案",
    date: "2025/04/24",
    url: "https://www.example.com/news/4",
  },
  {
    id: 5,
    title: "兵役法修正草案通過",
    date: "2025/04/23",
    url: "https://www.example.com/news/5",
  },
  {
    id: 6,
    title: "國防部徵兵制度說明會",
    date: "2025/04/20",
    url: "https://www.example.com/news/6",
  },
];

const LatestNews = () => {
  const [showAll, setShowAll] = useState(false);

  const displayNews = showAll ? mockNews : mockNews.slice(0, 3);

  return (
    <section id="latest-news" className="py-3">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-8">最新消息</h2>

          <ul className="divide-y divide-gray-200">
            {displayNews.map((news) => (
              <li key={news.id} className="py-4">
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-gray-50 p-2 rounded -m-2 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg">{news.title}</span>
                    <span className="text-gray-500">{news.date}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          {mockNews.length > 3 && (
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

export default LatestNews;
