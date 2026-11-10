import Link from "next/link"
import { Plus, Briefcase } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CTA_INNER_GLOW } from "@/components/cta-glow"
import { cn } from "@/lib/utils"

const JOBS = [
  { title: "Senior Frontend Engineer", type: "Full-time", location: "New York, USA", applicants: 24, status: "Active" },
  { title: "Product Designer", type: "Contract", location: "Remote", applicants: 12, status: "Active" },
  { title: "Backend Engineer", type: "Full-time", location: "London, UK", applicants: 8, status: "Draft" },
]

export default function RecruiterJobsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-manrope)] text-[28px] font-bold leading-[1.2] text-white">
            Manage Job Posts
          </h1>
          <p className="mt-1 font-[family-name:var(--font-inter-tight)] text-[15px] leading-[1.6] text-white/60">
            Oversee all active listings and historical job posts.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/dashboard/recruiter/jobs/new" />}
          className={cn(CTA_INNER_GLOW, "rounded-[12px] bg-[#5c53fe] text-white hover:bg-[#5c53fe]/90")}
        >
          <Plus className="size-4" />
          Add New Job
        </Button>
      </div>

      <div className="overflow-hidden rounded-[16px] border border-white/10 bg-[#1a1a1b]">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 border-b border-white/10 px-5 py-3 text-[12px] font-medium uppercase tracking-wide text-white/40">
          <span>Job</span>
          <span>Type</span>
          <span>Location</span>
          <span>Applicants</span>
          <span>Status</span>
        </div>
        {JOBS.map((job) => (
          <div
            key={job.title}
            className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-4 border-b border-white/5 px-5 py-4 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-[10px] bg-[#5c53fe]/15">
                <Briefcase className="size-4 text-[#5c53fe]" />
              </div>
              <span className="font-[family-name:var(--font-instrument-sans)] text-[15px] font-medium text-white">
                {job.title}
              </span>
            </div>
            <span className="font-sans text-[14px] text-white/70">{job.type}</span>
            <span className="font-sans text-[14px] text-white/70">{job.location}</span>
            <span className="font-sans text-[14px] text-white/70">{job.applicants}</span>
            <span
              className={cn(
                "w-fit rounded-full px-2.5 py-1 text-[12px] font-medium",
                job.status === "Active"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-white/10 text-white/50"
              )}
            >
              {job.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}