import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar />
      <main className="grow">
        {children}
      </main>
      <MainFooter />
    </div>
  );
}

