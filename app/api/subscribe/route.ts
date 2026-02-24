// app/api/subscribe/route.ts
// ════════════════════════════════════════════════════════════════════
// API ENDPOINT — Synchronise contacts dans Brevo UNIQUEMENT
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

  // Log détaillé pour débugger
  console.log(`📡 Brevo [${endpoint}] Status: ${res.status}`);

  if (!res.ok) {
    const errText = await res.text();
    console.error(`❌ Brevo Error Body: ${errText}`);
    try {
      const errJson = JSON.parse(errText);
      throw new Error(errJson.message || errJson.code || `Brevo error ${res.status}`);
    } catch {
      throw new Error(`Brevo error ${res.status}: ${errText}`);
    }
  }

  // Si c'est un succès (200, 201, 204), on vérifie le contenu
  const contentType = res.headers.get("content-type");
  if (res.status === 204 || !contentType || !contentType.includes("application/json")) {
    return null;
  }

  return res.json();
}

/**
 * Handler POST : Synchronise le contact dans Brevo avec tous les attributs
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
    // ─────────────────────────────────────────────────────
    console.log(`📝 Tentative d'ajout du contact : ${email}`);

    // On utilise listid de l'env si présent, sinon fallback sur BREVO_LIST_ID (7)
    const listId = process.env.listid ? parseInt(process.env.listid) : BREVO_LIST_ID;

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
      listIds: [listId],
      updateEnabled: true,
    });

    // ─────────────────────────────────────────────────────
    // 2️⃣  ENVOYER L'EMAIL DE CONFIRMATION (SMTP)
    // ─────────────────────────────────────────────────────
    await brevoRequest("/smtp/email", {
      sender: {
        name: process.env.ADMIN_NAME ?? "STRAKON",
        email: process.env.ADMIN_EMAIL ?? "islemhamami345@gmail.com",
      },
      to: [{ email, name: `${firstName} ${lastName}`.trim() }],
      subject: "Inscription confirmée – STRAKON",
      htmlContent: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px">
          <h2 style="color:#1a3c6e">Bienvenue chez STRAKON, ${firstName} !</h2>
          <p>Votre demande d'inscription a bien été enregistrée.</p>
          <p>Notre équipe vous recontactera très prochainement pour finaliser votre accès.</p>
          <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb"/>
          <p style="color:#6b7280;font-size:13px">
            Société : ${company ?? "—"}<br/>
            Adresse : ${address ?? "—"}<br/>
            Ville   : ${ville ?? "—"}<br/>
            Code postal : ${codepostale ?? "—"}<br/>
            Pays    : ${country ?? "—"}<br/>
            Téléphone : ${telephone ?? "—"}<br/>
            TVA     : ${vat ?? "—"}
          </p>
          <p style="color:#6b7280;font-size:13px">L'équipe STRAKON</p>
        </div>
      `,
    });

    // ─────────────────────────────────────────────────────
    // 3️⃣  NOTIFIER L'ADMINISTRATEUR (SMTP)
    // ─────────────────────────────────────────────────────
    await brevoRequest("/smtp/email", {
      sender: {
        name: process.env.ADMIN_NAME ?? "STRAKON",
        email: process.env.ADMIN_EMAIL ?? "islemhamami345@gmail.com",
      },
      to: [{
        email: process.env.ADMIN_EMAIL ?? "islemhamami345@gmail.com",
        name: process.env.ADMIN_NAME ?? "Admin"
      }],
      subject: `Nouvelle inscription : ${company ?? name}`,
      htmlContent: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px">
          <h2 style="color:#1a3c6e">Nouvelle demande d'inscription reçue</h2>
          <p>Un utilisateur vient de s'inscrire sur le site :</p>
          <ul style="line-height:1.6">
            <li><strong>Nom :</strong> ${name}</li>
            <li><strong>Email :</strong> ${email}</li>
            <li><strong>Téléphone :</strong> ${telephone ?? "—"}</li>
            <li><strong>Société :</strong> ${company ?? "—"}</li>
            <li><strong>Ville :</strong> ${ville ?? "—"}</li>
            <li><strong>Pays :</strong> ${country ?? "—"}</li>
            <li><strong>TVA :</strong> ${vat ?? "—"}</li>
          </ul>
          <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb"/>
          <p style="color:#6b7280;font-size:13px">Ceci est une notification automatique.</p>
        </div>
      `,
    });

    console.log(`✅ Succès total pour : ${email} (Liste: ${listId})`);

    return NextResponse.json({
      success: true,
      message: "Contact enregistré et emails envoyés (client + admin)."
    });

  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Erreur serveur";
    console.error("[subscribe] Erreur :", errorMsg);
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
