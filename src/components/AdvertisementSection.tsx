
import { useEffect, useRef } from "react";

interface AdvertisementProps {
  adCode?: string;
}

const AdvertisementSection = ({ adCode = "" }: AdvertisementProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adCode && adContainerRef.current) {
      adContainerRef.current.innerHTML = adCode;
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

  if (!adCode) return null;

  return (
    <section>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 min-h-[200px] flex items-center justify-center">
          <div ref={adContainerRef} className="w-full h-full" />
        </div>
      </div>
    </section>
  );
};

export default AdvertisementSection;
