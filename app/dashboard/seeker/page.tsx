import { LayoutDashboard, Briefcase, Bookmark, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CTA_INNER_GLOW } from "@/components/cta-glow"
import { cn } from "@/lib/utils"

const STATS = [
  { label: "Active applications", value: "12", icon: FileText },
  { label: "Saved jobs", value: "8", icon: Bookmark },
  { label: "Recommended jobs", value: "24", icon: Briefcase },
  { label: "Profile views", value: "156", icon: LayoutDashboard },
]

export default function SeekerDashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-[family-name:var(--font-manrope)] text-[28px] font-bold leading-[1.2] text-white">
          Seeker Dashboard
        </h1>
        <p className="mt-1 font-[family-name:var(--font-inter-tight)] text-[15px] leading-[1.6] text-white/60">
          Track your applications, saved jobs, and recommendations.
        </p>
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

      <div className="mt-6 flex flex-wrap gap-3">
        <Button className={cn(CTA_INNER_GLOW, "rounded-[12px] bg-[#5c53fe] text-white hover:bg-[#5c53fe]/90")}>
          Browse jobs
        </Button>
        <Button variant="outline" className="rounded-[12px] border-white/15 bg-transparent text-white hover:bg-white/10">
          View applications
        </Button>
      </div>
    </div>
  )
}