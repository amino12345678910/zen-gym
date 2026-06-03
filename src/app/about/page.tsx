"use client";

import { motion, Variants } from "framer-motion";
import { Container, Section } from "@/components/layout";
import Image from "next/image";
import { Card } from "@/components/ui/Card";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const TRAINERS = [
  { name: "Salma Ben Ali", specialty: "Pilates Conscient & Tronc", bio: "Ancienne danseuse de ballet apportant précision et respiration à chaque mouvement.", img: "/images/studio.png" },
  { name: "Mehdi Trabelsi", specialty: "Force & Conditionnement", bio: "Spécialisé dans la longévité fonctionnelle et la puissance mécanique pure.", img: "/images/wide-gym.png" },
  { name: "Dr. Ines Mansour", specialty: "Récupération & Thermothérapie", bio: "Physiothérapeute axée sur le recalibrage systémique et la santé articulaire.", img: "/images/interior.png" },
];

export default function AboutPage() {
  return (
    <main className="pt-32 pb-20 bg-zen-offwhite min-h-screen">
      {/* Mission Section */}
      <Section className="py-12 md:py-20">
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif text-zen-charcoal leading-tight">
              Notre Mission
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-zen-charcoal/80 font-light leading-relaxed">
              Éliminer le bruit de l'industrie moderne du fitness et offrir un sanctuaire où l'entraînement physique rigoureux rencontre une profonde restauration mentale.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-base text-zen-charcoal/60 font-light leading-relaxed">
              Nous avons fondé Zen Gym sur la conviction qu'une salle de sport ne devrait pas ressembler à une usine. Cela doit être un lieu de concentration, d'esthétique et d'intention. Chaque élément de notre espace — de l'acoustique à l'aromathérapie — est conçu pour vous aider à trouver votre centre.
            </motion.p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-square rounded-2xl overflow-hidden shadow-soft"
          >
            <Image 
              src="/images/interior.png" 
              alt="Philosophie Zen Gym" 
              fill 
              className="object-cover"
            />
          </motion.div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="bg-zen-sand">
        <Container>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          >
            {[
              { title: "Intention", desc: "Nous bougeons avec un but. Pas de répétitions sans réflexion, seulement une mécanique concentrée." },
              { title: "Longévité", desc: "S'entraîner pour les décennies, pas seulement pour l'été. La durabilité est essentielle." },
              { title: "Sanctuaire", desc: "Un espace sans distraction, sans néons et sans bruit accablant." }
            ].map((val, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="space-y-4">
                <h3 className="text-2xl font-serif text-zen-charcoal">{val.title}</h3>
                <p className="text-zen-charcoal/70 font-light">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Trainers */}
      <Section>
        <Container>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-zen-charcoal mb-6">Rencontrez les Guides</h2>
            <p className="text-lg text-zen-charcoal/80 font-light">
              Nos instructeurs sont des maîtres de leurs disciplines respectives, dédiés à votre croissance.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {TRAINERS.map((trainer, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="overflow-hidden bg-zen-sand border-none shadow-none group">
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image 
                      src={trainer.img} 
                      alt={trainer.name} 
                      fill 
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-zen-charcoal mb-1">{trainer.name}</h3>
                    <p className="text-zen-sage text-sm uppercase tracking-wider font-medium mb-4">{trainer.specialty}</p>
                    <p className="text-zen-charcoal/70 font-light text-sm leading-relaxed">{trainer.bio}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}
