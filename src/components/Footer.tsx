
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const { data: siteConfig } = useSiteConfig();

  return (
    <footer className={cn("bg-gray-100 py-8", className)}>
      <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
        <p className="mb-2">服役入伍資訊查詢．問題回報信箱：{siteConfig?.email || "載入中..."}</p>
        <p>
          本網站資訊僅供參考，請以政府主管機關公告資訊為準。
        </p>
      </div>
    </footer>
  );
};

export default Footer;
