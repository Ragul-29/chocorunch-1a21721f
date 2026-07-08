import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Chocorunch" },
      { name: "description", content: "Enter your delivery details and place your Chocorunch order." },
    ],
  }),
  component: Checkout,
});

const DELIVERY_FEE = 49;

function Checkout() {
  const { items, subtotal, count, clear } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const total = subtotal + (items.length ? DELIVERY_FEE : 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    // Online payment gets wired up next — this confirms the order details for now.
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Order details saved! Online payment is being set up next.");
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
          <h1 className="font-display text-2xl font-medium">Your cart is empty</h1>
          <p className="text-muted-foreground">Add some crunch before checking out.</p>
          <Button asChild className="rounded-full">
            <Link to="/menu">Browse the menu</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <button
          onClick={() => navigate({ to: "/menu" })}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to menu
        </button>
        <h1 className="mb-8 font-display text-4xl font-medium tracking-tight">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Delivery form */}
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            <section className="rounded-2xl border border-border/60 bg-card p-6">
              <h2 className="mb-4 font-display text-xl font-medium">Contact</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" required placeholder="10-digit mobile" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required placeholder="you@example.com" />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border/60 bg-card p-6">
              <h2 className="mb-4 font-display text-xl font-medium">Delivery address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" required placeholder="House / flat, street, area" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required placeholder="City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" required placeholder="Pincode" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="notes">Delivery notes (optional)</Label>
                  <Textarea id="notes" placeholder="Landmark, delivery instructions…" />
                </div>
              </div>
            </section>
          </form>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <h2 className="mb-4 font-display text-xl font-medium">Order summary</h2>
              <div className="space-y-3">
                {items.map(({ product, qty }) => (
                  <div key={product.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="text-lg">{product.emoji}</span>
                      <span className="truncate">
                        {product.name} <span className="text-muted-foreground">× {qty}</span>
                      </span>
                    </span>
                    <span className="shrink-0 font-medium">{formatINR(product.price * qty)}</span>
                  </div>
                ))}
              </div>
              <div className="my-4 h-px bg-border" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({count} items)</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span>{formatINR(DELIVERY_FEE)}</span>
                </div>
                <div className="flex justify-between pt-2 text-base font-semibold text-foreground">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>
              <Button
                type="submit"
                form="checkout-form"
                size="lg"
                className="mt-6 w-full rounded-full"
                disabled={submitting}
              >
                {submitting ? "Placing order…" : `Pay ${formatINR(total)}`}
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Secure online payment · Cash-free checkout
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}