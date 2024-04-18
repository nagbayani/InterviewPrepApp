import HeroSection from "@/containers/hero-section/page";
import Sidebar from "@/containers/sidebar-section/page";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-row items-center justify-between pl-[160px] '>
      <Sidebar />
      <HeroSection />
    </main>
  );
}
