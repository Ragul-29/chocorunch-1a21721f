import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import logo from "@/assets/chocorunch-logo.png";
import hero from "@/assets/chocorunch-hero.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Handcrafted in small batches
            </span>
            <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              The crunch you<br />crave, delivered.
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              Chocorunch is premium chocolate with an irresistible crunch. Explore
              the menu, build your box, and we'll bring it to your door.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="group rounded-full px-7 text-base">
                <Link to="/menu">
                  Explore Menu
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-accent/30 blur-2xl" />
            <img
              src={hero}
              alt="Stack of Chocorunch crunch chocolate pieces"
              width={1280}
              height={1280}
              className="mx-auto aspect-square w-full max-w-md rounded-[2rem] object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-y border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {[
            { icon: Truck, title: "Fast delivery", text: "Freshly packed and shipped to your doorstep." },
            { icon: ShieldCheck, title: "Secure checkout", text: "Pay online safely with a smooth checkout." },
            { icon: Sparkles, title: "Real ingredients", text: "Made with quality chocolate and crisp." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-foreground">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
          Ready to taste the crunch?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Browse our full menu and place your order in minutes.
        </p>
        <Button asChild size="lg" className="mt-6 rounded-full px-8 text-base">
          <Link to="/menu">
            See the Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 sm:px-6">
          <img src={logo} alt="Chocorunch" className="h-7 w-auto opacity-80" width={140} height={35} />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Chocorunch. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
