// app/page.tsx
import PricingHero from "@/components/PricingHero";
import PricingCard from "@/components/PricingCard";
import ContactForm from "@/components/ContactForm";
import { pricingOptions, tvaConditions } from "@/data/pricingData";

function ShieldCheck() {
  return (
    <span className="tva-condition__icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4">
        <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V7L12 3z" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <div className="page-bg" />

      <div className="page-content">

        {/* Logo — outside page-inner so it reaches the true top-left corner */}
        <div className="site-logo-bar">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Logo-c2it.png" alt="Logo C2it" className="site-logo" />
        </div>

        <div className="page-inner">

          {/* 1 – Hero (title + subtitle, no logo here) */}
          <PricingHero />

          {/* 2 – Pricing cards */}
          {pricingOptions.map((option) => (
            <PricingCard key={option.id} option={option} />
          ))}

          {/* 3 – TVA + Form */}
          <div className="tva-section">
            <div className="tva-header">
              <h2 className="tva-header__title">🧾 TVA – Ce que vous devez savoir</h2>
            </div>
            <div className="tva-body">

              <div className="tva-conditions">
                {tvaConditions.map((c) => (
                  <div key={c.id} className="tva-condition">
                    <ShieldCheck />
                    <div>
                      <p className="tva-condition__desc" dangerouslySetInnerHTML={{ __html: c.description }} />
                      <p className="tva-condition__detail">{c.detail}</p>
                    </div>
                  </div>
                ))}

                <div className="tva-offer-notice">
                  <p className="tva-offer-notice__title">⏳ Offre réservée aux participants</p>
                  <p className="tva-offer-notice__text">
                    Cette offre est exclusivement réservée aux entreprises ayant participé à la formation STRAKON.
                  </p>
                  <p className="tva-offer-notice__warning">
                    ⚠️ Elle est valable pour une durée limitée.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="form-title">Accédez à STRAKON maintenant :</h3>
                <ContactForm />
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}