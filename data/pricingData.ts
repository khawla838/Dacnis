// ============================================================
// STRAKON - Data Lists
// ============================================================

export interface PricingFeature {
  id: number;
  text: string;
}

export interface PricingOption {
  id: number;
  tag: string;
  icon: "monitor" | "key";
  title: string;
  features: PricingFeature[];
  idealTitle: string;
  idealItems: PricingFeature[];
  price: string;
  priceNote: string;
  tvaNoteTitle: string;
  tvaFeatures: PricingFeature[];
  tvaPrice: string;
  tvaPriceNote: string;
  ctaLabel: string;
  ctaHref: string;
  accentColor: "blue" | "gold";
}

export const pricingOptions: PricingOption[] = [
  {
    id: 1,
    tag: "Option 1 – STRAKON en location (3 mois)",
    icon: "monitor",
    title: "Lancez vos projets immédiatement",
    features: [
      { id: 1, text: "Licence STRAKON complète" },
      { id: 2, text: "Accès 3 mois immédiat" },
      { id: 3, text: "Support technique" },
    ],
    idealTitle: "Idéal pour",
    idealItems: [
      { id: 1, text: "Tester sur un projet concret" },
      { id: 2, text: "Former votre équipe" },
      { id: 3, text: "Répondre vite à une opportunité" },
    ],
    price: "1 100",
    priceNote: "",
    tvaNoteTitle: "TVA au preneur :",
    tvaFeatures: [
      { id: 1, text: "Licence STRAKON complète" },
      { id: 2, text: "Accès 3 mois immédiat" },
      { id: 3, text: "Support technique" },
    ],
    tvaPrice: "5 900",
    tvaPriceNote: "-10% DU PRIX CATALOGUE",
    ctaLabel: "Choisir location 3 mois",
    ctaHref: "#",
    accentColor: "blue",
  },
  {
    id: 2,
    tag: "Option 2 – Licence STRAKON définitive",
    icon: "key",
    title: "Investissez durablement dans votre performance",
    features: [
      { id: 1, text: "Licence STRAKON définitive" },
      { id: 2, text: "6 mois de maintenance OFFERTS" },
      { id: 3, text: "Support premium" },
    ],
    idealTitle: "Idéal pour",
    idealItems: [
      { id: 1, text: "Standardiser vos méthodes" },
      { id: 2, text: "Booster votre productivité" },
    ],
    price: "5 900",
    priceNote: "-10% DU PRIX CATALOGUE",
    tvaNoteTitle: "TVA au preneur :",
    tvaFeatures: [
      { id: 1, text: "Licence STRAKON définitive" },
      { id: 2, text: "6 mois de maintenance OFFERTS" },
      { id: 3, text: "Support premium" },
    ],
    tvaPrice: "5 900",
    tvaPriceNote: "(TVA au preneur — 10% du prix catalogue)",
    ctaLabel: "Je choisis la licence définitive",
    ctaHref: "#",
    accentColor: "gold",
  },
];

export interface TVACondition {
  id: number;
  description: string;
  detail: string;
}

export const tvaConditions: TVACondition[] = [
  {
    id: 1,
    description:
      "Entreprises disposant d'un <strong>numéro de TVA intracommunautaire</strong> valide <strong>hors Luxembourg</strong> :",
    detail: "→ Facturation sans TVA (autoliquidation).",
  },
  {
    id: 2,
    description:
      "Entreprises basées au <strong>Luxembourg</strong> ou sans numéro de <strong>TVA intracommunautaire</strong> valide :",
    detail: "→ TVA luxembourgeoise de 17%",
  },
];