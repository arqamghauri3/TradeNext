import TickerTape from "@/components/TickerTape";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen min-h-screen px-3">
        <div className="flex">
          <SidebarTrigger />
          <TickerTape />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
