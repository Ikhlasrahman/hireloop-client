import type { Metadata } from "next"

import { SignUpForm } from "@/components/sign-up-form"

export const metadata: Metadata = {
  title: "Create account — HireLoop",
}

export default function SignUpPage() {
  return <SignUpForm />
}
