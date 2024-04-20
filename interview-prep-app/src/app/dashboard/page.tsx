import HeroSection from "../../containers/hero-section/page";
import Sidebar from "../../containers/sidebar-section/page";

export default function Dashboard() {
  return (
    <div className='flex min-h-screen flex-row items-center justify-between pl-[160px] '>
      <Sidebar />
      <HeroSection />
    </div>
  );
}
