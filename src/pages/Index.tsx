
import Navbar from "@/components/Navbar";
import EnlistmentQuery from "@/components/EnlistmentQuery";
import DischargeCalculator from "@/components/DischargeCalculator";
import LatestNews from "@/components/LatestNews";
import AdvertisementSection from "@/components/AdvertisementSection";
import Footer from "@/components/Footer";

const Index = () => {
  const siteConfig = {
    email: "test@gamil.com",
    adCode: "",  // Google AdSense代碼，從後台管理設定
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <main className="space-y-6">
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
