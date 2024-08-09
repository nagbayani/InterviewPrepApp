import  Navbar  from "@/components/Navbar"

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className='container pt-8 pb-8 px-4 sm:px-8'>{children}</div>
    </div>
  );
}
