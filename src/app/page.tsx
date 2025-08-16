import React from "react";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Fundo gradiente com as cores da paleta */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, #44021e 0%, #5a0e3d 30%, #830024 70%, #af162a 100%)`,
        }}
      />

      {/* Efeito de partículas */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              backgroundColor:
                i % 3 === 0 ? "#af162a" : i % 3 === 1 ? "#95003a" : "#5a0e3d",
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `translate(-50%, -50%)`,
            }}
          />
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto e CTA */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-6">
              <span className="text-white font-bold bg-[#95003a] px-4 py-1 rounded-full text-sm">
                NOVA COLEÇÃO
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              <span className="text-white block">SNEAKERS</span>
              <span
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #af162a, #830024)",
                  WebkitBackgroundClip: "text",
                }}
              >
                EXCLUSIVOS
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto lg:mx-0">
              Descubra a coleção perfeita de calçados para cada passo da sua
              jornada. Estilo, conforto e qualidade que acompanham você em todos
              os momentos, definindo seu caminho com elegância e confiança.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/product"
                className="flex items-center justify-center gap-2 bg-[#af162a] hover:bg-[#830024] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1"
              >
                Explorar Coleção
                <FiArrowRight className="text-xl" />
              </Link>
              <Link
                href="/offer"
                className="flex items-center justify-center gap-2 border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-[#44021e] transition-all duration-300"
              >
                Ver Ofertas
              </Link>
            </div>

            {/* Destaques */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8">
              {[
                { value: "1.5k+", label: "Clientes Satisfeitos" },
                { value: "200+", label: "Modelos Exclusivos" },
                { value: "98%", label: "Avaliações Positivas" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <span className="block text-2xl font-bold text-white">
                    {item.value}
                  </span>
                  <span className="block text-sm text-white opacity-80">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Imagem do produto */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Efeito de destaque */}
              <div className="absolute -inset-8 bg-[#95003a] rounded-full opacity-30 blur-3xl animate-pulse"></div>

              {/* Moldura */}
              <div className="relative bg-gradient-to-br from-[#44021e] to-[#5a0e3d] rounded-2xl p-6 shadow-2xl">
                <div className="bg-gradient-to-br from-[#830024] to-[#af162a] rounded-2xl p-8">
                  <div className="bg-white rounded-xl p-12">
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      alt="Tênis Esportivo Premium"
                      className="w-full max-w-md object-contain transform -rotate-6 hover:rotate-0 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Badge de desconto */}
              <div className="absolute -top-4 -right-4 bg-[#af162a] text-white font-bold py-2 px-6 rounded-full rotate-12 shadow-lg">
                30% OFF
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elemento decorativo */}
      <div className="absolute bottom-0 left-0 w-full h-24 z-10">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full h-full"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="#af162a"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="#830024"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="#44021e"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
