import { Outlet, NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import { Layers, Library, Settings, Search } from "lucide-react"

export function AppLayout() {
    const navLinks = [
        { name: "Explore", path: "/", icon: <Search size={20} /> },
        { name: "My Collections", path: "/collections", icon: <Library size={20} /> },
        { name: "Categories", path: "/categories", icon: <Layers size={20} /> },
        { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    ]

    return (
        <div className="flex h-screen bg-anime-bg text-white overflow-hidden bg-halftone">
            {/* Sidebar Navigation */}
            <motion.aside
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-64 border-r border-anime-border bg-anime-card backdrop-blur-md hidden md:flex flex-col z-10"
            >
                <div className="p-6 h-full flex flex-col">
                    {/* Logo / Title Area */}
                    <div className="mb-12 cursor-default pt-2 relative">
                        <div className="flex flex-col transform -skew-x-12">
                            <h1 className="text-3xl font-black tracking-tighter uppercase relative z-10 flex flex-col items-start gap-1">
                                <span
                                    className="bg-red-600 text-white px-3 py-1 transform -rotate-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                    style={{ clipPath: 'polygon(0 0, 100% 5%, 95% 100%, 5% 95%)' }}
                                >
                                    MINHA
                                </span>
                                <span
                                    className="bg-white text-black px-3 py-1 transform rotate-1 shadow-[4px_4px_0px_#dc2626] ml-4"
                                    style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
                                >
                                    COLEÇÃO
                                </span>
                            </h1>
                            <p className="text-[10px] tracking-[0.3em] text-white bg-black px-2 mt-4 uppercase font-black w-max ml-8 shadow-[2px_2px_0_#dc2626] transform rotate-1">
                                Phantom Thieves
                            </p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) => `
                  group flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300
                  ${isActive
                                        ? "bg-anime-accent/10 text-anime-accent font-medium shadow-[inset_0_0_20px_rgba(244,63,94,0.05)] border border-anime-accent/20"
                                        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                                    }
                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span className={`transition-colors duration-300 ${isActive ? "text-anime-accent" : "text-gray-500 group-hover:text-gray-300"}`}>
                                            {link.icon}
                                        </span>
                                        <span className="tracking-wide text-sm">{link.name}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNavIndicator"
                                                className="absolute left-0 w-1 h-8 bg-anime-accent rounded-r-md shadow-[0_0_10px_rgba(244,63,94,0.8)]"
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* About Me snippet */}
                    <div className="mt-auto pt-6">
                        <div
                            className="bg-black text-white p-4 border-l-4 border-red-600 shadow-[2px_2px_0_#fff] transform -rotate-1"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}
                        >
                            <p className="text-xs font-medium leading-relaxed italic opacity-90">
                                "Esse é um site particular voltado para catalogação pessoal de itens redpill que eu tenho, se voce nao souber quebrar a pedra grande, peço para que se retire dele."
                            </p>
                        </div>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative">
                {/* subtle background decoration */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-anime-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <div className="max-w-7xl mx-auto p-4 md:p-8 relative z-0">
                    {/* Topbar logic for mobile could go here, omitting for brevity */}
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
