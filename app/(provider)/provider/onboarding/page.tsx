import { Suspense } from "react";
import { OnboardingFlow } from "@/components/provider/onboarding-flow";

export default function ProviderOnboardingPage() {
  return (
    <Suspense fallback={null}>
      <OnboardingFlow />
    </Suspense>
  );
}
