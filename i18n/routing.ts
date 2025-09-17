import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

export const routing = defineRouting({
  locales: ["uz", "ru", "en"],
  defaultLocale: "uz",
  localeDetection: true,
  pathnames: { },
})


export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)