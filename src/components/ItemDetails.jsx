import { motion } from "framer-motion";

export function ItemDetails({ item, onClose }) {
    if (!item) return null;

    const renderDetails = () => {
        const { details } = item;
        if (!details) return null;

        return (
            <div className="mt-6 flex flex-col gap-4">
                {item.subtitle === "Cartas" && (
                    <>
                        <div className="flex justify-between items-center border-b border-anime-border pb-2">
                            <span className="text-slate-400">Raridade</span>
                            <span className="text-white font-medium">{details.raridade}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-anime-border pb-2">
                            <span className="text-slate-400">Valor Estimado</span>
                            <span className="text-anime-accent font-medium">{details.valorEstimado}</span>
                        </div>
                    </>
                )}
                {item.subtitle === "Jogos" && (
                    <>
                        <div className="flex justify-between items-center border-b border-anime-border pb-2">
                            <span className="text-slate-400">Plataforma</span>
                            <span className="text-white font-medium">{details.plataforma}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-anime-border pb-2">
                            <span className="text-slate-400">Status</span>
                            <span className="text-white font-medium">{details.status}</span>
                        </div>
                    </>
                )}
                {item.subtitle === "Mangás" && (
                    <>
                        <div className="flex justify-between items-center border-b border-anime-border pb-2">
                            <span className="text-slate-400">Volume</span>
                            <span className="text-white font-medium">{details.volume}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-anime-border pb-2">
                            <span className="text-slate-400">Editora</span>
                            <span className="text-white font-medium">{details.editora}</span>
                        </div>
                    </>
                )}
                {item.subtitle === "Figures" && (
                    <>
                        <div className="flex justify-between items-center border-b border-anime-border pb-2">
                            <span className="text-slate-400">Escala</span>
                            <span className="text-white font-medium">{details.escala}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-anime-border pb-2">
                            <span className="text-slate-400">Série</span>
                            <span className="text-white font-medium">{details.serie}</span>
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
                layoutId={`card-container-${item.id}`}
                className="relative w-full max-w-lg bg-anime-card border border-anime-border rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10 max-h-[90vh]"
            >
                <div className="relative w-full aspect-video sm:aspect-[4/3] bg-black">
                    <motion.img
                        layoutId={`card-image-${item.id}`}
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-anime-card via-transparent to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto">
                    <motion.div layoutId={`card-content-${item.id}`}>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            {item.title}
                        </h2>
                        <p className="text-anime-accent text-sm font-medium tracking-wider uppercase">
                            {item.subtitle}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {renderDetails()}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
