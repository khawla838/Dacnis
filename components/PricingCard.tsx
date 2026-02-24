"use client";
import { PricingOption } from "@/data/pricingData";

/* ══════════════════════════════════════════
   ICONS — matching reference image exactly
══════════════════════════════════════════ */

/* Monitor with stand legs */
function MonitorIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#1a2e5a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="13" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="16" x2="12" y2="21" />
    </svg>
  );
}

/* Classic key shape */
function KeyIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#1a2e5a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="M21 2L11.5 11.5" />
      <path d="M15 8l3 3" />
      <path d="M17 6l3 3" />
    </svg>
  );
}

/* Pen/edit icon for "Idéal pour" */
function PenIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1a2e5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

/* Checkbox tick */
function Tick({ variant, size = 15 }: { variant: "blue" | "gold" | "orange"; size?: number }) {
  const bgMap = { blue: "#4a72b2", gold: "#d4a017", orange: "#e6a23c" };
  return (
    <span
      className="inline-flex items-center justify-center shrink-0 rounded-[3px]"
      style={{ width: size, height: size, background: bgMap[variant] }}
    >
      <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* ══════════════════════════════════════════
   PRICING CARD
══════════════════════════════════════════ */
export default function PricingCard({ option }: { option: PricingOption }) {
  const isGold = option.accentColor === "gold";
  const tickVariant = isGold ? "gold" : "blue";

  return (
    <div className="pricing-card">

      {/* ── HEADER ── */}
      <div className={`pricing-header ${isGold ? "pricing-header--gold" : "pricing-header--blue"}`}>
        <h2 className="pricing-header__tag">{option.tag}</h2>
      </div>

      <div className="pricing-body">

        {/* ── LEFT ── */}
        <div className="pricing-left">

          <div className="pricing-title-row">
            {option.icon === "monitor" ? <MonitorIcon /> : <KeyIcon />}
            <h3 className="pricing-title">{option.title}</h3>
          </div>

          <ul className="pricing-features">
            {option.features.map((f) => (
              <li key={f.id} className="pricing-feature-item">
                <Tick variant={tickVariant} />
                <span dangerouslySetInnerHTML={{
                  __html: f.text
                    .replace("3 mois", "<strong>3 mois</strong>")
                    .replace("OFFERTS", "<strong>OFFERTS</strong>")
                }} />
              </li>
            ))}
          </ul>

          <hr className="pricing-divider" />

          <div className="pricing-ideal__header">
            <PenIcon />
            <span className="pricing-ideal__title">{option.idealTitle} :</span>
          </div>
          <ul className="pricing-ideal__list">
            {option.idealItems.map((item) => (
              <li key={item.id} className="pricing-ideal__item">
                <Tick variant={tickVariant} />
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT ── */}
        <div className="pricing-right">

          {/* Price ribbon — diagonal left, overlaps left panel */}
          <div className={`pricing-ribbon ${isGold ? "pricing-ribbon--navy" : "pricing-ribbon--blue"}`}>
            <span className="pricing-ribbon__price">{option.price}</span>
            <span className="pricing-ribbon__currency">€</span>
            <span className="pricing-ribbon__ht">HT</span>
          </div>

          {/* Gold -10% sub-banner */}
          {isGold && (
            <div className="pricing-discount-banner">
              -10% DU PRIX CATALOGUE
            </div>
          )}

          <div className="pricing-right-body">

            <p className="pricing-tva-label">TVA au preneur :</p>
            <p className="pricing-tva-desc">{option.tvaFeatures[0]?.text}</p>

            <div className="pricing-tva-features">
              {option.tvaFeatures.slice(1).map((f) => (
                <div key={f.id} className="pricing-tva-feature">
                  <Tick variant="gold" size={13} />
                  <span dangerouslySetInnerHTML={{
                    __html: f.text.replace("OFFERTS", "<strong>OFFERTS</strong>")
                  }} />
                </div>
              ))}
            </div>

            <hr className="pricing-right-divider" />

            {/* Final price */}
            <div className="pricing-final-price">
              <span className="pricing-final-price__num">{option.tvaPrice}</span>
              <span className="pricing-final-currency">€</span>
              <span className="pricing-final-price__ht">HT</span>
            </div>

            {isGold ? (
              <p className="pricing-tva-note-italic">{option.tvaPriceNote}</p>
            ) : (
              <p className="pricing-discount-note">-10% DU PRIX CATALOGUE</p>
            )}

            <a href={option.ctaHref} className="pricing-cta">
              <span className="pricing-cta__bold">{option.ctaLabel.split(" ")[0]}</span>
              {" "}
              <span className="pricing-cta__light">{option.ctaLabel.split(" ").slice(1).join(" ")}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}