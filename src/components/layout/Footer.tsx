"use client";

import Link from "next/link";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Footer — 5 columns + payment badges + social + copyright.
 *
 * Columns:
 *  1. Brand (logo + description + social)
 *  2. Categorias
 *  3. Atendimento
 *  4. Institucional
 *  5. Newsletter mini + contato
 */
export default function Footer() {
  return (
    <footer className="bg-ink text-ink-300 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className="font-display text-3xl uppercase tracking-tight text-white"
            >
              Sneak<span className="text-primary">ers</span>
            </Link>
            <p className="mt-4 text-sm text-ink-300 max-w-xs leading-relaxed">
              A loja definitiva para quem vive performance e estilo. Desde 2024, autenticidade garantida.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Facebook, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-ink-800 hover:bg-primary flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Categorias */}
          <div>
            <h3 className="text-white font-display uppercase text-sm tracking-wider mb-4">
              Categorias
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Running", href: "/product" },
                { label: "Lifestyle", href: "/product" },
                { label: "Basketball", href: "/product" },
                { label: "Skate", href: "/product" },
                { label: "Training", href: "/product" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="hover:text-volt transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Atendimento */}
          <div>
            <h3 className="text-white font-display uppercase text-sm tracking-wider mb-4">
              Atendimento
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-volt transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-volt transition-colors">Entregas e Prazos</a></li>
              <li><a href="#" className="hover:text-volt transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-volt transition-colors">Guia de Tamanhos</a></li>
              <li><a href="#" className="hover:text-volt transition-colors">Autenticidade</a></li>
            </ul>
          </div>

          {/* Column 4: Institucional */}
          <div>
            <h3 className="text-white font-display uppercase text-sm tracking-wider mb-4">
              Institucional
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-volt transition-colors">Sobre nós</a></li>
              <li><a href="#" className="hover:text-volt transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-volt transition-colors">Sustentabilidade</a></li>
              <li><a href="#" className="hover:text-volt transition-colors">Trabalhe conosco</a></li>
              <li><a href="#" className="hover:text-volt transition-colors">Termos de Uso</a></li>
            </ul>
          </div>

          {/* Column 5: Contact + SSL */}
          <div>
            <h3 className="text-white font-display uppercase text-sm tracking-wider mb-4">
              Contato
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="font-mono text-volt">0800 123 4567</li>
              <li>contato@sneakers.com.br</li>
              <li className="text-xs pt-2">Seg a Sex · 9h às 18h</li>
            </ul>

            {/* SSL badge */}
            <div className="mt-5 inline-flex items-center gap-2 bg-ink-800 px-3 py-2 rounded-lg text-xs">
              <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <span className="text-white font-medium">Site Seguro SSL</span>
            </div>
          </div>
        </div>

        {/* Payment badges */}
        <div className="py-8 border-t border-ink-800">
          <p className="text-xs uppercase tracking-wider text-ink-400 mb-3">
            Formas de pagamento
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "VISA", color: "#1A1F71" },
              { name: "MASTER", color: "#EB001B" },
              { name: "AMEX", color: "#006FCF" },
              { name: "ELO", color: "#000000" },
              { name: "PIX", color: "#32BCAD" },
              { name: "BOLETO", color: "#000000" },
              { name: "HIPER", color: "#FF3333" },
            ].map((p) => (
              <motion.div
                key={p.name}
                whileHover={{ scale: 1.05 }}
                className="h-9 px-3 rounded-md bg-white flex items-center justify-center"
                style={{ color: p.color }}
              >
                <span className="font-bold text-[10px] tracking-wider">
                  {p.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-ink-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ink-400">
          <p>
            © 2026 Sneakers. Todos os direitos reservados. CNPJ
            00.000.000/0001-00
          </p>
          <p className="max-w-md text-center md:text-right">
            Projeto demonstrativo. Marcas como Nike, Jordan e Adidas pertencem
            aos seus respectivos proprietários.
          </p>
        </div>
      </div>
    </footer>
  );
}
