
import { useState } from "react";
import { useNews } from "@/hooks/useNews";

const LatestNews = () => {
  const [showAll, setShowAll] = useState(false);
  const { data: news = [], isLoading } = useNews();

  const displayNews = showAll ? news : news.slice(0, 3);

  return (
    <section id="latest-news" className="py-3">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-8">最新消息</h2>

          {isLoading ? (
            <div className="text-center py-4">載入中...</div>
          ) : (
            <>
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

              {news.length > 3 && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-200"
                  >
                    {showAll ? "顯示較少" : "顯示更多"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
