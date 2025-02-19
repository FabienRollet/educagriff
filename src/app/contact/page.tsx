"use client";
import { useTheme } from "next-themes";
import { useState } from "react";
import { FaInstagram, FaFacebook, FaPhone } from "react-icons/fa";

export default function ContactForm() {
  const { resolvedTheme } = useTheme();
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = () => {
    setIsSending(true);
    setTimeout(() => setIsSending(false), 30000);
  };

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        resolvedTheme === "light"
          ? "bg-gradient-to-b from-white to-orange-50 text-gray-900"
          : "bg-gradient-to-b from-black to-gray-900 text-gray-100"
      } `}
    >
      <h2
        className={`text-center text-3xl font-bold mb-8 ${
          resolvedTheme === "light" ? "text-orange-600" : "text-orange-400"
        }`}
      >
        Contactez-nous
      </h2>
      <div
        className={`h-1 w-24 mx-auto mb-8 ${
          resolvedTheme === "light" ? "bg-orange-500" : "bg-orange-400"
        }`}
      ></div>

      <div className={`max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg ${
              resolvedTheme === "light" ? "border border-gray-300 bg-white shadow-lg text-gray-800" : "border border-orange-400 backdrop-blur-md bg-gray-700/70 shadow-[0_0_20px_rgba(255,255,255,0.15)] text-gray-100"
            }`}>
        <form
          action="https://formspree.io/f/xovjpllo"
          method="POST"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <p className="italic">* : champs obligatoire</p>
                    <label htmlFor="tel">Nom*</label>
          <input
            type="text"
            name="name"
            placeholder="Dupond"
            required
            className={`p-3 rounded-lg border ${
              resolvedTheme === "light"
                ? "border-orange-200"
                : "border-gray-700 bg-gray-700 text-gray-100"
            }`}
          />
          <label htmlFor="tel">Email*</label>
          <input
            type="email"
            name="email"
            placeholder="Exemple@....com"
            required
            className={`p-3 rounded-lg border ${
              resolvedTheme === "light"
                ? "border-orange-200"
                : "border-gray-700 bg-gray-700 text-gray-100"
            }`}
          />
          <label htmlFor="tel">Numéro de téléphone</label>
          <input
            type="tel"
            name="phone"
            placeholder="06 00 00 00 00"
            className={`p-3 rounded-lg border ${
              resolvedTheme === "light"
                ? "border-orange-200"
                : "border-gray-700 bg-gray-700 text-gray-100"
            }`}
          />
          <label htmlFor="message">Votre message*</label>
          <textarea
            name="message"
            placeholder="Tapez ici..."
            required
            rows={5}
            className={`p-3 rounded-lg border ${
              resolvedTheme === "light"
                ? "border-orange-200"
                : "border-gray-700 bg-gray-700 text-gray-100"
            }`}
          ></textarea>

          <button
            type="submit"
            disabled={isSending}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105 ${
              resolvedTheme === "light"
                ? "bg-orange-500 text-white"
                : "bg-orange-400 text-gray-100"
            } ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Envoyer
          </button>
        </form>

        <div className="flex justify-center gap-6 mt-8">
          <a
            href="https://www.instagram.com/educagriff/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-3xl text-orange-500 hover:text-orange-600 transition" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61569164953323"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-3xl text-orange-500 hover:text-orange-600 transition" />
          </a>
          <a href="tel:0651271749">
            <FaPhone className="text-3xl text-orange-500 hover:text-orange-600 transition" />
          </a>
        </div>

        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          06 51 27 17 49
        </p>
      </div>
    </section>
  );
}
