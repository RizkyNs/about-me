import { motion } from 'motion/react';

export default function About() {
  return (
    <section className="py-24 px-6 md:px-24 flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex justify-center md:justify-start"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-electric-blue/50 to-sky-blue/30 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative glass rounded-2xl overflow-hidden aspect-square max-w-sm">
            <img
              src="https://raw.githubusercontent.com/RizkyNs/portfolio-assets/main/profile.png"
              alt="Ikky Profile"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6"
      >
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">About Me</span>
        </div>
        <p className="text-xl leading-relaxed text-slate-200 font-medium">
          Aku lebih nyaman jadi <span className="text-blue-300">pengamat</span> daripada pusat perhatian. Suka hal-hal digital, design, dan ide random yang muncul tiba-tiba, biasanya malam hari.
        </p>
        <p className="text-lg leading-relaxed text-slate-400">
          Cara aku peduli itu lewat tindakan kecil—ngebantu tanpa banyak ngomong. Nggak selalu konsisten, tapi selalu penasaran sama hal baru.
        </p>
      </motion.div>
    </section>
  );
}
