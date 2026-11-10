"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  FileText,
  CreditCard,
  Settings,
  Building2,
  Users,
  Wallet,
  LogOut,
} from "lucide-react"

import Logo from "@/app/images/logo.png"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"

type MenuItem = {
  name: string
  url: string
  icon: React.ComponentType<{ className?: string }>
}

const menuItemsByRole: Record<string, MenuItem[]> = {
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { name: "Jobs", url: "/jobs", icon: Briefcase },
    { name: "Saved Jobs", url: "/dashboard/seeker/saved", icon: Bookmark },
    { name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
    { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { name: "My Company", url: "/dashboard/recruiter/company", icon: Building2 },
    { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
    { name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    { name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { name: "Payments", url: "/dashboard/admin/payments", icon: Wallet },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}

function roleLabel(role?: string | null) {
  switch (role) {
    case "recruiter":
      return "Recruiter"
    case "admin":
      return "Admin"
    default:
      return "Seeker"
  }
}

export function AppSidebar() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user
  const role = (user?.role as string) || "seeker"
  const items = menuItemsByRole[role] ?? menuItemsByRole.seeker

  // Guard: redirect unauthenticated visitors to sign-in (in an effect,
  // not during render, to avoid "setState during render" warnings).
  React.useEffect(() => {
    if (!isPending && !user) {
      router.push("/sign-in")
    }
  }, [isPending, user, router])

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <Sidebar className="border-r border-white/10 bg-[#1a1a1b]">
      <SidebarHeader className="px-4 py-5">
        <Link href="/" className="inline-flex shrink-0 items-center" aria-label="Hireloop home">
          <Image src={Logo} alt="Hireloop" className="h-9 w-[128px]" />
        </Link>
        <p className="mt-1 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-white/40">
          {roleLabel(role)} workspace
        </p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40">Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  render={<Link href={item.url} />}
                  className="text-white/80 hover:bg-white/10 hover:text-white data-[active=true]:bg-[#5c53fe]/20 data-[active=true]:text-white"
                >
                  <item.icon className="size-4" />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#5c53fe]/20 font-[family-name:var(--font-instrument-sans)] text-[14px] font-medium text-[#c7c3ff]">
              {(user.name || "U").charAt(0).toUpperCase()}
            </div>
            <div className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="truncate font-[family-name:var(--font-instrument-sans)] text-[14px] font-medium text-white">
                {user.name || "Account"}
              </span>
              <span className="truncate font-sans text-[12px] text-white/50">
                {user.email}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="shrink-0 text-white/60 hover:bg-white/10 hover:text-white"
              aria-label="Sign out"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        ) : null}
      </SidebarFooter>
    </Sidebar>
  )
}