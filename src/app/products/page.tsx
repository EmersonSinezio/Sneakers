"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import SidebarFilters from "../../components/filters/SlidebarFilters";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types/product";
import { FiLoader, FiFilter, FiX } from "react-icons/fi";

// Tipo para os filtros
export interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  search: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filters>({
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    search: "",
  });

  // Buscar produtos na montagem do componente
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Aplicar filtros
  const handleFilterChange = (filters: Filters) => {
    setActiveFilters(filters);
    let result = [...products];

    // Filtro por nome
    if (filters.search) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtro por categoria
    if (filters.category) {
      result = result.filter((product) =>
        product.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Filtro por preço
    result = result.filter(
      (product) =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    setFilteredProducts(result);
  };

  // Limpar todos os filtros
  const clearAllFilters = () => {
    setActiveFilters({
      category: "",
      minPrice: 0,
      maxPrice: 1000,
      search: "",
    });
    setFilteredProducts(products);
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #44021e 0%, #5a0e3d 100%)",
        }}
      >
        <div className="text-center p-8 rounded-xl bg-white bg-opacity-90 shadow-xl">
          <FiLoader className="animate-spin text-4xl mx-auto text-[#af162a]" />
          <p className="mt-4 text-xl font-semibold text-gray-800">
            Carregando produtos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(to bottom, #44021e, #5a0e3d)" }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Cabeçalho da página */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Nossos Calçados
            </h1>
            <p className="text-white opacity-80">
              {filteredProducts.length} produtos encontrados
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 bg-[#af162a] hover:bg-[#830024] text-white font-bold py-2 px-4 rounded-full transition-colors"
            >
              <FiFilter className="text-lg" />
              Filtros
            </button>
          </div>
        </div>

        {/* Filtros ativos */}
        {activeFilters.category ||
        activeFilters.search ||
        activeFilters.minPrice > 0 ||
        activeFilters.maxPrice < 1000 ? (
          <div className="mb-6 bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-xl">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-white font-medium">Filtros aplicados:</span>

              {activeFilters.category && (
                <div className="flex items-center gap-2 bg-[#830024] text-white px-3 py-1 rounded-full">
                  <span>{activeFilters.category}</span>
                  <button
                    onClick={() =>
                      handleFilterChange({ ...activeFilters, category: "" })
                    }
                    className="text-white hover:text-gray-200"
                  >
                    <FiX />
                  </button>
                </div>
              )}

              {activeFilters.search && (
                <div className="flex items-center gap-2 bg-[#830024] text-white px-3 py-1 rounded-full">
                  <span>Busca: {activeFilters.search}</span>
                  <button
                    onClick={() =>
                      handleFilterChange({ ...activeFilters, search: "" })
                    }
                    className="text-white hover:text-gray-200"
                  >
                    <FiX />
                  </button>
                </div>
              )}

              {(activeFilters.minPrice > 0 ||
                activeFilters.maxPrice < 1000) && (
                <div className="flex items-center gap-2 bg-[#830024] text-white px-3 py-1 rounded-full">
                  <span>
                    Preço: ${activeFilters.minPrice} - ${activeFilters.maxPrice}
                  </span>
                  <button
                    onClick={() =>
                      handleFilterChange({
                        ...activeFilters,
                        minPrice: 0,
                        maxPrice: 1000,
                      })
                    }
                    className="text-white hover:text-gray-200"
                  >
                    <FiX />
                  </button>
                </div>
              )}

              <button
                onClick={clearAllFilters}
                className="ml-auto text-[#af162a] hover:text-[#830024] font-medium flex items-center gap-1"
              >
                <FiX className="text-lg" />
                Limpar todos
              </button>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtros para desktop */}
          <div className="hidden md:block w-full md:w-64">
            <SidebarFilters
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
            />
          </div>

          {/* Filtros mobile */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex md:hidden">
              <div
                className="w-4/5 max-w-sm bg-white h-full ml-auto p-6 overflow-y-auto"
                style={{
                  background: "linear-gradient(to bottom, #44021e, #5a0e3d)",
                }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Filtros</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-white text-2xl"
                  >
                    <FiX />
                  </button>
                </div>
                <SidebarFilters
                  onFilterChange={(filters) => {
                    handleFilterChange(filters);
                    setMobileFiltersOpen(false);
                  }}
                  activeFilters={activeFilters}
                />
              </div>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="flex-1 text-center py-12 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl">
              <div className="max-w-md mx-auto">
                <div className="text-6xl text-[#af162a] mb-4">😢</div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Nenhum produto encontrado
                </h2>
                <p className="text-white opacity-80 mb-6">
                  Não encontramos produtos que correspondam aos seus critérios
                  de busca.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#af162a] hover:bg-[#830024] text-white font-bold py-3 px-8 rounded-full transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
