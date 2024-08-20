"use client";

import { cn } from "@/lib/utils";
import { useStore, useSidebarToggle } from "@/_store/sidebar-store";
import { useDeckStore } from "@/_store/index";

// import { Footer } from "@/components/admin-panel/footer";
import Sidebar from "@/containers/sidebar-section/Sidebar";
/**
 * Dashboard layout that holds Sidebar and Main content (NavBar, Content, Footer)
 * @param param0
 * @returns
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900  transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
          sidebar?.isOpen === true ? "ml-72" : "ml-[90px]"
        )}
      >
        {children}
      </main>
      {/* <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Footer />
      </footer> */}
    </>
  );
}
