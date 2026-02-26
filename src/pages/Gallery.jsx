import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ItemCard } from "../components/ItemCard";
import { ItemDetails } from "../components/ItemDetails";
import { mockData } from "../mockData";

const filters = ["Todos", "Mangás", "Figures", "Jogos", "Cartas"];

export function Gallery() {
    const [activeFilter, setActiveFilter] = useState("Todos");
    const [selectedItem, setSelectedItem] = useState(null);

    const filteredItems = activeFilter === "Todos"
        ? mockData
        : mockData.filter(item => item.subtitle === activeFilter);

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col gap-8">
                {/* Header & Filters */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Galeria</h1>
                        <p className="text-slate-400 mt-1">Explore sua coleção de itens</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter
                                    ? "bg-anime-accent text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                    : "bg-anime-card border border-anime-border text-slate-300 hover:bg-slate-800"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gallery Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                key={item.id}
                            >
                                <ItemCard
                                    item={item}
                                    onClick={() => setSelectedItem(item)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        Nenhum item encontrado para este filtro.
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <ItemDetails
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
