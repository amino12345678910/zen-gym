"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Clock, Activity } from "lucide-react";
import Image from "next/image";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const CLASSES = [
  { id: 1, category: "Esprit", name: "Pilates Conscient", desc: "Stabilisation du tronc et alignement postural centrés sur la respiration.", duration: "50 min", intensity: "Faible", img: "/images/studio.png" },
  { id: 2, category: "Corps", name: "Force & Conditionnement", desc: "Mécanique de précision avec matériaux bruts. Haut rendement.", duration: "60 min", intensity: "Élevée", img: "/images/wide-gym.png" },
  { id: 3, category: "Corps", name: "Flux Dynamique", desc: "Séquences Vinyasa conçues pour améliorer la mobilité et l'endurance.", duration: "45 min", intensity: "Moyenne", img: "/images/studio.png" },
  { id: 4, category: "Récupération", name: "Restauration Profonde", desc: "Récupération des tissus profonds et recalibrage systémique guidé.", duration: "75 min", intensity: "Faible", img: "/images/interior.png" },
  { id: 5, category: "Esprit", name: "Méditation Guidée", desc: "Cultivez le calme et la présence grâce au son et à la respiration.", duration: "30 min", intensity: "Faible", img: "/images/wide-wellness.png" },
  { id: 6, category: "Récupération", name: "Labo de Mobilité", desc: "Récupération active axée sur la santé des articulations.", duration: "45 min", intensity: "Faible", img: "/images/interior.png" },
];

const CATEGORIES = ["Tous", "Esprit", "Corps", "Récupération"];

export default function ClassesPage() {
  const [activeTab, setActiveTab] = useState("Tous");

  const filteredClasses = CLASSES.filter(c => activeTab === "Tous" || c.category === activeTab);

  return (
    <main className="pt-32 pb-20 bg-zen-offwhite min-h-screen">
      <Section className="py-12 md:py-16">
        <Container>
          {/* Header */}
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-serif text-zen-charcoal mb-6">
              Disciplines Soignées
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-zen-charcoal/80 font-light">
              Découvrez nos cours conçus par des experts pour trouver l'équilibre parfait entre effort et récupération.
            </motion.p>
          </motion.div>

          {/* Tabs */}
          <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {CATEGORIES.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm transition-colors duration-300 ${
                  activeTab === tab 
                    ? "bg-zen-sage text-zen-offwhite" 
                    : "bg-zen-sand text-zen-charcoal hover:bg-zen-sage/20"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredClasses.map((cls) => (
                <motion.div
                  key={cls.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="h-full group overflow-hidden bg-white border-transparent hover:border-zen-sage/30 hover:shadow-lg transition-all duration-500 flex flex-col">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image 
                        src={cls.img} 
                        alt={cls.name} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-zen-charcoal uppercase tracking-wider">
                        {cls.category}
                      </div>
                    </div>
                    <CardHeader className="flex-1 flex flex-col">
                      <CardTitle className="text-2xl mb-2 group-hover:text-zen-sage transition-colors">{cls.name}</CardTitle>
                      <CardDescription className="text-base font-light mb-6 flex-1">
                        {cls.desc}
                      </CardDescription>
                      <div className="flex items-center gap-6 mt-auto pt-4 border-t border-zen-stone/20 text-sm text-zen-charcoal/70">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-zen-sage" />
                          <span>{cls.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-zen-sage" />
                          <span>{cls.intensity}</span>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}
