"use client";

import { usePathname } from "next/navigation";
import { PortalSidebar } from "@/components/layout/portal-sidebar";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOnboarding = pathname?.startsWith("/provider/onboarding");

  if (isOnboarding) {
    return <div className="min-h-screen bg-ivory">{children}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-ivory-dim lg:flex-row">
      <PortalSidebar />
      <main className="flex-1 overflow-x-hidden px-4 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
