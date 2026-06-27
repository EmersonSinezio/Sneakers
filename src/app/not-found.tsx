import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

/**
 * Custom 404 page — stylish, on-brand, with clear CTAs.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(239,35,60,0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,255,0,0.4) 0%, transparent 70%)",
        }}
      />

      {/* Giant 404 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="font-display text-[20rem] lg:text-[28rem] text-ink/[0.03] uppercase leading-none whitespace-nowrap select-none">
          404
        </div>
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-ink text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6 skew-italic">
          <span className="w-2 h-2 bg-volt rounded-full" />
          <span className="skew-italic-content inline-block">
            Página não encontrada
          </span>
        </div>

        <h1 className="font-display text-6xl lg:text-7xl uppercase leading-[0.9] text-ink mb-4">
          Fora de
          <br />
          <span className="text-gradient italic">rota</span>
        </h1>

        <p className="text-ink-500 text-lg max-w-md mx-auto mb-10">
          A página que você procura foi movida, removida ou nunca existiu. Que
          tal voltar à pista?
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors shadow-lg"
          >
            <Home className="w-4 h-4" />
            Voltar ao início
          </Link>
          <Link
            href="/product"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-ink border-2 border-ink-100 font-bold uppercase tracking-wide hover:border-ink-300 transition-colors"
          >
            <Search className="w-4 h-4" />
            Explorar produtos
          </Link>
        </div>

        <Link
          href="javascript:history.back()"
          className="inline-flex items-center gap-2 text-ink-400 hover:text-primary text-sm font-medium mt-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Ou voltar para a página anterior
        </Link>
      </div>
    </div>
  );
}
