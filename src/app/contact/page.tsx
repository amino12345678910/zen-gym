"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MapPin, Clock, Phone, Mail, Loader2, CheckCircle2 } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="pt-32 pb-20 bg-zen-sand min-h-screen">
      <Section className="py-12 md:py-16">
        <Container>
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-serif text-zen-charcoal mb-6">
              Connectez-vous avec nous
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-zen-charcoal/80 font-light">
              Que vous ayez une question sur nos disciplines, nos abonnements, ou que vous souhaitiez simplement nous dire bonjour, nous sommes là pour vous écouter.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            
            {/* Contact Form */}
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <Card className="p-8 md:p-10 bg-zen-offwhite">
                <h3 className="text-2xl font-serif mb-6 text-zen-charcoal">Envoyer un message</h3>
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-zen-sage" />
                    <p className="text-lg font-medium text-zen-charcoal">Message envoyé</p>
                    <p className="text-zen-charcoal/70 font-light">Merci de nous avoir contactés. Nous vous répondrons sous peu.</p>
                    <Button variant="outline" onClick={() => setStatus("idle")} className="mt-4">Envoyer un autre</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-zen-charcoal mb-2">Nom complet</label>
                      <input 
                        required 
                        type="text" 
                        id="name" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-zen-sand/50 border border-transparent focus:border-zen-sage/40 rounded-xl px-4 py-3 outline-none transition-colors" 
                        placeholder="Amina Trabelsi" 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-zen-charcoal mb-2">Adresse e-mail</label>
                      <input 
                        required 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-zen-sand/50 border border-transparent focus:border-zen-sage/40 rounded-xl px-4 py-3 outline-none transition-colors" 
                        placeholder="amina@exemple.com" 
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-zen-charcoal mb-2">Message</label>
                      <textarea 
                        required 
                        id="message" 
                        rows={5} 
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-zen-sand/50 border border-transparent focus:border-zen-sage/40 rounded-xl px-4 py-3 outline-none transition-colors resize-none" 
                        placeholder="Comment pouvons-nous vous aider ?" 
                      />
                    </div>
                    {status === "error" && (
                      <p className="text-red-500 text-sm">Échec de l'envoi du message. Veuillez réessayer.</p>
                    )}
                    <Button type="submit" className="w-full" disabled={status === "submitting"}>
                      {status === "submitting" ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      {status === "submitting" ? "Envoi..." : "Envoyer le message"}
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>

            {/* Info & Map */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-10">
              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-zen-offwhite rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-zen-sage" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1 text-zen-charcoal">Emplacement</h4>
                    <p className="text-zen-charcoal/70 font-light">123 Voie de la Tranquillité<br />Quartier Sérénité, Tunis</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-zen-offwhite rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-zen-sage" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1 text-zen-charcoal">Horaires</h4>
                    <p className="text-zen-charcoal/70 font-light">Lundi - Vendredi : 6h00 - 21h00<br />Samedi - Dimanche : 8h00 - 18h00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-zen-offwhite rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-zen-sage" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1 text-zen-charcoal">Contact</h4>
                    <p className="text-zen-charcoal/70 font-light">+216 71 123 456<br />bonjour@zengym.tn</p>
                  </div>
                </div>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div variants={fadeInUp} className="w-full h-64 bg-zen-stone/20 rounded-2xl overflow-hidden shadow-soft flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-30 mix-blend-multiply" />
                 <p className="font-serif text-zen-charcoal/50 z-10">Carte Interactive</p>
              </motion.div>
            </motion.div>

          </div>
        </Container>
      </Section>
    </main>
  );
}
