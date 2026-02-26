import { motion } from "framer-motion"
import { ItemCard } from "../components/ItemCard"

// Mock data for display
const mockCollections = [
    {
        id: 1,
        title: "Neon Genesis Evangelion",
        subtitle: "Anime DVD Set",
        imageUrl: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Cyberpunk Red Corebook",
        subtitle: "Tabletop RPG",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Akira Vol 1-6",
        subtitle: "Manga Full Set",
        imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Mechanical Keyboard",
        subtitle: "Custom Build",
        imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Ghost in the Shell",
        subtitle: "Blu-Ray Edition",
        imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop"
    }
]

export function Home() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header section with entrance animation */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-2"
            >
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-anime-accent/80">
                    Discover
                </h2>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                    Featured Collections
                </h1>
                <p className="text-gray-400 max-w-xl text-lg">
                    Explore your curated items with a minimal, dark aesthetic. Hover over the cards to reveal actions and details.
                </p>
            </motion.header>

            {/* Grid displaying the cards */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {mockCollections.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                    >
                        <ItemCard
                            title={item.title}
                            subtitle={item.subtitle}
                            imageUrl={item.imageUrl}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
