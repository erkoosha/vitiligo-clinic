export const NAV_ITEMS = [
  { id: "about", href: "#about", labelKey: "nav.about" },
  { id: "certificates", href: "#certificates", labelKey: "nav.certificates" },
  { id: "results", href: "#results", labelKey: "nav.results" },
  { id: "contacts", href: "#contact", labelKey: "nav.contacts" },
] as const

export type NavItem = {
  href: string
  label: string
}
