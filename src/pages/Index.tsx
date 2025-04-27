
import Navbar from "@/components/Navbar";
import EnlistmentQuery from "@/components/EnlistmentQuery";
import DischargeCalculator from "@/components/DischargeCalculator";
import LatestNews from "@/components/LatestNews";
import AdvertisementSection from "@/components/AdvertisementSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <main className="pt-20 space-y-6">  {/* Adjusted space-y from space-y-3 to space-y-6 */}
        <EnlistmentQuery />
        <DischargeCalculator />
        <LatestNews />
        <AdvertisementSection />
      </main>
      <Footer className="mt-6" /> {/* Adjusted margin to match other sections */}
    </div>
  );
};

export default Index;
