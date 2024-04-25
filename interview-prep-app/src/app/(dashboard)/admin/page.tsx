import HeroSection from "../../../containers/hero-section/Hero";
import Sidebar from "../../../containers/sidebar-section/Sidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return (
      <div className='flex min-h-screen flex-row items-center justify-between pl-[160px] '>
        <h1>Dashboard - Welcome Back {session?.user.username} </h1>;
        <Sidebar />
        <HeroSection />
      </div>
    );
  }

  return (
    <h2 className='items-center text-2xl '>
      Please Login to see this admin page
    </h2>
  );
};

export default Dashboard;
