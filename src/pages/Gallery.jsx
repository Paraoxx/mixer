import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ItemCard } from "../components/ItemCard";
import { ItemDetails } from "../components/ItemDetails";
import { mockData } from "../mockData";

const filters = ["Mangás", "Figures", "Jogos", "Cartas", "Desejáveis"];

export function Gallery() {
    const [activeFilter, setActiveFilter] = useState("Mangás");
    const [selectedItem, setSelectedItem] = useState(null);

    const filteredItems = mockData.filter(item => item.subtitle === activeFilter);

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col gap-8">
                {/* Header & Filters */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="transform -skew-x-6">
                        <h1 className="text-4xl md:text-5xl font-black italic text-white tracking-tighter drop-shadow-[4px_4px_0_#dc2626]">GALERIA</h1>
                        <p className="text-white bg-black px-2 mt-2 w-max text-xs uppercase font-bold tracking-widest shadow-[2px_2px_0_#dc2626]">
                            Explore sua coleção de itens
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-6 md:mt-0">
                        {filters.map((filter, i) => (
                            <motion.button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 3 : -3 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2 text-sm md:text-base font-black uppercase tracking-widest transition-none border-2 ${activeFilter === filter
                                    ? "bg-red-600 text-black border-red-600 shadow-[4px_4px_0px_#fff]"
                                    : "bg-black text-white border-white hover:bg-red-600 hover:text-black hover:border-black hover:shadow-[4px_4px_0px_#fff]"
                                    }`}
                                style={{
                                    clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
                                }}
                            >
                                {filter}
                            </motion.button>
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
                    <div className="text-center py-20 text-slate-500 font-bold uppercase tracking-widest">
                        Nenhum item encontrado.
                    </div>
                )}

                {/* Database Explorer View */}
                <div className="mt-12">
                    <div className="mb-6 transform -skew-x-6">
                        <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter drop-shadow-[3px_3px_0_#dc2626]">
                            Database
                        </h2>
                        <div className="h-1 w-32 bg-white mt-1 shadow-[2px_2px_0_rgba(220,38,38,1)]" />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-red-600 text-black border-b-4 border-black font-black uppercase tracking-widest text-sm">
                                    <th className="p-4" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}>Nome</th>
                                    <th className="p-4">Categoria</th>
                                    <th className="p-4">Data de Aquisição</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((item, index) => (
                                    <motion.tr
                                        key={`db-${item.id}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-anime-border/30 hover:bg-white/5 transition-colors group cursor-pointer"
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        <td className="p-4 font-bold text-white group-hover:text-red-500 transition-colors uppercase">
                                            {item.title}
                                        </td>
                                        <td className="p-4 text-gray-400 text-sm tracking-wider uppercase font-medium">
                                            {item.subtitle}
                                        </td>
                                        <td className="p-4 text-gray-400 font-mono text-sm">
                                            {item.acquisitionDate || "Desconhecida"}
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-black text-white text-xs px-2 py-1 font-bold uppercase tracking-wider border border-white/20">
                                                {item.details?.status ||
                                                    item.details?.raridade ||
                                                    (item.details?.editora ? "Na Coleção" : "Catalogado")}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
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
