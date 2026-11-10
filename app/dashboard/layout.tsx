import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-[#010103] text-white">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <SidebarTrigger className="text-white hover:bg-white/10" />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  )
}