"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, Ruler, Package, Shield, Truck } from "lucide-react";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductTabsProps {
  product: Product;
}

type TabId = "description" | "specs" | "reviews" | "shipping";

const TABS: { id: TabId; label: string }[] = [
  { id: "description", label: "Descrição" },
  { id: "specs", label: "Especificações" },
  { id: "reviews", label: "Avaliações" },
  { id: "shipping", label: "Entrega" },
];

/**
 * ProductTabs — Tabbed interface for product details.
 *
 * Tabs:
 *  - Description: full description + key benefits
 *  - Specs: technical specifications table
 *  - Reviews: aggregated rating + mock reviews
 *  - Shipping: delivery info + returns
 */
export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex border-b border-ink-100 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-5 py-3 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors",
              activeTab === tab.id
                ? "text-ink"
                : "text-ink-400 hover:text-ink-600"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="py-6"
        >
          {activeTab === "description" && (
            <DescriptionTab product={product} />
          )}
          {activeTab === "specs" && <SpecsTab product={product} />}
          {activeTab === "reviews" && <ReviewsTab product={product} />}
          {activeTab === "shipping" && <ShippingTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DescriptionTab({ product }: { product: Product }) {
  const benefits = [
    "Amortecimento responsivo em cada passada",
    "Cabedal respirável para conforto prolongado",
    "Design autoral com acabamento premium",
    "Certificado de autenticidade incluso",
  ];

  return (
    <div className="space-y-6">
      <p className="text-ink-600 leading-relaxed text-base">
        {product.description}
      </p>

      <div>
        <h4 className="font-display text-lg uppercase text-ink mb-3">
          Benefícios
        </h4>
        <ul className="space-y-2.5">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-ink-600">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {product.technology && product.technology.length > 0 && (
        <div>
          <h4 className="font-display text-lg uppercase text-ink mb-3">
            Tecnologias
          </h4>
          <div className="flex flex-wrap gap-2">
            {product.technology.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink-50 rounded-full text-sm font-bold uppercase tracking-wider text-ink"
              >
                <span className="w-2 h-2 rounded-full bg-primary" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SpecsTab({ product }: { product: Product }) {
  const specsEntries = Object.entries(product.specs);

  return (
    <div>
      {specsEntries.length === 0 ? (
        <p className="text-ink-400 text-sm">Especificações em breve.</p>
      ) : (
        <div className="rounded-2xl border border-ink-100 overflow-hidden">
          {specsEntries.map(([key, value], i) => (
            <div
              key={key}
              className={cn(
                "grid grid-cols-[180px_1fr] gap-4 px-5 py-3.5",
                i % 2 === 0 ? "bg-ink-50" : "bg-white",
                i !== specsEntries.length - 1 && "border-b border-ink-100"
              )}
            >
              <div className="text-xs uppercase tracking-wider text-ink-400 font-bold">
                {key}
              </div>
              <div className="text-sm text-ink font-medium">{value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Additional info */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="bg-ink-50 rounded-xl p-4 flex items-start gap-3">
          <Ruler className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-400 font-bold">
              Tamanhos disponíveis
            </p>
            <p className="text-sm text-ink font-bold mt-1">
              {product.sizes.join(", ")}
            </p>
          </div>
        </div>
        <div className="bg-ink-50 rounded-xl p-4 flex items-start gap-3">
          <Package className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-400 font-bold">
              SKU
            </p>
            <p className="text-sm text-ink font-bold font-mono mt-1">
              {product.slug.toUpperCase().slice(0, 12)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewsTab({ product }: { product: Product }) {
  // Mock reviews — in a real app these would come from an API
  const mockReviews = [
    {
      id: 1,
      name: "Carlos M.",
      rating: 5,
      date: "há 2 semanas",
      verified: true,
      title: "Simplesmente perfeito",
      text: "Comprei para corrida e superou todas as expectativas. Amortecimento incrível e visual arrasador.",
    },
    {
      id: 2,
      name: "Fernanda L.",
      rating: 5,
      date: "há 1 mês",
      verified: true,
      title: "Confortável o dia inteiro",
      text: "Uso para trabalhar e caminhar. Depois de 10 horas no pé, nenhum desconforto. Recomendo!",
    },
    {
      id: 3,
      name: "Rafael S.",
      rating: 4,
      date: "há 1 mês",
      verified: true,
      title: "Ótimo custo-benefício",
      text: "Qualidade premium por um preço justo. Só achei a forma um pouco estreita — peguei meio número acima.",
    },
  ];

  const ratingDistribution = [
    { stars: 5, percent: 78 },
    { stars: 4, percent: 15 },
    { stars: 3, percent: 5 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 1 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
      {/* Left: Rating summary */}
      <div className="bg-ink-50 rounded-2xl p-6">
        <div className="text-center mb-6">
          <div className="font-display text-5xl text-ink">
            {product.rating.toFixed(1)}
          </div>
          <div className="flex justify-center gap-0.5 mt-2 text-volt">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4"
                fill={
                  i < Math.floor(product.rating) ? "currentColor" : "none"
                }
                strokeWidth={0}
              />
            ))}
          </div>
          <p className="text-xs text-ink-400 mt-2">
            {product.reviewsCount} avaliações
          </p>
        </div>

        {/* Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map((r) => (
            <div key={r.stars} className="flex items-center gap-2 text-xs">
              <span className="w-8 text-ink-500">{r.stars}★</span>
              <div className="flex-1 h-1.5 bg-ink-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-volt"
                  style={{ width: `${r.percent}%` }}
                />
              </div>
              <span className="w-10 text-right text-ink-400 font-mono">
                {r.percent}%
              </span>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 py-2.5 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors">
          Escrever avaliação
        </button>
      </div>

      {/* Right: Reviews list */}
      <div className="space-y-4">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-ink-100 rounded-2xl p-5"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-ink">{review.name}</p>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase">
                        <CheckCircle className="w-3 h-3" />
                        Verificado
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ink-400">{review.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5 text-volt">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3" fill="currentColor" />
                ))}
              </div>
            </div>
            <h5 className="font-bold text-ink mb-1">{review.title}</h5>
            <p className="text-sm text-ink-500 leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShippingTab() {
  const shippingOptions = [
    {
      icon: Truck,
      name: "Frete Grátis",
      time: "5-7 dias úteis",
      condition: "Compras acima de R$ 299",
    },
    {
      icon: Truck,
      name: "Expresso",
      time: "2-3 dias úteis",
      condition: "R$ 29,90",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-display text-lg uppercase text-ink mb-3">
          Opções de entrega
        </h4>
        <div className="space-y-3">
          {shippingOptions.map((opt) => (
            <div
              key={opt.name}
              className="bg-ink-50 rounded-2xl p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <opt.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-ink">{opt.name}</p>
                <p className="text-sm text-ink-500">{opt.time}</p>
              </div>
              <p className="text-sm font-bold text-ink">{opt.condition}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display text-lg uppercase text-ink mb-3">
          Política de trocas
        </h4>
        <div className="bg-ink-50 rounded-2xl p-5 space-y-3">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-ink text-sm">30 dias para trocar</p>
              <p className="text-xs text-ink-500 mt-1">
                Produto sem uso, com etiquetas e embalagem original.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-ink text-sm">Garantia vitalícia</p>
              <p className="text-xs text-ink-500 mt-1">
                Contra defeitos de fabricação, direto com a loja.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-volt/20 border border-volt/40 rounded-2xl p-4 text-sm text-ink">
        <p className="font-bold mb-1">100% Autêntico</p>
        <p className="text-ink-600">
          Todos os produtos passam por verificação de autenticidade antes do envio.
          Certificado incluso em cada par.
        </p>
      </div>
    </div>
  );
}
