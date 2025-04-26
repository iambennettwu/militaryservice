
import Navbar from "@/components/Navbar";
import EnlistmentQuery from "@/components/EnlistmentQuery";
import DischargeCalculator from "@/components/DischargeCalculator";
import LatestNews from "@/components/LatestNews";
import AdvertisementSection from "@/components/AdvertisementSection";
import Footer from "@/components/Footer";

const Index = () => {
  const siteConfig = {
    email: "test@gamil.com",
    adCode: "",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <main className="pt-20 space-y-3"> {/* Added pt-20 for navbar and reduced space-y */}
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
