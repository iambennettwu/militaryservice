
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 shadow-md backdrop-blur-sm"
          : "bg-white/80"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="font-bold text-xl md:text-2xl">服役入伍資訊查詢</div>
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("enlistment-query")}
            className="text-gray-800 hover:text-black font-medium"
          >
            入伍日期
          </button>
          <button
            onClick={() => scrollToSection("discharge-calculator")}
            className="text-gray-800 hover:text-black font-medium"
          >
            退伍日試算
          </button>
          <button
            onClick={() => scrollToSection("latest-news")}
            className="text-gray-800 hover:text-black font-medium"
          >
            最新消息
          </button>
        </nav>
        <div className="md:hidden">
          {/* 行動裝置選單 */}
          <div className="dropdown dropdown-end">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-600"></div>
            </button>
            <div className="dropdown-content hidden absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
              <button
                onClick={() => scrollToSection("enlistment-query")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                入伍日期
              </button>
              <button
                onClick={() => scrollToSection("discharge-calculator")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                退伍日試算
              </button>
              <button
                onClick={() => scrollToSection("latest-news")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                最新消息
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
