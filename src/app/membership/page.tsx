"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check, ChevronDown } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const TIERS = [
  { name: "À la séance", price: "35 DT", period: "par cours", features: ["Accès à un cours", "Commodités des vestiaires", "Serviette offerte", "Accès aromathérapie"], highlighted: false },
  { name: "Mensuel", price: "150 DT", period: "par mois", features: ["Cours illimités", "Réservation prioritaire", "Pass invité (1/mois)", "Commodités des vestiaires", "Accès événements exclusifs"], highlighted: true },
  { name: "Annuel", price: "1 500 DT", period: "par an", features: ["Économisez 300 DT", "Cours illimités", "Réservation (14j)", "Pass invité (2/mois)", "Commodités des vestiaires", "Événements exclusifs"], highlighted: false },
];

const FAQS = [
  { q: "Dois-je signer un contrat à long terme ?", a: "Non, nos abonnements mensuels sont totalement flexibles et peuvent être annulés ou suspendus avec un préavis de 30 jours." },
  { q: "Qu'est-ce qui est inclus dans les vestiaires ?", a: "Nous fournissons des produits de soin haut de gamme Aesop, des serviettes moelleuses, des douches à effet pluie et des sèche-cheveux Dyson pour tous nos membres." },
  { q: "Puis-je amener un invité ?", a: "Les membres mensuels et annuels reçoivent des laissez-passer pour invités. Les visiteurs à la séance peuvent acheter un pass à l'accueil." },
  { q: "Avez-vous une politique d'annulation pour les cours ?", a: "Oui, nous demandons un préavis de 12 heures pour les annulations de cours afin de permettre à d'autres membres de participer." },
];

export default function MembershipPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <main className="pt-32 pb-20 bg-zen-sand min-h-screen">
      <Section className="py-12 md:py-16">
        <Container>
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-serif text-zen-charcoal mb-6">
              Investissez en vous-même
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-zen-charcoal/80 font-light">
              Choisissez l'engagement qui correspond à votre style de vie. Aucun frais caché, juste une concentration pure.
            </motion.p>
          </motion.div>

          {/* Pricing Tiers */}
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32 items-center"
          >
            {TIERS.map((tier, idx) => (
              <motion.div key={idx} variants={fadeInUp} className={tier.highlighted ? "md:-mt-8 md:-mb-8 z-10" : ""}>
                <Card className={`h-full flex flex-col p-8 transition-transform duration-500 hover:-translate-y-2 ${tier.highlighted ? "bg-zen-charcoal text-zen-offwhite shadow-xl ring-2 ring-zen-sage ring-offset-4 ring-offset-zen-sand" : "bg-zen-offwhite"}`}>
                  <div className="mb-8">
                    <h3 className="text-xl font-serif mb-2">{tier.name}</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-serif">{tier.price}</span>
                      <span className={`text-sm ${tier.highlighted ? "text-zen-offwhite/60" : "text-zen-charcoal/60"}`}>{tier.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-light">
                        <Check className={`w-5 h-5 shrink-0 ${tier.highlighted ? "text-zen-sage" : "text-zen-sage"}`} />
                        <span className={tier.highlighted ? "text-zen-offwhite/90" : "text-zen-charcoal/80"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${tier.highlighted ? "bg-zen-sage hover:bg-zen-sage/90 text-zen-offwhite" : ""}`} 
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    Sélectionner {tier.name}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-serif text-center text-zen-charcoal mb-10">Foire aux questions</motion.h2>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="bg-zen-offwhite rounded-2xl overflow-hidden shadow-sm">
                  <button 
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  >
                    <span className="font-serif text-lg text-zen-charcoal">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-zen-sage transition-transform duration-300 ${openFaqIndex === idx ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaqIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 text-zen-charcoal/70 font-light leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}
