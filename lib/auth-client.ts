import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"

import type { auth } from "@/lib/auth"

// Same-origin by default — the auth API lives at /api/auth on this app.
// inferAdditionalFields keeps the client in sync with the server's user
// additional fields (e.g. `role`) for type safety on sign-up / session.
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, useSession } = authClient