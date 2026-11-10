import { redirect } from "next/navigation"
import { headers } from "next/headers"

import { auth } from "@/lib/auth"

export default async function DashboardIndexPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect("/sign-in")
  }

  const role = (session.user as { role?: string | null }).role ?? "seeker"
  redirect(`/dashboard/${role}`)
}