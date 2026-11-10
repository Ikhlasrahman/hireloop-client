import Image from "next/image"
import type { ReactNode } from "react"
import { MapPinIcon, SearchIcon } from "lucide-react"

import Globe from "@/app/images/globe.png"
import { cn } from "@/lib/utils"

const TRENDING_POSITIONS = ["Product Designer", "AI Engineering", "Dev-ops Engineer"] as const

const STATS = [
  { icon: <JobSearchIcon />, value: "50K", label: "Active Jobs" },
  { icon: <RankingIcon />, value: "12K", label: "Companies" },
  { icon: <JobSearchManIcon />, value: "2M", label: "Job Seekers" },
  { icon: <StarRateIcon />, value: "97%", label: "Satisfication Rate" },
] as const

/**
 * hugeicons:job-search — briefcase with a magnifying glass (Figma stat card icon).
 */
function JobSearchIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7.75 5.25V4A1.25 1.25 0 0 1 9 2.75h6A1.25 1.25 0 0 1 16.25 4v1.25" />
      <rect x="2.75" y="6.25" width="18.5" height="14" rx="2" />
      <circle cx="16.5" cy="16.5" r="3.75" />
      <path d="M19.3 19.3l2 2" />
    </svg>
  )
}

/**
 * icon-park:ranking — three ascending/sorted bars (Figma stat card icon).
 */
function RankingIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="9.5" width="6.5" height="11.5" rx="1.2" />
      <rect x="8.75" y="2.5" width="6.5" height="18.5" rx="1.2" />
      <rect x="15.5" y="13.5" width="6.5" height="7.5" rx="1.2" />
    </svg>
  )
}

/**
 * streamline-ultimate:job-search-man — person looking through a magnifier (Figma stat card icon).
 */
function JobSearchManIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9.5" cy="5.5" r="3.25" />
      <path d="M2 21.25v-2A7.75 7.75 0 0 1 9.75 11.5h2.5" />
      <circle cx="16" cy="16" r="4.5" />
      <path d="M19.5 19.5l2.25 2.25" />
    </svg>
  )
}

/**
 * material-symbols:star-rate-outline-rounded — filled white star (Figma stat card icon).
 */
function StarRateIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3.62l2.09 5.01 5.41.44-4.12 3.53 1.25 5.28L12 15.5l-4.63 2.38 1.25-5.28-4.12-3.53 5.41-.44L12 3.62z" />
    </svg>
  )
}

/**
 * fi_5517030 — multicolour briefcase illustration inside the announcement badge.
 */
function BriefcaseBadgeIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hl-badge-line" x1="12" y1="2.5" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EDF7FF" />
          <stop offset="1" stopColor="#BAC8FA" />
        </linearGradient>
        <linearGradient id="hl-badge-body" x1="4" y1="6" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C86D36" />
          <stop offset="1" stopColor="#883F2F" />
        </linearGradient>
        <linearGradient id="hl-badge-latch" x1="0" y1="4.2" x2="0" y2="7.3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEA85A" />
          <stop offset="1" stopColor="#FEA613" />
        </linearGradient>
        <linearGradient id="hl-badge-foot" x1="0" y1="20.5" x2="0" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5A5A5A" />
          <stop offset="1" stopColor="#444444" />
        </linearGradient>
      </defs>
      <path
        d="M8.6 6.1V4.6c0-.44.36-.8.8-.8h5.2c.44 0 .8.36.8.8v1.5"
        stroke="url(#hl-badge-line)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <rect x="2.5" y="6" width="19" height="14.7" rx="1.8" fill="url(#hl-badge-body)" />
      <path d="M2.5 10.6h19" stroke="#7a3a2c" strokeWidth="1.1" />
      <rect x="5.9" y="4.2" width="3.2" height="3" rx="0.5" fill="url(#hl-badge-latch)" />
      <rect x="14.9" y="4.2" width="3.2" height="3" rx="0.5" fill="url(#hl-badge-latch)" />
      <rect x="3.9" y="20.7" width="2.2" height="1.5" rx="0.4" fill="url(#hl-badge-foot)" />
      <rect x="17.9" y="20.7" width="2.2" height="1.5" rx="0.4" fill="url(#hl-badge-foot)" />
    </svg>
  )
}

/**
 * "Figma: Frame 2147234462" — announcement pill with gradient hairline stroke
 * and gradient side rules (64px each).
 */
function TrendBadge({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-[50px] items-center", className)}>
      {/* Line 3 — fades in towards the pill */}
      <span
        aria-hidden="true"
        className="h-px w-16 self-center bg-[linear-gradient(90deg,rgba(1,1,35,0)_0%,#a8a8a8_100%)] opacity-70 max-sm:hidden"
      />
      <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(168,168,167,0.45)_0%,rgba(153,153,153,0)_100%)] p-px max-sm:mx-auto">
        {/* Frame 2147234446 — 419×48 */}
        <div className="flex h-[46px] items-center rounded-[23px] bg-[linear-gradient(180deg,#474747_0%,#010103_100%)] sm:w-[417px]">
          <BriefcaseBadgeIcon className="ml-6 shrink-0" />
          <span className="ml-4 truncate font-[family-name:var(--font-space-mono)] text-[16px] uppercase leading-[1.2] text-white sm:text-[20px]">
            50,000+ new jobs this month
          </span>
        </div>
      </div>
      {/* Line 2 — fades out towards the right */}
      <span
        aria-hidden="true"
        className="h-px w-16 self-center bg-[linear-gradient(90deg,#a8a8a8_0%,rgba(1,1,35,0)_100%)] opacity-70 max-sm:hidden"
      />
    </div>
  )
}

