"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { FormEvent, MouseEvent } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CTA_INNER_GLOW } from "@/components/cta-glow"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

type FieldErrors = {
  email?: string
  password?: string
  form?: string
}

/**
 * Payload exactly shaped for the future auth call:
 * authClient.signIn.email({ email, password, rememberMe })
 */
type SignInPayload = {
  email: string
  password: string
  rememberMe: boolean
}

export function SignInForm() {
  const router = useRouter()
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    // ── Collect the payload FROM THE FORM ────────────────────────────────
    const payload: SignInPayload = {
      email: String(data.get("email") ?? "").trim(),
      password: String(data.get("password") ?? ""),
      rememberMe: data.get("rememberMe") === "on",
    }
    // ─────────────────────────────────────────────────────────────────────

    // Client-side validation
    const nextErrors: FieldErrors = {}
    if (!payload.email) {
      nextErrors.email = "Email is required."
    } else if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
      nextErrors.email = "Enter a valid email address."
    }
    if (!payload.password) {
      nextErrors.password = "Password is required."
    }
    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // ── Authenticate with Better Auth (email + password) ─────────────────
    setIsSubmitting(true)
    try {
      const { error } = await authClient.signIn.email({
        email: payload.email,
        password: payload.password,
        rememberMe: payload.rememberMe,
      })
      if (error) {
        setFieldErrors({ form: error.message ?? "Invalid email or password." })
        return
      }
      // Session cookie is set — go to the role-based dashboard.
      router.push("/dashboard")
      router.refresh()
    } catch {
      setFieldErrors({ form: "Something went wrong. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
    // ─────────────────────────────────────────────────────────────────────
  }

  function handleGoogleClick(event: MouseEvent<HTMLButtonElement>) {
    // TODO (integration): needs GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET in .env
    event.preventDefault()
    void authClient.signIn.social({ provider: "google" })
  }

  return (
    <div className="w-full max-w-[480px] rounded-[16px] border border-white/10 bg-[#1a1a1b] px-6 py-10 sm:px-10">
      {/* Mono tag with gradient rules, echoing the homepage announcement badge */}
      <div className="flex items-center justify-center gap-3">
        <span
          aria-hidden="true"
          className="h-px w-10 bg-[linear-gradient(90deg,rgba(1,1,35,0)_0%,#a8a8a8_100%)] opacity-70"
        />
        <span className="font-[family-name:var(--font-space-mono)] text-[14px] uppercase leading-[1.2] text-white/80">
          Welcome back
        </span>
        <span
          aria-hidden="true"
          className="h-px w-10 bg-[linear-gradient(90deg,#a8a8a8_0%,rgba(1,1,35,0)_100%)] opacity-70"
        />
      </div>

      <h1 className="mt-4 text-center font-[family-name:var(--font-manrope)] text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-[40px]">
        Sign in to HireLoop
      </h1>
      <p className="mt-3 text-center font-[family-name:var(--font-inter-tight)] text-[16px] leading-[1.6] text-white/70">
        Welcome! Please enter your details to continue.
      </p>

      <form noValidate onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="sign-in-email" className="font-sans text-[16px] leading-[1.5] text-white/80">
              Email
            </label>
            {fieldErrors.email ? (
              <span id="sign-in-email-error" className="text-[13px] leading-[1.5] text-red-400">
                {fieldErrors.email}
              </span>
            ) : null}
          </div>
          <Input
            id="sign-in-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? "sign-in-email-error" : undefined}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="sign-in-password" className="font-sans text-[16px] leading-[1.5] text-white/80">
              Password
            </label>
            {fieldErrors.password ? (
              <span id="sign-in-password-error" className="text-[13px] leading-[1.5] text-red-400">
                {fieldErrors.password}
              </span>
            ) : null}
          </div>
          <div className="relative">
            <Input
              id="sign-in-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className="pr-11"
              aria-invalid={fieldErrors.password ? true : undefined}
              aria-describedby={fieldErrors.password ? "sign-in-password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white"
            >
              {showPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <label className="flex cursor-pointer select-none items-center gap-2.5 font-sans text-[15px] leading-[1.6] text-white/70">
          <input
            type="checkbox"
            name="rememberMe"
            className="size-4 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-white/20 bg-[#101010] transition-colors checked:border-0 checked:bg-[#5c53fe]"
          />
          Remember me
        </label>

        {/* Server-side error (Better Auth response) */}
        {fieldErrors.form ? (
          <p role="alert" className="rounded-[8px] border border-red-500/30 bg-red-500/10 px-3 py-2 text-[14px] leading-[1.5] text-red-400">
            {fieldErrors.form}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            CTA_INNER_GLOW,
            "h-[52px] w-full rounded-[12px] bg-[#5c53fe] font-[family-name:var(--font-instrument-sans)] text-[18px] font-medium text-white hover:bg-[#5c53fe]/90"
          )}
        >
          {isSubmitting ? "Signing in…" : "Sign In"}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-white/10" />
          <span className="font-sans text-[14px] leading-[1.5] text-white/40">or</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <Button
          type="button"
          onClick={handleGoogleClick}
          className="h-[52px] w-full rounded-[12px] border border-white/15 bg-[#101010] font-[family-name:var(--font-instrument-sans)] text-[17px] font-medium text-white hover:bg-white/10"
        >
          <GoogleIcon />
          Continue with Google
        </Button>
      </form>

      {/* Easily hop to the sign-up page */}
      <p className="mt-8 text-center font-sans text-[15px] leading-[1.6] text-white/60">
        New to HireLoop?{" "}
        <Link
          href="/sign-up"
          className="font-[family-name:var(--font-instrument-sans)] font-medium text-[#5c53fe] hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.54 5.54 0 0 1-2.4 3.63v3.02h3.89c2.28-2.1 3.56-5.19 3.56-8.84Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.88-3.01c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.96H1.3v3.1A11.99 11.99 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.38-2.28V6.62H1.3a12 12 0 0 0 0 10.76l3.98-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A11.98 11.98 0 0 0 12 0 11.99 11.99 0 0 0 1.29 6.62l3.99 3.1C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  )
}
