import { SiteHeader } from "@/components/site-header"
import { SiteHero } from "@/components/site-hero"

export default function Page() {
  return (
    <div className="min-h-svh bg-background">
      <SiteHeader />
      <main>
        <SiteHero />
      </main>
    </div>
  )
}
