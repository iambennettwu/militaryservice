
import { useEffect, useRef } from "react";
import { useAdvertisements } from "@/hooks/useAdvertisements";

const AdvertisementSection = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const { data: advertisement } = useAdvertisements();

  useEffect(() => {
    if (advertisement?.ad_code && adContainerRef.current) {
      adContainerRef.current.innerHTML = advertisement.ad_code;
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
  }, [advertisement?.ad_code]);

  if (!advertisement?.ad_code) return null;

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
