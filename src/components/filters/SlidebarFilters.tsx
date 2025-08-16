import React from "react";
import { FiFilter } from "react-icons/fi";

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  search: string;
}

interface SidebarFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState<Filters>({
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    search: "",
  });

  // Categorias simuladas
  const categories = ["Tênis", "Sapatos", "Sandálias", "Botas", "Esportivo"];

  const handleChange = (field: keyof Filters, value: string | number) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-full md:w-64">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 dark:text-white">
          <FiFilter /> Filtros
        </h2>

        {/* Campo de busca */}
        <div className="mb-4">
          <label
            htmlFor="search"
            className="block text-sm font-medium mb-1 dark:text-gray-300"
          >
            Buscar
          </label>
          <input
            type="text"
            id="search"
            placeholder="Nome do produto..."
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>

        {/* Filtro por categoria */}
        <div className="mb-4">
          <h3 className="font-medium mb-2 dark:text-gray-300">Categorias</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.category === category}
                    onChange={() =>
                      handleChange(
                        "category",
                        filters.category === category ? "" : category
                      )
                    }
                    className="mr-2"
                  />
                  <span className="dark:text-gray-300">{category}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Filtro por preço */}
        <div>
          <h3 className="font-medium mb-2 dark:text-gray-300">
            Faixa de Preço
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="minPrice"
                className="block text-sm mb-1 dark:text-gray-300"
              >
                Mínimo
              </label>
              <input
                type="number"
                id="minPrice"
                min="0"
                max={filters.maxPrice}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={filters.minPrice}
                onChange={(e) =>
                  handleChange("minPrice", Number(e.target.value))
                }
              />
            </div>
            <div>
              <label
                htmlFor="maxPrice"
                className="block text-sm mb-1 dark:text-gray-300"
              >
                Máximo
              </label>
              <input
                type="number"
                id="maxPrice"
                min={filters.minPrice}
                max="1000"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={filters.maxPrice}
                onChange={(e) =>
                  handleChange("maxPrice", Number(e.target.value))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;
