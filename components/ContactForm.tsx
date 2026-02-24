"use client";
import { useState, useEffect } from "react";
import { formFields } from "@/data/FromFields";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (id: string, value: string) =>
    setFormData((prev) => ({ ...prev, [id]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation téléphone si renseigné
    if (formData.telephone && !isValidPhoneNumber(formData.telephone)) {
      setStatus("error");
      setErrorMsg("Le numéro de téléphone n'est pas valide.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur inconnue");

      setStatus("success");
      setFormData({});
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erreur serveur.");
    }
  };

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => setStatus("idle"), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <>
      <form onSubmit={handleSubmit} className="contact-form">
        {formFields.map((field) => {
          // Cas 1 : SELECT
          if (field.type === "select") {
            return (
              <select
                key={field.id}
                id={field.id}
                required={field.required}
                value={formData[field.id] ?? ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="contact-form__input"
                disabled={status === "loading"}
              >
                <option value="" disabled>{field.placeholder}</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            );
          }

          // Cas 2 : TÉLÉPHONE — détecté par id "telephone"
          if (field.id === "telephone") {
            return (
              <div key={field.id} className="phone-input-container">
                <PhoneInput
                  international
                  defaultCountry="FR"
                  placeholder={field.placeholder}
                  value={formData[field.id] ?? ""}
                  onChange={(val) => handleChange(field.id, val ?? "")}
                  disabled={status === "loading"}
                  className="contact-form__input"
                />
              </div>
            );
          }

          // Cas 3 : Autres champs (text, email, etc.)
          return (
            <input
              key={field.id}
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.id] ?? ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="contact-form__input"
              disabled={status === "loading"}
            />
          );
        })}

        {status === "error" && (
          <p
            className="contact-form__error"
            style={{ color: "#ff4d4d", marginTop: "10px" }}
          >
            ⚠️ {errorMsg}
          </p>
        )}

        <button
          type="submit"
          className="contact-form__submit"
          disabled={status === "loading"}
          style={{
            opacity: status === "loading" ? 0.7 : 1,
            cursor: status === "loading" ? "not-allowed" : "pointer",
          }}
        >
          {status === "loading" ? "Envoi en cours..." : "Accéder à STRAKON →"}
        </button>
      </form>

      {status === "success" && (
        <div className="toast-success">
          <div className="toast-success__content">
            <div className="toast-success__icon">🎉</div>
            <div className="toast-success__text">
              <strong>Inscription enregistrée !</strong>
              <p>Votre demande a bien été reçue. Notre équipe vous recontactera sous peu.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}