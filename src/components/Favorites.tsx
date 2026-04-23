import { motion } from 'motion/react';
import { Utensils, Coffee, Palette } from 'lucide-react';

const FAVORITES = [
  {
    title: "Makanan",
    content: "Mie Ayam",
    icon: <Utensils className="w-5 h-5" />,
    image: "https://raw.githubusercontent.com/RizkyNs/portfolio-assets/main/aestethic%20pic.webp"
  },
  {
    title: "Minuman",
    content: "Kopi, Matcha",
    icon: <Coffee className="w-5 h-5" />,
    image: "https://raw.githubusercontent.com/RizkyNs/portfolio-assets/main/cool.jpg"
  },
  {
    title: "Warna",
    content: "Biru Lembut, Oranye Senja",
    icon: <Palette className="w-5 h-5" />,
    image: "https://raw.githubusercontent.com/RizkyNs/portfolio-assets/main/fun2.webp"
  }
];

export default function Favorites() {
  return (
    <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-12 md:mb-16 text-center">
        <span className="text-xs uppercase tracking-[0.5em] text-sky-blue/50 mb-4">Preferences</span>
        <h3 className="text-4xl font-display font-bold">My Favorite Things</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FAVORITES.map((fav, index) => (
          <motion.div
            key={fav.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`p-6 rounded-2xl bg-white/5 border border-white/10 ${fav.title === 'Warna' ? 'md:col-span-2 lg:col-span-1' : ''} flex flex-col justify-between group hover:border-blue-500/30 transition-all cursor-default`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">{fav.title}</span>
              <div className="text-blue-400 opacity-50 group-hover:opacity-100 transition-opacity">
                {fav.icon}
              </div>
            </div>
            
            <div className="flex justify-between items-end">
               <span className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">
                 {fav.content}
               </span>
               {fav.title === 'Warna' && (
                 <div className="flex space-x-1">
                   <div className="w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>
                   <div className="w-4 h-4 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]"></div>
                 </div>
               )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
