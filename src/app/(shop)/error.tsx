"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

/**
 * Error boundary for the shop route group.
 * Catches runtime errors and shows a friendly retry UI.
 */
export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Could send to Sentry/LogRocket here
    console.error("[ShopError]", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-white">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-primary" />
      </div>

      <h1 className="font-display text-4xl lg:text-5xl uppercase text-ink mb-3">
        Ops, algo deu errado
      </h1>
      <p className="text-ink-500 max-w-md mb-8">
        Encontramos um problema ao carregar esta página. Nossa equipe já foi
        notificada. Tente novamente ou volte ao início.
      </p>

      {error.digest && (
        <p className="text-xs font-mono text-ink-300 mb-6">
          Código de erro: {error.digest}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors shadow-lg"
        >
          <RefreshCw className="w-4 h-4" />
          Tentar novamente
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-ink border-2 border-ink-100 font-bold uppercase tracking-wide hover:border-ink-300 transition-colors"
        >
          <Home className="w-4 h-4" />
          Ir para o início
        </Link>
      </div>
    </div>
  );
}
