"use client";
import React, { useState, useEffect } from 'react';

import { PRODUCTS } from '@/data/products';

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % PRODUCTS.length);
        }, 3000); // Muda a cada 3 segundos

        return () => clearInterval(interval);
    }, [isPaused]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % PRODUCTS.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
    };

    return (
        <div className="relative overflow-hidden hero-gradient">
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-16 flex flex-col lg:flex-row items-center gap-8 hero-height">
                {/* Copy */}
                <div className="w-full lg:w-1/2">
                    <div className="max-w-lg">
                        <p className="text-sm uppercase tracking-wide text-primary font-medium">Edição Limitada</p>
                        <h1 className="mt-4 text-4xl sm:text-5xl font-display leading-tight text-slate-900 font-bold">
                            Passos que contam histórias — design autoral
                        </h1>
                        <p className="mt-4 text-base text-slate-600">
                            Coleção assinada com couro natural e solados reinventados para conforto durante todo o dia. Cada par é numerado e acompanha certificado de origem.
                        </p>

                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <a href="#" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-medium shadow-lg hover:opacity-95 transition-opacity">
                                Comprar edição
                            </a>
                            <a href="#" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
                                Veja o lookbook
                            </a>
                        </div>

                        <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-600">
                            <li className="flex items-center gap-3"><span className="font-medium text-slate-900">+1000</span> avaliações 5★</li>
                            <li className="flex items-center gap-3"><span className="font-medium text-slate-900">30 dias</span> garantia de troca</li>
                            <li className="flex items-center gap-3"><span className="font-medium text-slate-900">Frete</span> grátis acima de R$ 199</li>
                            <li className="flex items-center gap-3"><span className="font-medium text-slate-900">Atendimento</span> personalizado</li>
                        </ul>
                    </div>
                </div>

                {/* Visual / Produto */}
                <div className="w-full lg:w-1/2 flex items-center justify-center relative">
                    <div className="relative w-[360px] h-[360px] lg:w-[420px] lg:h-[420px]">
                        <div className="absolute inset-0 rounded-2xl bg-white shadow-2xl transform rotate-[-6deg]"></div>
                        {/* Using img tag as requested for external URL, or could use Next Image with config */}
                        <img
                            src="https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Tênis vermelho elegante"
                            className="relative rounded-2xl object-cover w-full h-full float"
                        />

                        {/* Badge pequeno */}
                        <div className="absolute -bottom-6 right-4 bg-white rounded-xl px-4 py-2 shadow-md flex items-center gap-3 z-10">
                            <div className="text-sm">
                                <div className="text-xs text-slate-500">Mais vendido</div>
                                <div className="text-sm font-medium text-gray-900">Runner Select</div>
                            </div>
                            <div className="text-sm text-primary font-bold">R$ 429</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mini galeria de produtos (Carousel Controlado) */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                <div
                    className="relative w-full rounded-2xl shadow-inner bg-white p-4 overflow-hidden group"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="relative h-[500px] w-full">
                        {PRODUCTS.map((item, index) => (
                            <div
                                key={item.id}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col items-center justify-center bg-slate-50 rounded-xl p-8 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                    }`}
                            >
                                <div className="w-[500px] h-[90%] relative mb-4">
                                    <img
                                        src={item.images[0]}
                                        className="w-full h-full object-cover rounded-lg shadow-md"
                                        alt={item.name}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                                <p className="text-primary font-bold">R$ {item.price}</p>
                            </div>
                        ))}
                    </div>

                    {/* Controles */}
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={prevSlide} className="btn btn-circle btn-ghost bg-white/80 hover:bg-white shadow-md">❮</button>
                        <button onClick={nextSlide} className="btn btn-circle btn-ghost bg-white/80 hover:bg-white shadow-md">❯</button>
                    </div>

                    {/* Indicadores */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                        {PRODUCTS.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-primary w-4' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Rodapé compacto / Newsletter */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-12">
                <div className="bg-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-gray-100">
                    <div className="text-sm text-slate-600">Assine para 10% OFF na primeira compra</div>
                    <form className="flex gap-2 w-full sm:w-auto">
                        <input aria-label="email" placeholder="Seu e-mail" className="px-4 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                        <button type="button" className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors">Quero desconto</button>
                    </form>
                </div>
            </section>
        </div>
    );
}
