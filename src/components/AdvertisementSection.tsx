
import { useEffect, useRef } from "react";

interface AdvertisementProps {
  adCode?: string;
}

const AdvertisementSection = ({ adCode = "" }: AdvertisementProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adCode && adContainerRef.current) {
      // 此處將廣告代碼插入到DOM中
      adContainerRef.current.innerHTML = adCode;

      // 如果有需要執行的script標籤
      const scripts = adContainerRef.current.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        Array.from(script.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.appendChild(document.createTextNode(script.innerHTML));
        script.parentNode?.replaceChild(newScript, script);
      });
    }
  }, [adCode]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 min-h-[200px] flex items-center justify-center">
          {/* 廣告容器 */}
          {adCode ? (
            <div ref={adContainerRef} className="w-full h-full">
              {/* 廣告內容將在此動態插入 */}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <p>廣告區塊</p>
              <p className="text-sm">透過後台管理設定 Google Adsense 代碼</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdvertisementSection;
