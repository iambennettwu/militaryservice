
import Navbar from "@/components/Navbar";
import EnlistmentQuery from "@/components/EnlistmentQuery";
import DischargeCalculator from "@/components/DischargeCalculator";
import LatestNews from "@/components/LatestNews";
import AdvertisementSection from "@/components/AdvertisementSection";
import Footer from "@/components/Footer";

const Index = () => {
  // 這些數據在實際應用中應從後台獲取
  const siteConfig = {
    email: "test@gamil.com",
    adCode: "",  // Google AdSense代碼，從後台管理設定
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <EnlistmentQuery />
        <DischargeCalculator />
        <LatestNews />
        <AdvertisementSection adCode={siteConfig.adCode} />
      </main>
      <Footer email={siteConfig.email} />
    </div>
  );
};

export default Index;
