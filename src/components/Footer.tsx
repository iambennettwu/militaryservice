
import { useSiteConfig } from "@/hooks/useSiteConfig";

const Footer = () => {
  const { data: siteConfig } = useSiteConfig();

  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
        <p className="mb-2">服役入伍資訊查詢 • 問題回報信箱：{siteConfig?.email || "載入中..."}</p>
        <p>
          本網站資訊僅供參考，實際資訊請以政府主管機關公告為主
        </p>
      </div>
    </footer>
  );
};

export default Footer;
