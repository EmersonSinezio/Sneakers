"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Package, ArrowRight, Copy, CheckCircle } from "lucide-react";
import { Order } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import confetti from "canvas-confetti";
import { toast } from "sonner";

/**
 * Checkout success page — Shows order confirmation with confetti animation.
 */
export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("sneakers:last-order");
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrder(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  // Confetti on mount
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#EF233C", "#D4FF00", "#0B0B0F"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#EF233C", "#D4FF00", "#0B0B0F"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const copyOrderId = async () => {
    if (!order) return;
    await navigator.clipboard.writeText(order.id);
    setCopied(true);
    toast.success("Número do pedido copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,255,0,0.5) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(239,35,60,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="w-24 h-24 rounded-full bg-volt flex items-center justify-center mx-auto mb-8 shadow-2xl"
        >
          <Check className="w-12 h-12 text-ink" strokeWidth={3} />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-3">
            Pedido confirmado
          </p>
          <h1 className="font-display text-5xl lg:text-6xl uppercase text-ink leading-[0.95]">
            Obrigado pela
            <br />
            <span className="text-gradient italic">sua compra!</span>
          </h1>
          <p className="mt-6 text-ink-500 max-w-md mx-auto">
            Seu pedido foi recebido e está sendo preparado. Enviaremos um e-mail
            com os detalhes do rastreamento assim que for despachado.
          </p>
        </motion.div>

        {/* Order card */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden mb-10"
          >
            {/* Order ID */}
            <div className="bg-ink text-white p-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-300 mb-1">
                  Número do pedido
                </p>
                <p className="font-display text-2xl uppercase font-mono">
                  {order.id}
                </p>
              </div>
              <button
                onClick={copyOrderId}
                className="w-10 h-10 rounded-full bg-ink-800 hover:bg-ink-700 flex items-center justify-center transition-colors"
                aria-label="Copiar número do pedido"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-volt" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Delivery info */}
              <div className="flex items-start gap-3 pb-4 border-b border-ink-100">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-ink text-sm">Entrega estimada</p>
                  <p className="text-sm text-ink-500">
                    5 a 7 dias úteis para {order.address.city}/{order.address.state}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-ink-500">
                  <span>{order.items.length} item(ns)</span>
                  <span className="font-mono">
                    {formatPrice(order.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-ink-500">
                  <span>Frete</span>
                  <span className="font-mono">
                    {order.shipping === 0 ? (
                      <span className="text-green-600 font-bold">GRÁTIS</span>
                    ) : (
                      formatPrice(order.shipping)
                    )}
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto</span>
                    <span className="font-mono font-bold">
                      -{formatPrice(order.discount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-ink-100">
                  <span>Total pago</span>
                  <span className="text-primary font-mono">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/product"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors shadow-lg"
          >
            Continuar comprando
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-ink border-2 border-ink-100 font-bold uppercase tracking-wide hover:border-ink-300 transition-colors"
          >
            Voltar ao início
          </Link>
        </motion.div>

        {/* Support */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-sm text-ink-400 mt-10"
        >
          Dúvidas? Fale conosco em{" "}
          <a
            href="mailto:contato@sneakers.com.br"
            className="text-primary font-bold hover:underline"
          >
            contato@sneakers.com.br
          </a>
        </motion.p>
      </div>
    </div>
  );
}
