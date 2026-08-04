import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag, Check, Smartphone, CreditCard, Wallet } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";
import { useReward } from "@/lib/reward";

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

// Owner order-desk details — edit these to change where orders land.
const BUSINESS_WHATSAPP = "918610270207"; // country code + number, no "+"
const BUSINESS_UPI = "8610270207@upi"; // UPI ID that receives GPay/UPI payments
const BUSINESS_NAME = "Chocorunch";

type PayMethod = "gpay" | "card" | "cod";

const PAY_METHODS: { id: PayMethod; label: string; hint: string; icon: typeof Smartphone; bg: string }[] = [
  { id: "gpay", label: "GPay / UPI", hint: "Pay instantly via any UPI app", icon: Smartphone, bg: "var(--mint)" },
  { id: "card", label: "Card", hint: "Debit / credit card", icon: CreditCard, bg: "var(--sky)" },
  { id: "cod", label: "Cash on delivery", hint: "Pay when it arrives", icon: Wallet, bg: "var(--caramel)" },
];

function Checkout() {
  const { items, subtotal, count, clear } = useCart();
  const { prize, voucher, discountFor, rewardLines, consumeForOrder } = useReward();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [method, setMethod] = useState<PayMethod>("gpay");

  const discount = discountFor(subtotal);
  const total = Math.max(0, subtotal - discount) + (items.length ? DELIVERY_FEE : 0);
  const freebies = prize && (prize.id === "dip" || prize.id === "oreo") ? prize.label : null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;
    const form = e.currentTarget;
    const get = (id: string) =>
      (form.elements.namedItem(id) as HTMLInputElement | HTMLTextAreaElement | null)?.value.trim() ?? "";

    const name = get("name");
    const phone = get("phone");
    const email = get("email");
    const address = get("address");
    const city = get("city");
    const pincode = get("pincode");
    const notes = get("notes");

    setSubmitting(true);

    const methodLabel = PAY_METHODS.find((m) => m.id === method)?.label ?? method;
    const lines = items.map(
      ({ product, qty }) =>
        `• ${product.name} × ${qty} — ${formatINR(product.price * qty)}` +
        (product.description ? `\n   ↳ ${product.description}` : ""),
    );

    const orderId = `CR${Date.now().toString().slice(-6)}`;
    const rewards = rewardLines(subtotal);
    const message =
      `🍫 *New ${BUSINESS_NAME} Order* (${orderId})\n\n` +
      `*Items:*\n${lines.join("\n")}\n\n` +
      `Subtotal: ${formatINR(subtotal)}\n` +
      (discount ? `Reward discount: -${formatINR(discount)}\n` : "") +
      `Delivery: ${formatINR(DELIVERY_FEE)}\n` +
      `*Total: ${formatINR(total)}*\n\n` +
      (rewards.length ? `*Rewards:*\n${rewards.join("\n")}\n\n` : "") +
      `*Payment:* ${methodLabel}\n\n` +
      `*Customer:*\n${name}\n${phone}\n${email}\n\n` +
      `*Deliver to:*\n${address}\n${city} - ${pincode}` +
      (notes ? `\n\nNotes: ${notes}` : "");

    const waUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;

    // For GPay / UPI, kick off the UPI payment intent first.
    if (method === "gpay") {
      const upiUrl =
        `upi://pay?pa=${encodeURIComponent(BUSINESS_UPI)}` +
        `&pn=${encodeURIComponent(BUSINESS_NAME)}` +
        `&am=${total}&cu=INR&tn=${encodeURIComponent(`${BUSINESS_NAME} order ${orderId}`)}`;
      window.location.href = upiUrl;
    }

    // Send the order straight to the business WhatsApp.
    setTimeout(() => {
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setSubmitting(false);
      toast.success("Order sent! Confirm it in WhatsApp to complete.");
      consumeForOrder();
      clear();
      navigate({ to: "/" });
    }, method === "gpay" ? 1200 : 400);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
          <h1 className="font-display text-2xl font-bold text-primary">Your cart is empty</h1>
          <p className="text-muted-foreground">Add some crunch before checking out.</p>
          <Button asChild className="btn-3d rounded-full font-bold">
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
        <h1 className="mb-8 font-display text-4xl font-extrabold tracking-tight text-primary">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Delivery form */}
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            <section className="clay p-6">
              <h2 className="mb-4 font-display text-xl font-bold">Contact</h2>
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

            <section className="clay p-6">
              <h2 className="mb-4 font-display text-xl font-bold">Delivery address</h2>
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

            <section className="clay p-6">
              <h2 className="mb-1 font-display text-xl font-bold">Payment method</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Choose how you&apos;d like to pay. Your order is sent straight to us on WhatsApp.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {PAY_METHODS.map(({ id, label, hint, icon: Icon, bg }) => {
                  const active = method === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setMethod(id)}
                      aria-pressed={active}
                      className={`clay tilt-3d relative flex flex-col items-start gap-2 p-4 text-left ${
                        active ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      {active && (
                        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-primary shadow-inner"
                        style={{ backgroundColor: bg }}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-display font-bold text-foreground">{label}</span>
                      <span className="text-xs text-muted-foreground">{hint}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          </form>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="clay p-6">
              <h2 className="mb-4 font-display text-xl font-bold">Order summary</h2>
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
                className="btn-3d mt-6 w-full rounded-full font-bold"
                disabled={submitting}
              >
                {submitting
                  ? "Sending order…"
                  : method === "gpay"
                    ? `Pay ${formatINR(total)} with GPay / UPI`
                    : method === "card"
                      ? `Pay ${formatINR(total)}`
                      : `Place order · ${formatINR(total)}`}
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Order confirmed instantly on WhatsApp
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}