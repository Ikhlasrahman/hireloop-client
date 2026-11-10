import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"

import Logo from "@/app/images/logo.png"

/**
 * Shared shell for the (auth) route group — dark canvas with the same
 * purple glow treatment as the homepage hero, and the logo linking home.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-[#010103]">
      {/* Ambient purple glow, matching the hero background treatment */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[560px] overflow-hidden"
      >
        <div className="absolute left-1/2 top-[-430px] h-[900px] w-[1240px] -translate-x-1/2 rounded-full bg-[#5c53fe]/25 blur-[140px]" />
      </div>

      <header className="relative z-10 px-4 pt-6 sm:px-6 lg:px-[60px]">
        <Link href="/" className="inline-flex shrink-0 items-center" aria-label="Hireloop home">
          {/* Figma: "logo 1" — 154×44 */}
          <Image src={Logo} alt="Hireloop" className="h-11 w-[154px]" priority />
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
        {children}
      </main>
    </div>
  )
}
