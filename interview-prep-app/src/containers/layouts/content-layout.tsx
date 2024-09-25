import Navbar from "@/components/Navbar";
import useMembership from "@/hooks/use-membership";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}
/**
 * Layout wrapper for content pages. Contains Navbar and children components.
 * @param param0
 * @returns
 */
export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    // <div>
    <>
      <Navbar />
      <div className='content-container h-[100vh] pt-8 pb-8 px-4 sm:px-8'>
        {children}
      </div>
    </>
    // </div>
  );
}
