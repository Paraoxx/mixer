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
        <div className="flex h-screen bg-anime-bg text-white overflow-hidden">
            {/* Sidebar Navigation */}
            <motion.aside
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-64 border-r border-anime-border bg-anime-card backdrop-blur-md hidden md:flex flex-col z-10"
            >
                <div className="p-6 h-full flex flex-col">
                    {/* Logo / Title Area */}
                    <div className="mb-12 cursor-default pt-2">
                        <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            KOREKUSHON
                        </h1>
                        <p className="text-xs tracking-[0.2em] text-anime-accent mt-1 uppercase font-bold">
                            Collections Library
                        </p>
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

                    {/* User Profile Snippet */}
                    <div className="mt-auto border-t border-anime-border/50 pt-6">
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-anime-accent to-purple-800 p-[2px]">
                                <img
                                    src="https://images.unsplash.com/photo-1544256718-3b61023a5472?w=100&h=100&fit=crop"
                                    alt="Avatar"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-semibold tracking-wide group-hover:text-anime-accent transition-colors">Mateus</p>
                                <p className="text-xs text-gray-500">Pro Curator</p>
                            </div>
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
