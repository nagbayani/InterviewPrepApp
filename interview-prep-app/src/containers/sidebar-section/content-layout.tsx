import Navbar from "@/components/Navbar";

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
    <div>
      <Navbar />
      <div className='container pt-8 pb-8 px-4 sm:px-8'>{children}</div>
    </div>
  );
}
