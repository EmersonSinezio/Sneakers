"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Lock,
  CreditCard,
  QrCode,
  Shield,
  Check,
  Truck,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice, generateOrderId } from "@/lib/utils";
import { BUSINESS_RULES } from "@/lib/constants";
import { ShippingAddress, PaymentMethod } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Zod schema for shipping address
const addressSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  zipCode: z.string().min(8, "CEP inválido"),
  street: z.string().min(3, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Bairro é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().length(2, "UF inválida"),
});

type AddressFormData = z.infer<typeof addressSchema>;

/**
 * Checkout page — 2 steps: Address + Payment.
 *
 * Uses react-hook-form + zod for validation.
 * On success: clears cart, generates order ID, redirects to /checkout/success.
 */
export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    shipping,
    discountAmount,
    total,
    couponCode,
    clearCart,
  } = useCartStore();

  const [step, setStep] = useState<"address" | "payment">("address");
  const [address, setAddress] = useState<ShippingAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: "onBlur",
  });

  const subtotalValue = subtotal();
  const shippingValue = shipping();
  const discountValue = discountAmount();
  const totalValue = total();

  // Redirect to cart if empty
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="font-display text-4xl uppercase text-ink mb-3">
          Carrinho vazio
        </h1>
        <p className="text-ink-400 max-w-md mb-8">
          Adicione produtos ao carrinho antes de finalizar a compra.
        </p>
        <Link
          href="/product"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  const onAddressSubmit = (data: AddressFormData) => {
    setAddress(data as ShippingAddress);
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalizeOrder = async () => {
    if (!address) return;
    setIsSubmitting(true);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const orderId = generateOrderId();

    // Store order info for success page (via sessionStorage)
    sessionStorage.setItem(
      "sneakers:last-order",
      JSON.stringify({
        id: orderId,
        items,
        address,
        paymentMethod,
        subtotal: subtotalValue,
        shipping: shippingValue,
        discount: discountValue,
        total: totalValue,
        couponCode,
        createdAt: new Date().toISOString(),
      })
    );

    clearCart();
    toast.success("Pedido confirmado!");
    router.push("/checkout/success");
  };

  return (
    <div className="min-h-screen bg-ink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Back link */}
        <Link
          href="/product"
          className="inline-flex items-center gap-2 text-ink-500 hover:text-primary text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Continuar comprando
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="font-display text-4xl lg:text-5xl uppercase text-ink">
            Finalizar compra
          </h1>

          {/* Progress steps */}
          <div className="flex items-center gap-3 mt-6">
            <StepIndicator
              number={1}
              label="Endereço"
              active={step === "address"}
              completed={step === "payment"}
            />
            <div className="flex-1 h-0.5 bg-ink-200">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: step === "payment" ? "100%" : "0%" }}
                className="h-full bg-primary"
              />
            </div>
            <StepIndicator
              number={2}
              label="Pagamento"
              active={step === "payment"}
              completed={false}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* LEFT: Forms */}
          <div>
            <AnimatePresence mode="wait">
              {step === "address" && (
                <motion.form
                  key="address"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit(onAddressSubmit)}
                  className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm"
                >
                  <h2 className="font-display text-2xl uppercase text-ink mb-6">
                    Endereço de entrega
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      label="Nome completo"
                      error={errors.fullName?.message}
                      className="sm:col-span-2"
                    >
                      <input
                        {...register("fullName")}
                        type="text"
                        placeholder="Seu nome"
                        className="w-full"
                      />
                    </FormField>

                    <FormField label="E-mail" error={errors.email?.message}>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="voce@email.com"
                      />
                    </FormField>

                    <FormField label="Telefone" error={errors.phone?.message}>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="(11) 99999-9999"
                      />
                    </FormField>

                    <FormField label="CEP" error={errors.zipCode?.message}>
                      <input
                        {...register("zipCode")}
                        type="text"
                        placeholder="01234-567"
                      />
                    </FormField>

                    <FormField
                      label="Rua"
                      error={errors.street?.message}
                      className="sm:col-span-2"
                    >
                      <input
                        {...register("street")}
                        type="text"
                        placeholder="Nome da rua"
                      />
                    </FormField>

                    <FormField label="Número" error={errors.number?.message}>
                      <input
                        {...register("number")}
                        type="text"
                        placeholder="123"
                      />
                    </FormField>

                    <FormField label="Complemento">
                      <input
                        {...register("complement")}
                        type="text"
                        placeholder="Apto, bloco..."
                      />
                    </FormField>

                    <FormField
                      label="Bairro"
                      error={errors.neighborhood?.message}
                    >
                      <input
                        {...register("neighborhood")}
                        type="text"
                        placeholder="Bairro"
                      />
                    </FormField>

                    <FormField label="Cidade" error={errors.city?.message}>
                      <input
                        {...register("city")}
                        type="text"
                        placeholder="Cidade"
                      />
                    </FormField>

                    <FormField label="UF" error={errors.state?.message}>
                      <input
                        {...register("state")}
                        type="text"
                        placeholder="SP"
                        maxLength={2}
                      />
                    </FormField>
                  </div>

                  <button
                    type="submit"
                    className="mt-8 w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors shadow-lg"
                  >
                    Continuar para pagamento
                  </button>
                </motion.form>
              )}

              {step === "payment" && address && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl uppercase text-ink">
                      Pagamento
                    </h2>
                    <button
                      onClick={() => setStep("address")}
                      className="text-xs text-ink-400 hover:text-primary font-bold uppercase tracking-wider"
                    >
                      Editar endereço
                    </button>
                  </div>

                  {/* Address summary */}
                  <div className="bg-ink-50 rounded-2xl p-4 mb-6 text-sm">
                    <p className="font-bold text-ink">{address.fullName}</p>
                    <p className="text-ink-500 mt-1">
                      {address.street}, {address.number}
                      {address.complement && `, ${address.complement}`} —{" "}
                      {address.neighborhood}
                    </p>
                    <p className="text-ink-500">
                      {address.city} / {address.state} — CEP {address.zipCode}
                    </p>
                  </div>

                  {/* Payment method selection */}
                  <div className="space-y-3 mb-8">
                    <PaymentOption
                      icon={CreditCard}
                      title="Cartão de crédito"
                      subtitle="Até 10x sem juros"
                      selected={paymentMethod === "credit"}
                      onClick={() => setPaymentMethod("credit")}
                    />
                    <PaymentOption
                      icon={QrCode}
                      title="PIX"
                      subtitle="5% de desconto · Aprovação imediata"
                      selected={paymentMethod === "pix"}
                      onClick={() => setPaymentMethod("pix")}
                      badge="-5%"
                    />
                  </div>

                  {paymentMethod === "credit" && (
                    <div className="bg-ink-50 rounded-2xl p-5 space-y-4">
                      <div>
                        <label className="text-xs uppercase tracking-wider font-bold text-ink-600 mb-1.5 block">
                          Número do cartão
                        </label>
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="input-base"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs uppercase tracking-wider font-bold text-ink-600 mb-1.5 block">
                            Validade
                          </label>
                          <input
                            type="text"
                            placeholder="MM/AA"
                            className="input-base"
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-wider font-bold text-ink-600 mb-1.5 block">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="input-base"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider font-bold text-ink-600 mb-1.5 block">
                          Nome no cartão
                        </label>
                        <input
                          type="text"
                          placeholder="NOME COMO NO CARTÃO"
                          className="input-base"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "pix" && (
                    <div className="bg-ink-50 rounded-2xl p-5">
                      <div className="text-center">
                        <div className="inline-block p-4 bg-white rounded-2xl shadow-sm mb-4">
                          {/* Mock QR code */}
                          <div className="w-40 h-40 grid grid-cols-8 gap-1">
                            {Array.from({ length: 64 }).map((_, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "rounded-sm",
                                  Math.random() > 0.5 ? "bg-ink" : "bg-white"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-ink-600">
                          Após confirmar, você receberá o QR Code final por
                          e-mail.
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleFinalizeOrder}
                    disabled={isSubmitting}
                    className="mt-8 w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors shadow-lg disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Confirmar pedido · {formatPrice(totalValue)}
                      </>
                    )}
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-400">
                    <Shield className="w-3.5 h-3.5" />
                    Pagamento 100% seguro e criptografado
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Order summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm">
              <h2 className="font-display text-xl uppercase text-ink mb-5">
                Resumo do pedido
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-80 overflow-y-auto no-scrollbar">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}`}
                    className="flex gap-3 items-center"
                  >
                    <div className="relative w-16 h-16 bg-ink-50 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-ink truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-ink-400">
                        Tam {item.selectedSize} · Qtd {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-sm text-ink font-mono whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary lines */}
              <div className="space-y-2 pt-4 border-t border-ink-100 text-sm">
                <div className="flex justify-between text-ink-500">
                  <span>Subtotal</span>
                  <span className="font-mono">
                    {formatPrice(subtotalValue)}
                  </span>
                </div>
                <div className="flex justify-between text-ink-500">
                  <span className="inline-flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    Frete
                  </span>
                  <span className="font-mono">
                    {shippingValue === 0 ? (
                      <span className="text-green-600 font-bold">GRÁTIS</span>
                    ) : (
                      formatPrice(shippingValue)
                    )}
                  </span>
                </div>
                {couponCode && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({couponCode})</span>
                    <span className="font-mono font-bold">
                      -{formatPrice(discountValue)}
                    </span>
                  </div>
                )}
                {paymentMethod === "pix" && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto PIX (5%)</span>
                    <span className="font-mono font-bold">
                      -{formatPrice(subtotalValue * 0.05)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-ink-100">
                  <span>Total</span>
                  <span className="text-primary font-mono">
                    {formatPrice(
                      paymentMethod === "pix"
                        ? totalValue - subtotalValue * 0.05
                        : totalValue
                    )}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Input styles */}
      <style jsx global>{`
        .input-base {
          width: 100%;
          padding: 0.75rem 1rem;
          background: white;
          border: 1px solid #E5E5EA;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .input-base:focus {
          outline: none;
          border-color: #EF233C;
          box-shadow: 0 0 0 3px rgba(239, 35, 60, 0.1);
        }
      `}</style>
    </div>
  );
}

function FormField({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs uppercase tracking-wider font-bold text-ink-600 mb-1.5 block">
        {label}
      </label>
      <div
        className={cn(
          "px-4 py-3 bg-white border rounded-xl transition-all",
          error
            ? "border-primary focus-within:ring-2 focus-within:ring-primary/20"
            : "border-ink-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10"
        )}
      >
        {children}
      </div>
      {error && (
        <p className="text-xs text-primary mt-1.5 font-medium">{error}</p>
      )}
    </div>
  );
}

function StepIndicator({
  number,
  label,
  active,
  completed,
}: {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
          completed
            ? "bg-primary text-white"
            : active
            ? "bg-ink text-white"
            : "bg-ink-100 text-ink-400"
        )}
      >
        {completed ? <Check className="w-4 h-4" /> : number}
      </div>
      <span
        className={cn(
          "text-xs uppercase tracking-wider font-bold",
          active || completed ? "text-ink" : "text-ink-400"
        )}
      >
        {label}
      </span>
    </div>
  );
}

function PaymentOption({
  icon: Icon,
  title,
  subtitle,
  selected,
  onClick,
  badge,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  selected: boolean;
  onClick: () => void;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all",
        selected
          ? "border-primary bg-primary/5"
          : "border-ink-200 hover:border-ink-300"
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
          selected ? "bg-primary text-white" : "bg-ink-50 text-ink"
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-ink">{title}</p>
        <p className="text-xs text-ink-400 mt-0.5">{subtitle}</p>
      </div>
      {badge && (
        <span className="px-2.5 py-1 bg-volt text-ink text-[10px] font-bold uppercase rounded skew-italic">
          <span className="skew-italic-content inline-block">{badge}</span>
        </span>
      )}
      <div
        className={cn(
          "w-5 h-5 rounded-full border-2 transition-colors",
          selected ? "border-primary bg-primary" : "border-ink-300"
        )}
      >
        {selected && <Check className="w-full h-full text-white p-0.5" />}
      </div>
    </button>
  );
}
