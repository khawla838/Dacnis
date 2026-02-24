// components/PricingHero.tsx
export default function PricingHero() {
  return (
    <div className="hero-wrapper">
      <h1 className="hero-title">
        <em>Passez à l&apos;action</em>{" "}
        <span className="hero-avec">avec</span>{" "}
        <span className="hero-brand">STRAKON</span>
        <br />
        <span className="hero-today">dès aujourd&apos;hui</span>
      </h1>
      <p className="hero-subtitle">
        Nous avons réservé une offre spéciale, exclusivement pour vous,
        <br />
        participants de la formation STRAKON.
      </p>
    </div>
  );
}