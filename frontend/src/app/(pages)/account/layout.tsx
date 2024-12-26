import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AccountHeader from "./components/AccountHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AccountHeader />
      <SidebarProvider>
      <AppSidebar />
        <main className="flex-1" tabIndex={0}>
          <SidebarTrigger className="fixed mt-[107px] ml-2" />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
