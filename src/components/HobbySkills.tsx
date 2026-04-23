import { motion } from 'motion/react';

const TAGS = [
  "Dengerin musik",
  "Main ML",
  "Ngopi",
  "Nonton",
  "Baca"
];

export default function HobbySkills() {
  return (
    <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto text-center">
      <div className="flex flex-col items-center mb-12">
        <span className="text-xs uppercase tracking-[0.5em] text-sky-blue/50 mb-4">Interests</span>
        <h3 className="text-4xl font-display font-bold">Hobbies & Skills</h3>
        <p className="mt-4 text-slate-500 font-light max-w-xl">
           Nonton hal yang bikin mikir, dan ngulik ide digital random.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {TAGS.map((tag, index) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-300 hover:text-white hover:border-blue-400 hover:bg-blue-500/20 transition-all duration-300 cursor-default"
          >
            {tag}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
