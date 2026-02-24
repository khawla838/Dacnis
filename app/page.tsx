// app/page.tsx
import PricingHero from "@/components/PricingHero";
import PricingCard from "@/components/PricingCard";
import ContactForm from "@/components/ContactForm";
import { pricingOptions, tvaConditions } from "@/data/pricingData";
import Image from "next/image";

function ShieldCheck() {
  return (
    <span className="tva-condition__icon">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
      >
        <path
          d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V7L12 3z"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* BACKGROUND */}
      <div className="page-bg" />

      {/* CONTENT */}
      <div className="page-content">
        <div className="page-inner">
          {/* Logo positioning at the far top-left corner */}
          <div className="absolute left-4 top-4 z-20">
            <Image
              src="/Logo-c2it.png"
              alt="Logo C2it"
              width={130}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          {/* Hero Section (Centered) */}
          <PricingHero />

          {/* 2 – Pricing cards */}
          {pricingOptions.map((option) => (
            <PricingCard key={option.id} option={option} />
          ))}

          {/* 3 – TVA + Form */}
          <div className="tva-section">
            <div className="tva-header">
              <h2 className="tva-header__title">Conditions de TVA</h2>
            </div>
            <div className="tva-body">

              {/* Left – conditions */}
              <div className="tva-conditions">
                {tvaConditions.map((c) => (
                  <div key={c.id} className="tva-condition">
                    <ShieldCheck />
                    <div>
                      <p
                        className="tva-condition__desc"
                        dangerouslySetInnerHTML={{ __html: c.description }}
                      />
                      <p className="tva-condition__detail">{c.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right – form */}
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