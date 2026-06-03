import { Container } from "@/components/layout";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-zen-charcoal text-zen-offwhite py-20">
      <Container className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        <div className="md:col-span-1">
          <Link href="/" className="font-serif text-3xl tracking-tight mb-6 block">
            Zen Gym.
          </Link>
          <p className="text-zen-offwhite/60 text-sm font-light leading-relaxed max-w-xs">
            Un sanctuaire pour l'esprit, le corps et le mouvement. Découvrez le fitness autrement.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-medium text-sm tracking-widest uppercase text-zen-sage mb-2">Explorer</h4>
          <Link href="#" className="text-sm text-zen-offwhite/70 hover:text-zen-offwhite transition-colors">Notre Philosophie</Link>
          <Link href="#" className="text-sm text-zen-offwhite/70 hover:text-zen-offwhite transition-colors">Cours & Disciplines</Link>
          <Link href="#" className="text-sm text-zen-offwhite/70 hover:text-zen-offwhite transition-colors">Abonnement</Link>
          <Link href="#" className="text-sm text-zen-offwhite/70 hover:text-zen-offwhite transition-colors">Instructeurs</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-medium text-sm tracking-widest uppercase text-zen-sage mb-2">Espace</h4>
          <p className="text-zen-offwhite/70 text-sm font-light leading-relaxed">
            123 Voie de la Tranquillité<br />
            Quartier Sérénité, Tunis
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-medium text-sm tracking-widest uppercase text-zen-sage mb-2">Horaires</h4>
          <p className="text-zen-offwhite/70 text-sm font-light leading-relaxed">
            Lun - Ven : 6h - 21h<br />
            Sam - Dim : 8h - 18h
          </p>
        </div>
      </Container>
      
      <Container className="mt-20 pt-8 border-t border-zen-stone/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zen-offwhite/40">
        <p>&copy; {new Date().getFullYear()} Zen Gym. Tous droits réservés.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-zen-offwhite transition-colors">Confidentialité</Link>
          <Link href="#" className="hover:text-zen-offwhite transition-colors">Conditions</Link>
        </div>
      </Container>
    </footer>
  );
}
