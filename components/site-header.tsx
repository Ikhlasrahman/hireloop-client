"use client"

import Image from "next/image"
import Link from "next/link"
import { MenuIcon, LogOutIcon } from "lucide-react"

import Logo from "@/app/images/logo.png"
import { Button } from "@/components/ui/button"
import { CTA_INNER_GLOW } from "@/components/cta-glow"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
] as const

function GetStartedButton({ className }: { className?: string }) {
  return (
    <Button
      nativeButton={false}
      className={cn(
        CTA_INNER_GLOW,
        "h-[52px] rounded-[12px] bg-[#5c53fe] px-[22.5px] font-[family-name:var(--font-instrument-sans)] text-[18px] font-medium leading-[1.45] text-white hover:bg-[#5c53fe]/80",
        className
      )}
      render={<Link href="/sign-up" />}
    >
      Get Started
    </Button>
  )
}

function SignInButton({ className }: { className?: string }) {
  return (
    <Button
      nativeButton={false}
      variant="ghost"
      className={cn(
        "h-[58px] rounded-[12px] px-6 font-[family-name:var(--font-manrope)] text-[18px] font-semibold leading-[1.45] text-[#5c53fe] hover:bg-[#5c53fe]/10 hover:text-[#5c53fe]",
        className
      )}
      render={<Link href="/sign-in" />}
    >
      Sign In
    </Button>
  )
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

function UserBlock({
  user,
  onSignOut,
}: {
  user: { name?: string | null; email?: string | null; role?: string | null }
  onSignOut: () => void
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-end leading-tight">
        <span className="font-[family-name:var(--font-instrument-sans)] text-[15px] font-medium text-white">
          {user.name || "Account"}
        </span>
        <span className="font-sans text-[12px] leading-[1.4] text-white/50">
          {user.email}
        </span>
      </div>
      <span className="rounded-full border border-[#5c53fe]/40 bg-[#5c53fe]/15 px-2.5 py-1 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-[#c7c3ff]">
        {roleLabel(user.role)}
      </span>
      <Button
        type="button"
        onClick={onSignOut}
        variant="ghost"
        className="h-[40px] rounded-[10px] px-3 font-[family-name:var(--font-manrope)] text-[14px] font-semibold text-white/70 hover:bg-white/10 hover:text-white"
        aria-label="Sign out"
      >
        <LogOutIcon className="size-4" />
      </Button>
    </div>
  )
}

function MobileUserBlock({
  user,
  onSignOut,
}: {
  user: { name?: string | null; email?: string | null; role?: string | null }
  onSignOut: () => void
}) {
  return (
    <div className="flex flex-col gap-3 px-3 py-2">
      <div className="flex flex-col gap-0.5">
        <span className="font-[family-name:var(--font-instrument-sans)] text-[16px] font-medium text-white">
          {user.name || "Account"}
        </span>
        <span className="font-sans text-[13px] leading-[1.5] text-white/50">
          {user.email}
        </span>
        <span className="mt-1 w-fit rounded-full border border-[#5c53fe]/40 bg-[#5c53fe]/15 px-2.5 py-1 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-[#c7c3ff]">
          {roleLabel(user.role)}
        </span>
      </div>
      <Button
        type="button"
        onClick={onSignOut}
        variant="ghost"
        className="h-12 w-full justify-start gap-2 rounded-[10px] px-3 font-[family-name:var(--font-manrope)] text-[15px] font-semibold text-white/80 hover:bg-white/10 hover:text-white"
      >
        <LogOutIcon className="size-4" />
        Sign out
      </Button>
    </div>
  )
}

export function SiteHeader() {
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user

  const router = useRouter()
  const handleSignOut = async () => {
    await authClient.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="relative z-20 px-4 pt-6 sm:px-6 lg:px-[60px]">
      {/* Figma: "Frame 2147234461" — 1320×74,(radius 16,bg) #222 */}
      <div className="mx-auto flex h-[74px] max-w-[1320px] items-center justify-between rounded-[16px] bg-[#222222]">
        <Link
          href="/"
          className="ml-6 inline-flex shrink-0 items-center"
          aria-label="Hireloop home"
        >
          {/* Figma: "logo 1" — 154×44 */}
          <Image
            src={Logo}
            alt="Hireloop"
            className="h-11 w-[154px]"
            priority
          />
        </Link>

        {/* Figma: "nav-bar" — desktop */}
        <nav
          className="hidden h-full items-center pl-8 pr-2 lg:flex"
          aria-label="Main"
        >
          {/* Links */}
          <div className="flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[16px] leading-[1.8] tracking-[-0.2px] text-white transition-colors hover:text-white/80"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <span
            className="mx-6 h-6 w-px bg-[#a8a8a8]/40"
            aria-hidden="true"
          />

          {/* CTAs / user block — conditional rendering */}
          <div className="flex h-[58px] items-center gap-4">
            {isPending ? null : user ? (
              <UserBlock user={user} onSignOut={handleSignOut} />
            ) : (
              <>
                <SignInButton />
                <GetStartedButton />
              </>
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="mr-4 text-white hover:bg-white/10 hover:text-white lg:hidden"
              />
            }
          >
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[320px] max-w-[85vw] gap-0 border-none bg-[#222222] p-0"
          >
            <SheetHeader className="border-b border-white/10 px-6 py-4">
              <SheetTitle className="font-heading text-base font-medium">
                <Image src={Logo} alt="" className="h-9 w-fit" />
              </SheetTitle>
            </SheetHeader>
            <nav
              className="flex flex-col gap-1 px-3 py-4"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-[16px] leading-[1.8] tracking-[-0.2px] text-white transition-colors hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 px-6 pb-6">
              {isPending ? null : user ? (
                <MobileUserBlock user={user} onSignOut={handleSignOut} />
              ) : (
                <>
                  <SignInButton className="h-12 w-full" />
                  <GetStartedButton className="w-full" />
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}