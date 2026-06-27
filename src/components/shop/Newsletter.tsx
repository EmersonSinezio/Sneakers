"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

/**
 * Newsletter — Aggressive CTA with red background.
 *
 * Captures email and shows success feedback.
 * Form validation with simple email regex.
 */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Digite um e-mail válido");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      toast.success("Cupom BEMVINDO10 enviado para seu e-mail!");
    }, 800);
  };

  return (
    <section className="relative py-20 lg:py-28 bg-primary overflow-hidden">
      {/* Decorative shapes */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,255,0,0.5) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(11,11,15,0.6) 0%, transparent 70%)",
        }}
      />

      {/* Giant background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="font-display text-[20rem] lg:text-[28rem] text-white/5 uppercase leading-none whitespace-nowrap select-none">
          -10%
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white mb-6 skew-italic"
        >
          <Sparkles className="w-3.5 h-3.5 text-volt" />
          <span className="skew-italic-content inline-block">
            Oferta exclusiva · 24h
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl uppercase leading-[0.9] text-white tracking-tight"
        >
          Ganhe <span className="text-volt italic">10% OFF</span>
          <br /> na primeira compra
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base lg:text-lg text-white/80 max-w-xl mx-auto"
        >
          Assine nossa newsletter e receba o cupom <span className="font-mono font-bold text-white">BEMVINDO10</span> direto no seu e-mail. Plus: lançamentos, drops exclusivos e muito mais.
        </motion.p>

        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="flex-1 px-6 py-4 rounded-full bg-white text-ink placeholder-ink-400 focus:outline-none focus:ring-4 focus:ring-volt/50 shadow-xl"
              aria-label="Seu e-mail"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-ink text-white font-bold uppercase tracking-wide hover:bg-ink-800 transition-colors shadow-xl disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Quero meu cupom
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 inline-flex items-center gap-3 bg-volt text-ink px-8 py-4 rounded-full font-bold shadow-xl"
          >
            <Check className="w-5 h-5" strokeWidth={3} />
            Cupom enviado! Confira seu e-mail.
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-xs text-white/60"
        >
          Ao assinar, você concorda com nossa Política de Privacidade. Sem spam.
        </motion.p>
      </div>
    </section>
  );
}
