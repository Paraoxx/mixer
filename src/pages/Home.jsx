import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gallery } from "./Gallery"
import { Plus, Search } from "lucide-react"

export function Home() {
    const [items, setItems] = useState([]);
    const [activeTab, setActiveTab] = useState("Explore");

    // Form states for Settings tab
    const [nickname, setNickname] = useState("Pabllo");
    const [avatarUrl, setAvatarUrl] = useState("https://i.pinimg.com/736x/8d/ad/f4/8dadf490b4adbd52a1ba2e33682be6c6.jpg");
    const [malUrl, setMalUrl] = useState("");
    const [twitterUrl, setTwitterUrl] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/items")
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error("Error fetching items:", error));
    }, []);

    const reversedItems = [...items].reverse();

    const tabs = ["Explore", "Collection", "Settings"];

    return (
        <div className="w-full max-w-7xl mx-auto space-y-8 pb-12 pt-4">
            {/* Top Title */}
            <div className="transform -skew-x-6 mb-8 pl-4 md:pl-0">
                <h1 className="text-4xl md:text-5xl font-black italic text-white tracking-tighter drop-shadow-[4px_4px_0_#dc2626]">
                    MINHA LISTA DE JOGOS
                </h1>
                <p className="text-white bg-black px-2 mt-2 w-max text-xs uppercase font-bold tracking-widest shadow-[2px_2px_0_#dc2626]">
                    Phantom Thieves
                </p>
            </div>

            {/* Profile Header */}
            <header className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 w-full pl-4 md:pl-0 pr-4 md:pr-0">
                {/* Left Side: Avatar & Info */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="shrink-0 relative group">
                        <img
                            src={avatarUrl}
                            alt="Profile Avatar"
                            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl border-4 border-black shadow-[4px_4px_0_#dc2626]"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-sm uppercase tracking-widest cursor-pointer" onClick={() => setActiveTab("Settings")}>Edit</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-start transform -skew-x-2">
                        <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tighter drop-shadow-[3px_3px_0_#dc2626] uppercase">
                            {nickname}
                        </h2>
                        <button
                            onClick={() => setActiveTab("Settings")}
                            className="mt-2 px-3 py-1 bg-black text-white text-[10px] md:text-xs font-bold uppercase tracking-widest border border-white/20 hover:border-red-600 hover:text-red-500 transition-colors shadow-[2px_2px_0_#dc2626] transform -skew-x-6"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Right Side: Search & Add */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64 transform -skew-x-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            className="w-full bg-black border-2 border-white/20 text-white pl-10 pr-4 py-2 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-red-600 focus:shadow-[4px_4px_0_#dc2626] transition-all placeholder-gray-500"
                        />
                    </div>
                    <button className="shrink-0 flex items-center gap-2 bg-red-600 text-black px-4 py-2 font-black uppercase tracking-widest text-sm border-2 border-black hover:bg-white hover:text-red-600 hover:border-red-600 shadow-[4px_4px_0_#fff] transition-all transform -skew-x-6 active:scale-95" style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}>
                        <Plus size={18} strokeWidth={3} />
                        <span>Adicionar</span>
                    </button>
                </div>
            </header>

            {/* Horizontal Tab Navigation (Backloggd / Persona style) */}
            <nav className="w-full mt-8 pl-4 md:pl-0">
                <div className="w-full flex overflow-x-auto pb-4 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <div className="flex gap-4 min-w-max">
                        {tabs.map((tab, i) => (
                            <motion.button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 3 : -3 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2 text-sm md:text-base font-black uppercase tracking-widest transition-none border-2 shrink-0 ${activeTab === tab
                                    ? "bg-red-600 text-black border-red-600 shadow-[4px_4px_0px_#fff]"
                                    : "bg-black text-white border-white hover:bg-red-600 hover:text-black hover:border-black hover:shadow-[4px_4px_0px_#fff]"
                                    }`}
                                style={{
                                    clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
                                }}
                            >
                                {tab}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Tab Content */}
            <main className="w-full min-h-[50vh]">
                <AnimatePresence mode="wait">

                    {/* EXPLORE TAB (Adicionados Recentes) */}
                    {activeTab === "Explore" && (
                        <motion.section
                            key="explore"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="flex justify-between items-end mb-6 pr-4 md:pr-0">
                                <div className="transform -skew-x-2">
                                    <h2 className="text-2xl md:text-3xl font-black italic text-white uppercase tracking-tighter drop-shadow-[2px_2px_0_#dc2626]">
                                        Adicionados Recentes
                                    </h2>
                                    <div className="h-1 w-24 bg-white mt-1 shadow-[2px_2px_0_rgba(220,38,38,1)]" />
                                </div>
                                <button className="text-xs md:text-sm text-gray-400 font-bold uppercase tracking-widest hover:text-red-500 transition-colors">
                                    View All
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 pr-4 md:pr-0">
                                {reversedItems.slice(0, 5).map((item, index) => {
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
                                            key={`recent-${item.id}`}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.2, delay: index * 0.02 }}
                                            className="group relative aspect-[3/4] cursor-pointer overflow-hidden bg-black shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
                                            style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
                                        >
                                            <div className={`absolute inset-0 border-4 ${getBorderColor(item.category)} opacity-40 transition-colors z-10 pointer-events-none group-hover:border-red-600 group-hover:opacity-100`} />

                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-50"
                                                loading="lazy"
                                            />

                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                                <div className="bg-red-600 text-black p-3 rounded-full transform rotate-12 group-hover:rotate-0 transition-transform duration-300 shadow-[2px_2px_0_#fff]">
                                                    <Plus size={24} strokeWidth={4} />
                                                </div>
                                            </div>

                                            <div className="absolute bottom-0 left-0 w-full bg-black/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 px-2 py-3 border-t-4 border-red-600">
                                                <p className="text-xs sm:text-sm font-bold text-white truncate text-center uppercase tracking-tighter">
                                                    {item.title}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.section>
                    )}

                    {/* COLLECTION TAB (Gallery Interface) */}
                    {activeTab === "Collection" && (
                        <motion.section
                            key="collection"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Reusing existing Gallery component but passing it down directly */}
                            {/* We just wrap it so it renders inside the tab area */}
                            <Gallery />
                        </motion.section>
                    )}

                    {/* SETTINGS TAB */}
                    {activeTab === "Settings" && (
                        <motion.section
                            key="settings"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-xl mx-auto md:mx-0 pt-4"
                        >
                            <div className="transform -skew-x-2 mb-8">
                                <h2 className="text-2xl md:text-3xl font-black italic text-white uppercase tracking-tighter drop-shadow-[2px_2px_0_#dc2626]">
                                    Profile Settings
                                </h2>
                                <div className="h-1 w-24 bg-red-600 mt-1 shadow-[2px_2px_0_#fff]" />
                            </div>

                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Profile updated!"); }}>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Alterar Nickname</label>
                                    <input
                                        type="text"
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                        className="bg-black/50 border-2 border-white/20 text-white px-4 py-3 font-medium focus:outline-none focus:border-red-600 focus:shadow-[4px_4px_0_#dc2626] transition-all transform -skew-x-2"
                                        placeholder="Seu Nickname"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-gray-400">URL do Avatar</label>
                                    <input
                                        type="text"
                                        value={avatarUrl}
                                        onChange={(e) => setAvatarUrl(e.target.value)}
                                        className="bg-black/50 border-2 border-white/20 text-white px-4 py-3 font-medium focus:outline-none focus:border-red-600 focus:shadow-[4px_4px_0_#dc2626] transition-all transform -skew-x-2"
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Link MyAnimeList</label>
                                    <input
                                        type="text"
                                        value={malUrl}
                                        onChange={(e) => setMalUrl(e.target.value)}
                                        className="bg-black/50 border-2 border-white/20 text-white px-4 py-3 font-medium focus:outline-none focus:border-red-600 focus:shadow-[4px_4px_0_#dc2626] transition-all transform -skew-x-2"
                                        placeholder="https://myanimelist.net/profile/..."
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Twitter / X</label>
                                    <input
                                        type="text"
                                        value={twitterUrl}
                                        onChange={(e) => setTwitterUrl(e.target.value)}
                                        className="bg-black/50 border-2 border-white/20 text-white px-4 py-3 font-medium focus:outline-none focus:border-red-600 focus:shadow-[4px_4px_0_#dc2626] transition-all transform -skew-x-2"
                                        placeholder="@usuario"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="mt-8 px-8 py-4 bg-red-600 text-black font-black uppercase tracking-widest text-lg border-2 border-black hover:bg-white hover:border-red-600 hover:text-red-600 transition-all shadow-[6px_6px_0_#fff] transform -skew-x-6 active:scale-95"
                                >
                                    Salvar Alterações
                                </button>
                            </form>
                        </motion.section>
                    )}
                </AnimatePresence>
            </main>
        </div>
    )
}
