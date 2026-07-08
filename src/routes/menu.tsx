import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { products, formatINR, type Product } from "@/lib/products";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Chocorunch" },
      {
        name: "description",
        content: "Browse the Chocorunch menu and add your favourite crunch chocolate to your cart.",
      },
      { property: "og:title", content: "Menu — Chocorunch" },
      { property: "og:description", content: "Browse the Chocorunch menu and order online." },
    ],
  }),
  component: Menu,
});

function Menu() {
  const { add } = useCart();

  const handleAdd = (p: Product) => {
    add(p);
    toast.success(`${p.name} added to cart`);
  };

  const tileColors = ["var(--mint)", "var(--sky)", "var(--caramel)", "var(--peach)", "var(--pink)", "var(--mint)"];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-10 max-w-xl">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
            Our Menu
          </h1>
          <p className="mt-3 font-medium text-muted-foreground">
            Pick your crunch, add to cart and check out. Fresh, handcrafted and
            delivered to your door.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <article key={p.id} className="clay clay-pop group flex flex-col p-5">
              <div
                className="mb-4 flex aspect-[4/3] items-center justify-center rounded-3xl text-6xl shadow-inner"
                style={{ backgroundColor: tileColors[i % tileColors.length] }}
              >
                <span className="drop-shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  {p.emoji}
                </span>
              </div>
              <div className="mb-1 flex items-start justify-between gap-2">
                <h2 className="font-display text-xl font-bold text-foreground">{p.name}</h2>
                {p.tag && (
                  <Badge className="shrink-0 rounded-full bg-[var(--pink)] font-bold text-primary shadow-sm hover:bg-[var(--pink)]">
                    {p.tag}
                  </Badge>
                )}
              </div>
              <p className="flex-1 text-sm font-medium text-muted-foreground">{p.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-xl font-extrabold text-primary">{formatINR(p.price)}</span>
                <Button size="sm" className="btn-3d gap-1.5 rounded-full font-bold" onClick={() => handleAdd(p)}>
                  <Plus className="h-4 w-4" /> Add
                </Button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}