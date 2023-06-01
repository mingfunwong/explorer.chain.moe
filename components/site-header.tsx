import { CommandMenu } from "@/components/command-menu"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between space-x-0">
        <MainNav />
        <MobileNav />
      </div>
    </header>
  )
}
