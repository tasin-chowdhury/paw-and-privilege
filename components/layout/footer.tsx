import Link from "next/link";
import { BRAND } from "@/lib/constants";

const columns = [
  {
    title: "Marketplace",
    links: [
      { label: "Dogs", href: "/marketplace/dog" },
      { label: "Cats", href: "/marketplace/cat" },
      { label: "Birds", href: "/marketplace/bird" },
      { label: "Fish", href: "/marketplace/fish" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Verified Vets", href: "/vets" },
      { label: "Grooming & Training", href: "/services" },
      { label: "Foster Program", href: "/foster" },
      { label: "Membership", href: "/membership" },
    ],
  },
  {
    title: "Providers",
    links: [
      { label: "Become a Provider", href: "/become-a-provider" },
      { label: "Provider Login", href: "/auth/login" },
      { label: "Provider Dashboard", href: "/provider/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Admin Console", href: "/admin/review-queue" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <p className="font-display text-2xl">{BRAND.name}</p>
            <p className="mt-3 max-w-xs text-sm text-ivory/60">
              {BRAND.tagline}
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ivory/70 hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p>Dhaka · Chattogram · Sylhet</p>
        </div>
      </div>
    </footer>
  );
}
