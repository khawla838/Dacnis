// components/PricingHero.tsx
export default function PricingHero() {
  return (
    <div className="hero-wrapper">

      {/* Main headline */}
      <h1 className="hero-title">
        <em>Passez à l&apos;action</em>{" "}
        <span className="hero-avec">avec</span>{" "}
        <span className="hero-brand">STRAKON</span>
        <br />
        <span className="hero-today">dès aujourd&apos;hui</span>
      </h1>

      {/* Decorative rule */}
      <div className="hero-rule">
        <span className="hero-rule__line" />
        <span className="hero-rule__diamond" />
        <span className="hero-rule__line" />
      </div>

      {/* Subtitle */}
      <p className="hero-subtitle">
        Merci d&apos;avoir participé à notre formation STRAKON.<br />
        Vous avez vu <strong>la puissance du logiciel</strong>. Vous avez compris son potentiel
        pour optimiser vos projets <strong>coffrage &amp; armatures</strong>.<br />
        Il est maintenant temps de passer à l&apos;étape suivante.
      </p>

      {/* Offer callout */}
      <div className="hero-offer-callout">
        <span>🎯</span>
        Nous vous réservons une offre exclusive, uniquement pour les participants à la formation.
      </div>

    </div>
  );
}