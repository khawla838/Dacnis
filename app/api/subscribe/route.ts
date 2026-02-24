// app/api/subscribe/route.ts
// ════════════════════════════════════════════════════════════════════
// REFACTORED: Suppression SMTP — Brevo contacts ONLY
// ════════════════════════════════════════════════════════════════════
import { NextRequest, NextResponse } from "next/server";

const BREVO_API_URL = "https://api.brevo.com/v3";
const BREVO_LIST_ID = 7;

/**
 * Effectue une requête vers l'API Brevo
 * @param endpoint - Chemin de l'API (ex: "/contacts")
 * @param body - Payload JSON
 * @returns Réponse JSON ou null si 204 No Content
 */
async function brevoRequest(endpoint: string, body: object) {
  const apiKey = process.env.BrevoKey;

  if (!apiKey) {
    throw new Error("BrevoKey est manquante dans .env.local");
  }

  const res = await fetch(`${BREVO_API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erreur inconnue" }));
    throw new Error(err.message || err.code || `Brevo error ${res.status}`);
  }

  // Certains succès (201, 204) n'ont pas de corps JSON
  const contentType = res.headers.get("content-type");
  if (res.status === 204 || !contentType || !contentType.includes("application/json")) {
    return null;
  }

  return res.json();
}

/**
 * Handler POST : Synchronise le contact dans Brevo et ajoute les attributs
 */
export async function POST(req: NextRequest) {
  try {
    const {
      name,
      company,
      address,
      ville,
      codepostale,
      country,
      vat,
      email,
      telephone,
    } = await req.json();

    console.log(
      "🔑 Clé Brevo chargée :",
      process.env.BrevoKey ? "OUI ✅" : "NON ❌ — vérifiez .env.local"
    );

    // Validation : email et nom requis
    if (!email || !name) {
      return NextResponse.json(
        { error: "Nom et email requis." },
        { status: 400 }
      );
    }

    // Parse du nom (prénom / nom de famille)
    const firstName = name.split(" ")[0] ?? name;
    const lastName = name.split(" ").slice(1).join(" ") ?? "";

    // ─────────────────────────────────────────────────────
    // 1️⃣  SYNCHRONISER LE CONTACT DANS BREVO
    //     + AJOUTER LES ATTRIBUTS À LA LISTE
    // ─────────────────────────────────────────────────────
    await brevoRequest("/contacts", {
      email,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        COMPANY: company ?? "",
        ADDRESS: address ?? "",
        CITY: ville ?? "",
        POSTCODE: codepostale ?? "",
        COUNTRY: country ?? "",
        VAT: vat ?? "",
        PHONE: telephone ?? "",
      },
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
    });

    // ─────────────────────────────────────────────────────
    // ✅ SUCCÈS — Contact sauvegardé dans Brevo
    // ─────────────────────────────────────────────────────
    console.log(`✅ Contact sauvegardé dans Brevo : ${email}`);
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[subscribe]", err);
    return NextResponse.json(
      { error: "Erreur serveur, réessayez." },
      { status: 500 }
    );
  }
}