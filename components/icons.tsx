import Image from "next/image"
import { Moon, SunMedium, type LucideIcon } from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  logo: (props: { className?: string }) => (
    <Image src="/logo.svg" width={40} height={40} alt="Logo" {...props} />
  ),
}
