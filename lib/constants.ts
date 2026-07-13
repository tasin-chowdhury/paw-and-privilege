export const BRAND = {
  name: "Paw & Privilege",
  tagline: "Bangladesh's most exclusive, verified pet marketplace.",
  trialDays: 15,
  commissionRate: 20,
};

export const SPECIES = [
  { slug: "dog", label: "Dogs" },
  { slug: "cat", label: "Cats" },
  { slug: "bird", label: "Birds" },
  { slug: "fish", label: "Fish" },
] as const;

export const CATEGORIES = [
  { slug: "dry-food", label: "Dry Food" },
  { slug: "wet-food", label: "Wet Food" },
  { slug: "treats", label: "Treats" },
  { slug: "toys", label: "Toys" },
  { slug: "accessories", label: "Accessories" },
  { slug: "medicine", label: "Medicine" },
] as const;

export const PUBLIC_NAV = [
  { label: "Marketplace", href: "/marketplace/dog" },
  { label: "Vets", href: "/vets" },
  { label: "Grooming & Training", href: "/services" },
  { label: "Foster", href: "/foster" },
  { label: "Membership", href: "/membership" },
  { label: "Become a Provider", href: "/become-a-provider" },
];
