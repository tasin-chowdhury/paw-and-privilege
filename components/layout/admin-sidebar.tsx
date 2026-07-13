"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ClipboardList, ListChecks, Menu, Users } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Review Queue", href: "/admin/review-queue", icon: ClipboardList },
  { label: "Providers", href: "/admin/providers", icon: Users },
  { label: "Listings", href: "/admin/listings", icon: ListChecks },
];

function AdminNavContent() {
  const pathname = usePathname();

  return (
    <>
      <div className="p-6">
        <Link href="/" className="font-display text-lg">
          {BRAND.name}
        </Link>
        <p className="mt-0.5 text-xs text-gold">Admin Console</p>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {nav.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-white/10 text-ivory"
                  : "text-ivory/60 hover:bg-white/5 hover:text-ivory"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-ivory/50 hover:text-ivory"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to marketplace
        </Link>
      </div>
    </>
  );
}

export function AdminSidebar() {
  return (
    <>
      <aside className="hidden w-64 shrink-0 flex-col bg-ink text-ivory lg:flex">
        <AdminNavContent />
      </aside>

      <div className="flex items-center justify-between bg-ink px-4 py-3 text-ivory lg:hidden">
        <Link href="/" className="font-display text-base">
          {BRAND.name}
        </Link>
        <Sheet>
          <SheetTrigger aria-label="Open menu" className="rounded-lg p-2 hover:bg-white/10">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="flex w-64 flex-col bg-ink p-0 text-ivory">
            <SheetTitle className="sr-only">Admin navigation</SheetTitle>
            <AdminNavContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
