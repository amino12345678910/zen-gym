"use client";

import { motion, Variants } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ArrowRight, Leaf, Waves, Wind, CheckCircle2, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/wide-gym.png" 
            alt="Intérieur Premium Zen Gym" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-zen-charcoal/40 backdrop-blur-[2px]" />
        </div>

        <Container className="relative z-10 flex flex-col items-center text-center text-zen-offwhite">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.span variants={fadeInUp} className="text-zen-offwhite/80 tracking-widest uppercase text-sm font-medium mb-6 block">
              Trouvez votre équilibre
            </motion.span>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 tracking-tight leading-[1.1]"
            >
              Un sanctuaire pour l'esprit, le corps et le mouvement.
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-zen-offwhite/90 max-w-2xl mb-12 font-light"
            >
              Vivez le fitness autrement. Zen Gym offre un environnement soigné où l'entraînement rigoureux rencontre la restauration consciente.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 items-center">
              <Link href="/membership">
                <Button size="lg" className="group w-full sm:w-auto">
                  Commencer l'essai
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/classes">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-zen-offwhite border-zen-offwhite hover:bg-zen-offwhite hover:text-zen-charcoal">
                  Explorer les cours
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* 2. Philosophy Section */}
      <Section className="bg-zen-offwhite">
        <Container>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <span className="text-zen-sage tracking-widest uppercase text-sm font-medium block">
                Notre Philosophie
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-zen-charcoal leading-tight">
                Enraciné dans l'intention.<br />Conçu pour la longévité.
              </h2>
              <p className="text-lg text-zen-charcoal/80 font-light leading-relaxed">
                Nous pensons que le mouvement doit être une pratique réparatrice, pas un épuisement. Nos espaces sont traités de manière acoustique, parfumés avec soin et conçus architecturalement pour invoquer le calme tout en exigeant le meilleur de vous-même.
              </p>
              <Link href="/about">
                <Button variant="outline">Découvrir notre approche</Button>
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-soft group">
              <Image 
                src="/images/interior.png" 
                alt="Intérieur de gymnastique minimaliste" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* 3. Classes Preview */}
      <Section className="bg-zen-sand">
        <Container>
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-serif mb-6 text-zen-charcoal">Disciplines soignées</h2>
              <p className="text-lg text-zen-charcoal/80 font-light">
                Du conditionnement haute intensité au travail restaurateur profond, chaque cours est un moment d'excellence.
              </p>
            </div>
            <Link href="/classes">
              <Button variant="ghost" className="shrink-0">Voir tous les cours <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
          >
            {[
              { title: "Force & Condition", desc: "Mécanique de précision avec des matériaux bruts.", icon: <Wind className="h-5 w-5 text-zen-sage mb-4" /> },
              { title: "Flux Dynamique", desc: "Séquences pour améliorer la mobilité et la respiration.", icon: <Waves className="h-5 w-5 text-zen-sage mb-4" /> },
              { title: "Restauration Profonde", desc: "Récupération tissulaire et recalibrage systémique guidé.", icon: <Leaf className="h-5 w-5 text-zen-sage mb-4" /> },
              { title: "Pilates Conscient", desc: "Stabilisation du cœur et alignement postural.", icon: <CheckCircle2 className="h-5 w-5 text-zen-sage mb-4" /> }
            ].map((cls, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="h-full group hover:-translate-y-2 transition-all duration-500 bg-zen-offwhite/80 backdrop-blur-sm border-transparent hover:border-zen-sage/30 hover:shadow-lg">
                  <CardHeader>
                    {cls.icon}
                    <CardTitle className="text-xl mb-2">{cls.title}</CardTitle>
                    <CardDescription className="text-sm text-zen-charcoal/70 leading-relaxed font-light">
                      {cls.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* 4. Why Zen Gym */}
      <Section className="bg-zen-offwhite">
        <Container>
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-6 text-zen-charcoal">La différence Zen</h2>
            <p className="text-lg text-zen-charcoal/80 font-light">
              Nous avons réimaginé la salle de sport moderne comme un lieu où vous voulez vraiment passer votre temps.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {[
              { title: "Sérénité acoustique", desc: "L'architecture insonorisée garantit que vous n'entendez que votre respiration et nos paysages sonores ambiants." },
              { title: "Conception biophilique", desc: "La lumière naturelle, les plantes vivantes et les matériaux organiques réduisent le cortisol et améliorent la concentration." },
              { title: "Capacité limitée", desc: "Nous limitons le nombre de membres pour garantir que vous n'ayez jamais à attendre pour l'équipement ou l'espace personnel." }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-zen-sand flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-6 w-6 text-zen-sage" />
                </div>
                <h3 className="font-serif text-2xl mb-4 text-zen-charcoal">{feature.title}</h3>
                <p className="text-zen-charcoal/70 font-light leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* 5. Testimonials */}
      <Section className="bg-zen-sand overflow-hidden">
        <Container>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="lg:col-span-1 flex flex-col justify-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif text-zen-charcoal">Histoires de<br/>transformation</h2>
              <p className="text-zen-charcoal/80 font-light">Ne nous croyez pas sur parole. Écoutez notre communauté.</p>
            </motion.div>
            
            {[
              { quote: "Zen Gym a complètement changé ma relation avec le fitness. On se sent comme dans une retraite, pas une corvée.", author: "Amina B.", role: "Membre depuis 2024" },
              { quote: "L'attention portée aux détails et la qualité de l'instruction sont inégalées ailleurs. Absolument brillant.", author: "Youssef T.", role: "Membre depuis 2023" }
            ].map((testimonial, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="h-full bg-zen-offwhite border-none shadow-sm p-8 flex flex-col justify-between">
                  <div>
                    <Quote className="h-8 w-8 text-zen-sage/40 mb-6" />
                    <p className="text-lg text-zen-charcoal leading-relaxed font-serif italic mb-8">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-zen-charcoal">{testimonial.author}</p>
                    <p className="text-sm text-zen-charcoal/60">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* 6. Closing CTA Band */}
      <motion.section 
        className="relative w-full py-32 md:py-48 flex items-center justify-center"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
      >
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/wide-wellness.png" 
            alt="Espace Yoga et Bien-être" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-zen-charcoal/60" />
        </div>

        <Container className="relative z-10 text-center flex flex-col items-center">
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-serif text-zen-offwhite mb-8">
            Prêt à trouver votre équilibre ?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-zen-offwhite/80 max-w-2xl mb-10 font-light">
            Rejoignez notre communauté aujourd'hui et transformez votre approche du bien-être et du mouvement.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/membership">
              <Button size="lg" className="bg-zen-sage text-zen-offwhite hover:bg-zen-sage/90">
                Commencer votre aventure
              </Button>
            </Link>
          </motion.div>
        </Container>
      </motion.section>

    </main>
  );
}
