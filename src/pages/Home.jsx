import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"

export function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/items")
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error("Error fetching items:", error));
    }, []);

    return (
        <div className="space-y-12 pb-12">
            {/* About Me Top Section */}
            <motion.section
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full relative z-10"
            >
                <div className="transform -skew-x-2 mb-4">
                    <h2 className="text-4xl font-black italic text-white tracking-tighter drop-shadow-[3px_3px_0_#dc2626]">
                        SOBRE MIM
                    </h2>
                    <div className="h-1 w-24 bg-white mt-1 shadow-[2px_2px_0_rgba(220,38,38,1)]" />
                </div>

                <div
                    className="bg-black text-white p-6 md:p-8 border-l-8 border-red-600 shadow-[6px_6px_0_#fff] transform rotate-1 transition-transform hover:rotate-0"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0% 100%)' }}
                >
                    <p className="text-sm md:text-lg font-bold leading-relaxed italic tracking-wide">
                        "Esse é um site particular voltado para catalogação pessoal de itens redpill que eu tenho, se voce nao souber quebrar a pedra grande, peço para que se retire dele."
                    </p>
                </div>
            </motion.section>

            {/* Dense Grid Section (MFC Style) */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="transform -skew-x-2 mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter drop-shadow-[3px_3px_0_#dc2626]">
                            Itens Disponíveis
                        </h2>
                        <div className="h-1 w-32 bg-white mt-1 shadow-[2px_2px_0_rgba(220,38,38,1)]" />
                    </div>
                    <div className="bg-red-600 text-black px-3 py-1 font-black italic text-sm border-2 border-black transform rotate-2">
                        {items.length} ITENS
                    </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
                    {items.map((item, index) => {
                        // Determine border color based on category
                        const getBorderColor = (category) => {
                            switch (category) {
                                case 'Jogos': return 'border-blue-500';
                                case 'Figures': return 'border-purple-500';
                                case 'Cartas': return 'border-yellow-500';
                                case 'Mangás': return 'border-green-500';
                                default: return 'border-gray-500';
                            }
                        };

                        return (
                            <motion.div
                                key={`db-grid-${item.id}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.03 }}
                                className="group relative aspect-square cursor-pointer overflow-hidden bg-black"
                                style={{
                                    clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
                                }}
                            >
                                {/* Base Border */}
                                <div className={`absolute inset-0 border-2 ${getBorderColor(item.category)} opacity-70 transition-colors z-10 pointer-events-none group-hover:border-red-600 group-hover:border-4 group-hover:opacity-100`} />

                                {/* Image */}
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125 group-hover:brightness-50"
                                    loading="lazy"
                                />

                                {/* Persona Hover Content */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                    <div className="bg-red-600 text-black p-2 rounded-full transform rotate-12 group-hover:rotate-0 transition-transform duration-300 shadow-[2px_2px_0_#fff]">
                                        <Plus size={24} strokeWidth={4} />
                                    </div>
                                </div>

                                {/* Quick tooltip-like banner at bottom on hover */}
                                <div className="absolute bottom-0 left-0 w-full bg-black/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 p-1 border-t-2 border-red-600">
                                    <p className="text-[10px] sm:text-xs font-bold text-white truncate text-center uppercase tracking-tighter">
                                        {item.title}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>
        </div>
    )
}
