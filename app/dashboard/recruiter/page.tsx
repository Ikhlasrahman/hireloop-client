import { LayoutDashboard, Building2, Briefcase, FileText } from "lucide-react"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { CTA_INNER_GLOW } from "@/components/cta-glow"
import { cn } from "@/lib/utils"

const STATS = [
  { label: "Active job posts", value: "6", icon: Briefcase },
  { label: "Total applicants", value: "84", icon: FileText },
  { label: "Companies", value: "1", icon: Building2 },
  { label: "Hires this month", value: "3", icon: LayoutDashboard },
]

export default function RecruiterDashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-manrope)] text-[28px] font-bold leading-[1.2] text-white">
            Recruiter Dashboard
          </h1>
          <p className="mt-1 font-[family-name:var(--font-inter-tight)] text-[15px] leading-[1.6] text-white/60">
            Manage your company, job posts, and incoming applications.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/dashboard/recruiter/jobs/new" />}
          className={cn(CTA_INNER_GLOW, "rounded-[12px] bg-[#5c53fe] text-white hover:bg-[#5c53fe]/90")}
        >
          Post a new job
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[16px] border border-white/10 bg-[#1a1a1b] p-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-sans text-[13px] leading-[1.5] text-white/50">
                {stat.label}
              </span>
              <stat.icon className="size-4 text-[#5c53fe]" />
            </div>
            <p className="mt-3 font-[family-name:var(--font-manrope)] text-[32px] font-bold leading-[1] text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}