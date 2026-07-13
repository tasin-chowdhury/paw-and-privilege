import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-center font-display text-2xl text-ink">
          {BRAND.name}
        </Link>
        <div className="mt-8 rounded-2xl border border-border bg-card p-8">
          <p className="font-display text-xl text-ink">Create your account</p>
          <p className="mt-1 text-sm text-ink/50">Browse, book, and shop verified pet care</p>
          <form className="mt-6 space-y-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" className="mt-1.5" placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" className="mt-1.5" />
            </div>
            <Button type="button" className="w-full rounded-full" size="lg">
              Create account
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-ink/50">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-emerald">
              Sign in
            </Link>
          </p>
        </div>
        <p className="mt-6 text-center text-sm text-ink/50">
          Are you a provider?{" "}
          <Link href="/provider/onboarding" className="font-medium text-emerald">
            Apply here
          </Link>
        </p>
      </div>
    </div>
  );
}