/**
 * One of the two input zones inside the search bar (Figma: Frame 2147234459 / 2147234458).
 */
function SearchInputZone({
  icon,
  placeholder,
  className,
}: {
  icon: ReactNode
  placeholder: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex h-16 w-full items-center gap-2 rounded-[16px] border border-white/20 bg-[#101010] pl-6 lg:h-full lg:w-[316px] lg:shrink-0 lg:rounded-none lg:border-0 lg:bg-transparent",
        className
      )}
    >
      {icon}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent font-[family-name:var(--font-satoshi)] text-[16px] leading-[1.7] text-white/80 outline-none placeholder:text-white/80"
      />
    </div>
  )
}

/**
 * "Figma: Frame 1" — 784×64 combined search bar.
 */
function HeroSearchBar() {
  return (
    <div
      role="search"
      className="mx-auto mt-12 flex w-full max-w-[784px] flex-col lg:h-16 lg:flex-row lg:items-center lg:rounded-[16px] lg:border lg:border-white/20 lg:bg-[#101010]"
    >
      <SearchInputZone
        icon={<SearchIcon strokeWidth={1.5} className="size-6 shrink-0 text-white" />}
        placeholder="Job tilte, skill or company"
      />
      {/* Line 1 — vertical divider at x=364 of the bar */}
      <span
        aria-hidden="true"
        className="h-[23px] w-px shrink-0 bg-white/20 max-lg:hidden lg:ml-6 lg:mr-[23px]"
      />
      <SearchInputZone
        className="max-lg:pl-6 lg:pl-0"
        icon={<MapPinIcon strokeWidth={1.5} className="size-6 shrink-0 text-white" />}
        placeholder="Location or Remote"
      />
      {/* Buttons — 48×48 */}
      <button
        type="button"
        aria-label="Search jobs"
        className="mx-2 mt-3 grid size-12 shrink-0 place-items-center rounded-[12px] bg-[#5c53fe] text-white transition-colors hover:bg-[#5c53fe]/90 lg:mx-0 lg:ml-6 lg:mr-2 lg:mt-0"
      >
        <SearchIcon className="size-6" />
      </button>
    </div>
  )
}

/**
 * One stat card (Figma: "Stats 2/7/6/5" — 312×254).
 */
function StatCard({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <article
      className="flex h-[254px] flex-col rounded-[16px] border border-white/10 p-6 bg-[linear-gradient(0deg,#010103_0%,#313131_100%)]"
    >
      {icon}
      <div className="mt-auto">
        <div className="font-[family-name:var(--font-plus-jakarta-sans)] text-[52px] font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-[56px]">
          {value}
        </div>
        <div className="mt-4 font-[family-name:var(--font-inter-tight)] text-[18px] leading-[1.65] text-white">
          {label}
        </div>
      </div>
    </article>
  )
}

/**
 * Homepage hero + stats band (Figma: "Homepage" frame, session 12022).
 * Background is the flattened Figma decor (globe glow, dot map, purple bulb).
 */
export function SiteHero() {
  return (
    <section className="relative -mt-[98px] isolate overflow-hidden bg-[#010103] pt-[98px]">
      {/* Flattened hero decor — pink top glow, dot map, purple bulb + dark globe.
          Figma: "Group 1" — 1440×1882 at the top of the page. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center">
        <Image
          src={Globe}
          alt=""
          width={1440}
          height={1882}
          priority
          className="h-[1882px] w-[1440px] max-w-none"
        />
      </div>

      {/* Hero Section Title + search (Figma: Frame 2147234456, top at y=274) */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6">
        <TrendBadge className="mt-24 sm:mt-[176px]" />
        <h1 className="mt-8 text-center font-[family-name:var(--font-manrope)] text-[36px] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-[48px] lg:text-[56px]">
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 max-w-[784px] text-center font-[family-name:var(--font-manrope)] text-[16px] leading-[1.6] text-white/70 sm:text-[20px]">
          HireLoop connects top talent with world-class companies. Browse thousands of curated
          opportunities and land your next role — faster.
        </p>
        <HeroSearchBar />
        {/* Frame 2147234453 — trending row */}
        <div className="mt-6 flex max-w-[784px] flex-wrap items-center justify-center gap-x-4 gap-y-3">
          <span className="text-[16px] font-medium leading-[1.3] text-white/70">
            Trending Position
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {TRENDING_POSITIONS.map((position) => (
              <a
                key={position}
                href="/jobs"
                className="flex h-[33px] items-center rounded-[24px] border border-white/10 bg-[#1a1a1b] px-3 font-[family-name:var(--font-manrope)] text-[14px] leading-[1.5] text-white transition-colors hover:border-white/25 hover:bg-[#242425]"
              >
                {position}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Stats band (Figma: Frame 2147234448) */}
      <div className="relative z-10 mt-[140px] sm:mt-[220px] lg:mt-[358px]">
        <p className="mx-auto max-w-[600px] px-4 text-center font-[family-name:var(--font-instrument-sans)] text-[28px] font-medium leading-[1.3] text-white/70 tracking-[-1px] sm:px-0 lg:text-[40px]">
          Assisting over 15,000 job seekers find their dream positions.
        </p>
        <div className="mx-auto mt-12 grid w-full max-w-[1320px] grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:gap-6 sm:px-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} icon={stat.icon} value={stat.value} label={stat.label} />
          ))}
        </div>
        {/* Bottom padding of the stats band */}
        <div className="h-[72px]" />
      </div>
    </section>
  )
}
