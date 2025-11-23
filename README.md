# 👟 Sneakers - E-commerce Premium

[![Next.js](https://img.shields.io/badge/Next.js-15.0.0-000000?logo=next.js)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?logo=typescript)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com/) [![Zustand](https://img.shields.io/badge/Zustand-State_Management-764ABC?logo=react)](https://github.com/pmndrs/zustand)

Uma aplicação web moderna e responsiva de e-commerce focada em sneakers exclusivos, desenvolvida com **Next.js 15 (App Router) + TypeScript** e estilizada com **Tailwind CSS**.

> 🎓 **Nota:** Este projeto foi totalmente refeito utilizando práticas de desenvolvimento mais atuais, aplicando conhecimentos modernos de arquitetura frontend, performance e UX.

## ✨ Funcionalidades do Projeto

* **🛒 Carrinho de Compras Global:** Gerenciamento de estado robusto com **Zustand**, persistindo itens e calculando totais em tempo real.
* **🎨 Design Premium:** Interface limpa e moderna com animações suaves usando **Framer Motion**.
* **📱 Totalmente Responsivo:** Layout adaptável para desktop, tablet e mobile.
* **⚡ Next.js App Router:** Roteamento moderno e otimizado com Server Components.
* **🔔 Notificações Toast:** Feedback visual elegante usando **Sonner** para ações como adicionar ao carrinho e finalizar compra.
* **🔍 Páginas Dinâmicas de Produto:** Rotas dinâmicas (`[id]`) para exibição detalhada de cada sneaker.
* **🛍️ Cart Drawer:** Gaveta lateral de carrinho com animações de entrada e saída.

---

## 🛠 Tecnologias e Conceitos Aplicados

| Tecnologia | Descrição |
| :--- | :--- |
| **Next.js 15** | Framework React para produção com Server Components e App Router. |
| **TypeScript** | Superset do JavaScript que adiciona tipagem estática ao código. |
| **Tailwind CSS** | Framework CSS utility-first para estilização rápida e consistente. |
| **Zustand** | Gerenciamento de estado global leve e performático. |
| **Framer Motion** | Biblioteca de animações declarativas para React. |
| **Lucide React** | Biblioteca de ícones SVG modernos e customizáveis. |
| **Sonner** | Sistema de notificações toast elegante. |

---

## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* **Node.js 18+** (recomendado: versão LTS)
* **npm** ou **yarn**
* **Git**

---

## 🚀 Como Executar

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/Sneakers.git
   cd Sneakers
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**

   Abra [http://localhost:3000](http://localhost:3000) para visualizar a aplicação.

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento com Turbopack |
| `npm run build` | Compila o projeto para produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run lint` | Executa o ESLint para verificar problemas no código |

---

## 🧱 Estrutura do Projeto

```
src/
├── app/                 # Next.js App Router
│   ├── (shop)/          # Grupo de rotas da loja
│   │   ├── product/     # Rotas de produtos
│   │   │   └── [id]/    # Rota dinâmica de detalhes do produto
│   │   └── page.tsx     # Página Inicial
│   ├── layout.tsx       # Layout Raiz (Root Layout)
│   └── globals.css      # Estilos globais
├── components/          # Componentes reutilizáveis
│   ├── header/          # Header e Navegação
│   ├── layout/          # Componentes estruturais (CartDrawer)
│   └── shop/            # Componentes da loja (ProductCard, Hero)
├── data/                # Dados estáticos (products.ts)
├── lib/                 # Utilitários e Configurações
│   ├── store.ts         # Store do Zustand (Carrinho)
│   └── types.ts         # Definições de Tipos TypeScript
└── ...
```

---

## 💡 Destaque de Código

### Zustand - Gerenciamento do Carrinho

O `useCartStore` gerencia todo o estado do carrinho de forma simples e eficaz, sem a necessidade de Context Providers complexos:

```typescript
// src/lib/store.ts
export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    isOpen: false,
    toggleCart: () => set({ isOpen: !get().isOpen }),
    addItem: (product) =>
        set((state) => {
            const existing = state.items.find((i) => i.id === product.id);
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }
            return { items: [...state.items, { ...product, quantity: 1 }] };
        }),
    // ... remove, total, clearCart
}));
```

### Página Dinâmica de Produto (Server Component)

Utilizando o poder dos Server Components para buscar dados e gerar metadados de SEO dinamicamente:

```typescript
// src/app/(shop)/product/[id]/page.tsx
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const product = PRODUCTS.find((p) => p.id === id);

    return {
        title: `${product?.name} | Sneakers`,
        description: product?.description,
    };
}
```

---

## 🎨 Características de Design

* **Paleta de Cores:** Foco em Branco, Cinza e o Vermelho vibrante da marca (Primary Color).
* **Tipografia:** Fontes modernas e legíveis.
* **Interatividade:** Feedback visual imediato ao passar o mouse ou clicar em elementos.
* **Glassmorphism:** Efeitos de desfoque no header e elementos flutuantes.

---

## 👨‍💻 Autor

Desenvolvido por [Emerson Sinezio](https://github.com/EmersonSinezio)

---

**⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!**
