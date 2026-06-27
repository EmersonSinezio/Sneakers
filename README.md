# 👟 Sneakers — Performance Edition

> Um e-commerce premium de sneakers com experiência cinematográfica, construído com **Next.js 16 + TypeScript + Three.js + Framer Motion**.

![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-R3F-000?logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![Zustand](https://img.shields.io/badge/Zustand-5-453f39)

---

## 🎯 Sobre o Projeto

O **Sneakers — Performance Edition** é uma experiência de e-commerce completa, desenvolvida para demonstrar domínio de tecnologias modernas de frontend, UX premium e arquitetura escalável. O projeto combina:

- **3 fatores "UAU"** na home: parallax com mouse, modelo 3D interativo e scroll storytelling
- **Fluxo de compra completo**: catálogo → carrinho → checkout → sucesso (com confetti 🎊)
- **SEO profissional**: JSON-LD, OG images dinâmicas, sitemap, robots.txt
- **Design system coeso**: paleta "sport performance", tipografia Anton + Inter, animações customizadas

> 💡 **Nota**: Este é um projeto de portfólio demonstrativo. Marcas como Nike, Jordan e Adidas pertencem aos seus respectivos proprietários.

---

## ✨ Features Principais

### 🎨 Design & Experiência
- **Hero cinematográfico** full-viewport com parallax multi-camada controlado por mouse
- **Modelo 3D interativo** (Three.js + React Three Fiber) com fallback procedural
- **Scroll Storytelling** — camadas do tênis se separam ao rolar (sola → palmilha → Zoom Air → cabedal)
- **Estética Sport Performance** — paleta vermelho #EF233C + volt #D4FF00 + ink #0B0B0F
- **Tipografia atlética** — Anton (display) + Inter (body) + Geist Mono (preços)

### 🛒 E-commerce
- **12 produtos** com dados ricos: rating, reviews, specs técnicas, tamanhos, tecnologias
- **Filtros avançados** por categoria, preço e tamanho com chips animados
- **Quick View modal** — visualize e adicione ao carrinho sem sair da página
- **Wishlist persistente** em localStorage
- **Carrinho** com controles +/-, cupom de desconto (`BEMVINDO10`), barra de progresso de frete grátis
- **Checkout de 2 etapas**: endereço (validado com Zod) + pagamento (crédito/Pix mock)
- **Tela de sucesso** com confetti e número de pedido único (`SNK-2026-XXXXX`)

### 🔍 PDP Imersivo (Product Detail Page)
- **Galeria de imagens** com thumbnails + zoom on hover + lightbox fullscreen
- **Seletor de tamanho** com estados visual (disponível/selecionado/esgotado)
- **Abas**: Descrição, Especificações, Avaliações (com distribuição), Entrega
- **Produtos relacionados** em carousel horizontal
- **Sticky Buy Bar** no mobile
- **Breadcrumbs** animados

### ⚡ Performance & SEO
- **Server Components** em rotas não-interativas
- **JSON-LD** (Product + BreadcrumbList) em cada PDP
- **OG images dinâmicas** via `/api/og` (Edge Runtime)
- **Sitemap.xml** e **robots.txt** gerados dinamicamente
- **Loading states** (skeletons) em todas as rotas
- **Error boundaries** com retry UI
- **404 estilizado** com animações on-brand
- **Security headers** (X-Frame-Options, CSP, etc.)

### 📱 Responsividade
- Mobile-first, testado em 375px, 768px, 1024px, 1440px
- Menu mobile slide-in
- Filtros em drawer (mobile) / sidebar (desktop)
- Sticky Buy Bar exclusiva mobile

---

## 🛠 Tech Stack

| Camada | Tecnologia |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack, Server Components) |
| **Linguagem** | TypeScript 5 (strict) |
| **Estilização** | Tailwind CSS 3.4 |
| **Animações** | Framer Motion 12 (useScroll, useTransform, AnimatePresence) |
| **3D** | Three.js + @react-three/fiber + @react-three/drei |
| **State** | Zustand 5 (com persist middleware) |
| **Forms** | react-hook-form + zod + @hookform/resolvers |
| **Ícones** | Lucide React |
| **Toasts** | Sonner |
| **Confetti** | canvas-confetti |
| **Utilities** | clsx + tailwind-merge |

---

## 🚀 Como Executar

### Pré-requisitos
- **Node.js 18+** (recomendado: 20 LTS)
- **npm 9+**

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/sneakers.git
cd sneakers

# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:3000** no navegador.

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Dev server com Turbopack (HMR rápido) |
| `npm run build` | Compilação de produção (TypeScript + otimizações) |
| `npm run start` | Serve a build de produção |
| `npm run lint` | ESLint |

### Teste o cupom
No carrinho, digite **`BEMVINDO10`** para 10% de desconto.

---

## 📁 Estrutura do Projeto

```
sneakers/
├── specs/                          # 📋 Documentação SDD (PRD + Spec + ADRs)
│   ├── PRD.md
│   ├── technical-spec.md
│   ├── decisions.md
│   └── README.md
├── public/
│   ├── models/                     # Modelo 3D .glb (opcional)
│   ├── shoe_icon.png
│   └── ...
└── src/
    ├── app/                        # Next.js App Router
    │   ├── layout.tsx              # Root layout (fonts, metadata, Toaster)
    │   ├── not-found.tsx           # 404 customizado
    │   ├── sitemap.ts              # Sitemap dinâmico
    │   ├── robots.ts               # robots.txt
    │   ├── api/og/route.tsx        # OG image generator (Edge)
    │   └── (shop)/                 # Route group
    │       ├── layout.tsx          # Header + Footer + CartDrawer
    │       ├── page.tsx            # 🏠 Home (orquestra 8 seções)
    │       ├── loading.tsx         # Skeleton da home
    │       ├── error.tsx           # Error boundary
    │       ├── product/
    │       │   ├── page.tsx        # 📦 Listing (filtros + sort + quickview)
    │       │   ├── loading.tsx
    │       │   └── [id]/
    │       │       ├── page.tsx    # 🎯 PDP (Server Component + JSON-LD)
    │       │       ├── ProductPageClient.tsx
    │       │       └── loading.tsx
    │       ├── wishlist/page.tsx   # ❤️ Favoritos
    │       └── checkout/
    │           ├── page.tsx        # 💳 Checkout (2 steps + zod)
    │           └── success/page.tsx # 🎉 Confetti + order ID
    ├── components/
    │   ├── ui/                     # Design System (Button, Badge, Skeleton, ...)
    │   ├── header/Header.tsx       # Nav com wishlist + cart badges
    │   ├── layout/
    │   │   ├── CartDrawer.tsx      # Carrinho lateral
    │   │   └── Footer.tsx          # 5 colunas + pagamentos
    │   ├── shop/                   # Home + Listing
    │   │   ├── Hero.tsx            # 🎬 Hero cinematográfico
    │   │   ├── HeroParallax.tsx    # Mouse-move parallax
    │   │   ├── Sneaker3D.tsx       # 🧊 Three.js com fallback
    │   │   ├── Sneaker3DScene.tsx
    │   │   ├── ScrollStorytelling.tsx  # 📜 Camadas do tênis
    │   │   ├── BrandStrip.tsx      # Marquee de logos
    │   │   ├── CategoryShowcase.tsx
    │   │   ├── BestSellers.tsx
    │   │   ├── Testimonials.tsx
    │   │   ├── InstagramFeed.tsx
    │   │   ├── Newsletter.tsx
    │   │   ├── ProductCardEnhanced.tsx
    │   │   ├── ProductFilters.tsx
    │   │   ├── SortDropdown.tsx
    │   │   ├── ActiveFilters.tsx
    │   │   └── QuickViewModal.tsx
    │   └── pdp/                    # Product Detail Page
    │       ├── ImageGallery.tsx    # Zoom + lightbox
    │       ├── SizeSelector.tsx
    │       ├── ProductTabs.tsx
    │       ├── RelatedProducts.tsx
    │       ├── Breadcrumbs.tsx
    │       └── StickyBuyBar.tsx
    ├── data/products.ts            # Catálogo mock enriquecido
    └── lib/
        ├── types.ts                # TypeScript interfaces
        ├── store.ts                # Cart (Zustand + persist)
        ├── wishlistStore.ts        # Wishlist (Zustand + persist)
        ├── constants.ts            # Business rules
        └── utils.ts                # cn(), formatPrice(), etc.
```

---

## 💡 Destaques Técnicos

### Zustand com persistência

```typescript
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, selectedSize) => set((state) => {
        const existing = state.items.find(
          (i) => i.id === product.id && i.selectedSize === selectedSize
        );
        // ... lógica de incremento com limite de 5 unidades
      }),
      applyCoupon: (code) => {
        if (code.toUpperCase() === "BEMVINDO10") {
          set({ couponDiscount: 0.1 });
          return true;
        }
        return false;
      },
      // ...
    }),
    { name: "sneakers:cart" }
  )
);
```

### Parallax controlado por mouse (Hero)

```typescript
const rawX = useMotionValue(0);
const bgX = useSpring(rawX, { stiffness: 80, damping: 20 });  // camada lenta
const fgX = useSpring(rawX, { stiffness: 160, damping: 18 });  // camada rápida

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    rawX.set(x);
  };
  // ...
}, []);
```

### OG Image dinâmica (Edge Runtime)

```typescript
export const runtime = "edge";

export async function GET(request: NextRequest) {
  const title = searchParams.get("title");
  return new ImageResponse(
    <div style={{ display: "flex", background: "#0B0B0F", ... }}>
      <h1>{title}</h1>
      <img src={imageUrl} />
    </div>,
    { width: 1200, height: 630 }
  );
}
```

---

## 🧪 Critérios de Aceitação (validados)

- [x] Build (`npm run build`) sem erros de TypeScript
- [x] Fluxo completo: Home → Listing → PDP → Cart → Checkout → Success
- [x] 3 fatores UAU funcionam (parallax, 3D, storytelling)
- [x] Filtros atualizam grid com animação
- [x] Cupom `BEMVINDO10` aplica 10% de desconto
- [x] Wishlist persiste após reload (localStorage)
- [x] Carrinho persiste após reload
- [x] OG image gera corretamente em `/api/og`
- [x] JSON-LD renderiza no `<head>` das PDPs
- [x] Sitemap inclui todas as rotas
- [x] Loading skeletons aparecem durante carregamento
- [x] 404 estilizado em rotas inválidas
- [x] Responsivo em 4 breakpoints

---

## 📊 Roadmap / Próximos Passos

Ideias para expansão futura:
- [ ] Dark mode toggle
- [ ] Testes E2E com Playwright
- [ ] Integração com backend real (Supabase/Prisma)
- [ ] Stripe para pagamentos reais
- [ ] CMS (Sanity/Strapi) para gerenciar produtos
- [ ] PWA (offline + push notifications)
- [ ] i18n (PT/EN)
- [ ] Analytics (Plausible / Vercel Analytics)

---

## 📄 Licença

Projeto de portfólio demonstrativo. Código aberto para fins educacionais.

Marcas, logos e nomes de produtos pertencem aos seus respectivos proprietários.

---

## 👨‍💻 Autor

**Emerson Sinezio**

[GitHub](https://github.com/EmersonSinezio) · [LinkedIn](https://linkedin.com/in/emersonsineziio)

---

**⭐ Se este projeto te inspirou, deixe uma estrela!**
