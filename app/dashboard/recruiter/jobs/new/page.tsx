"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  DollarSign,
  MapPin,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { CTA_INNER_GLOW } from "@/components/cta-glow"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const
const CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Sales",
  "Operations",
  "Finance",
  "Customer Support",
]
const FREQUENCIES = ["per hour", "per day", "per month", "per year"]

type JobForm = {
  title: string
  company: string
  category: string
  jobType: (typeof JOB_TYPES)[number]
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: string
  responsibilities: string
  qualifications: string
}

const EMPTY: JobForm = {
  title: "",
  company: "",
  category: "Engineering & Tech",
  jobType: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per hour",
  responsibilities: "",
  qualifications: "",
}

export default function AddNewJobPage() {
  const router = useRouter()
  const [form, setForm] = useState<JobForm>(EMPTY)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const update = <K extends keyof JobForm>(key: K, value: JobForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    // TODO (integration): POST the job to the backend. For now, log the payload.
    console.info("[add-job] payload collected:", form)
    await new Promise((resolve) => setTimeout(resolve, 400))
    setIsSubmitting(false)
    router.push("/dashboard/recruiter/jobs")
  }

  return (
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/recruiter/jobs"
            className="inline-flex size-9 items-center justify-center rounded-[10px] border border-white/10 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Back to jobs"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <p className="font-sans text-[12px] leading-[1.4] text-white/40">
              Manage Job Posts / Add New Job
            </p>
            <h1 className="font-[family-name:var(--font-manrope)] text-[22px] font-bold leading-[1.2] text-white">
              Create Job Post
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-[12px] border-white/15 bg-transparent text-white hover:bg-white/10"
          >
            Save draft
          </Button>
          <Button
            type="submit"
            form="add-job-form"
            disabled={isSubmitting}
            className={cn(
              CTA_INNER_GLOW,
              "rounded-[12px] bg-[#5c53fe] text-white hover:bg-[#5c53fe]/90"
            )}
          >
            {isSubmitting ? "Publishing…" : "Create Job Post"}
          </Button>
        </div>
      </div>

      {/* Split layout: form (60%) + live preview (40%) */}
      <div className="grid flex-1 grid-cols-1 gap-6 overflow-auto p-6 lg:grid-cols-[3fr_2fr] lg:p-8">
        {/* LEFT: form */}
        <form id="add-job-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Section 1: Basic Information */}
          <Section title="Basic Information">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Job Title *">
                <div className="relative">
                  <Briefcase className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                  <Input
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder="Frontend Developer"
                    className="pl-10"
                    required
                  />
                </div>
              </Field>
              <Field label="Company Name *">
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                  <Input
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="HirePulse Network"
                    className="pl-10"
                    required
                  />
                </div>
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Job Category *">
                <Select value={form.category} onValueChange={(v) => update("category", v ?? form.category)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Job Type *">
                <div className="flex flex-wrap gap-2">
                  {JOB_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update("jobType", t)}
                      className={cn(
                        "rounded-[10px] border px-3 py-2 text-[14px] font-medium transition-colors",
                        form.jobType === t
                          ? "border-[#5c53fe] bg-[#5c53fe]/20 text-white"
                          : "border-white/15 bg-[#101010] text-white/70 hover:border-white/30"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          </Section>

          {/* Section 2: Location & Compensation */}
          <Section title="Location & Compensation">
            <div className="flex items-center justify-between rounded-[12px] border border-white/10 bg-[#101010] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-[10px] bg-[#5c53fe]/15">
                  <Sparkles className="size-4 text-[#5c53fe]" />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-instrument-sans)] text-[15px] font-medium text-white">
                    Remote work allowed
                  </p>
                  <p className="font-sans text-[12px] leading-[1.4] text-white/50">
                    Candidates can apply from anywhere.
                  </p>
                </div>
              </div>
              <Switch checked={form.isRemote} onCheckedChange={(v) => update("isRemote", v)} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Location">
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                  <Input
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="New York, USA"
                    className="pl-10"
                    disabled={form.isRemote}
                  />
                </div>
              </Field>
              <Field label="Application Deadline">
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                  <Input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => update("deadline", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Min Salary / Rate">
                <div className="relative">
                  <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                  <Input
                    type="number"
                    value={form.minSalary}
                    onChange={(e) => update("minSalary", e.target.value)}
                    placeholder="25"
                    className="pl-10"
                  />
                </div>
              </Field>
              <Field label="Max Salary / Rate">
                <div className="relative">
                  <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                  <Input
                    type="number"
                    value={form.maxSalary}
                    onChange={(e) => update("maxSalary", e.target.value)}
                    placeholder="40"
                    className="pl-10"
                  />
                </div>
              </Field>
              <Field label="Frequency">
                <Select value={form.frequency} onValueChange={(v) => update("frequency", v ?? form.frequency)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FREQUENCIES.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </Section>

          {/* Section 3: Job Description & Core Skills */}
          <Section title="Job Description & Core Skills">
            <Field label="Key Responsibilities">
              <Textarea
                value={form.responsibilities}
                onChange={(e) => update("responsibilities", e.target.value)}
                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                rows={5}
              />
            </Field>
            <Field label="Qualifications & Requirements">
              <Textarea
                value={form.qualifications}
                onChange={(e) => update("qualifications", e.target.value)}
                placeholder="• 3+ years of experience with React, TypeScript, and modern state architectures
• Solid understanding of DOM performance and component-driven designs
• Experience partnering closely with product teams and UI/UX designers"
                rows={5}
              />
            </Field>
          </Section>
        </form>

        {/* RIGHT: live preview */}
        <aside className="hidden flex-col gap-4 lg:flex">
          <div className="sticky top-6 rounded-[16px] border border-white/10 bg-[#1a1a1b] p-5">
            <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-white/40">
              Live preview
            </p>
            <div className="mt-4 rounded-[12px] border border-white/10 bg-[#101010] p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-[10px] bg-[#5c53fe]/15">
                  <Briefcase className="size-5 text-[#5c53fe]" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-[family-name:var(--font-instrument-sans)] text-[16px] font-medium text-white">
                    {form.title || "Job title"}
                  </p>
                  <p className="truncate font-sans text-[13px] text-white/50">
                    {form.company || "Company name"} · {form.category}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[12px] text-white/70">
                  {form.jobType}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[12px] text-white/70">
                  {form.isRemote ? "Remote" : form.location || "On-site"}
                </span>
                {form.minSalary && form.maxSalary ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[12px] text-white/70">
                    ${form.minSalary}–${form.maxSalary} {form.frequency}
                  </span>
                ) : null}
              </div>
              {form.responsibilities ? (
                <p className="mt-3 line-clamp-3 font-sans text-[13px] leading-[1.6] text-white/60">
                  {form.responsibilities}
                </p>
              ) : null}
            </div>
            <div className="mt-4 flex items-center gap-2 text-[12px] text-white/40">
              <span className="size-2 rounded-full bg-emerald-400" />
              Preview updates as you type
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[16px] border border-white/10 bg-[#1a1a1b] p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <h2 className="font-[family-name:var(--font-space-mono)] text-[12px] uppercase tracking-wide text-white/60">
          {title}
        </h2>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="font-sans text-[14px] leading-[1.5] text-white/80">{label}</Label>
      {children}
    </div>
  )
}