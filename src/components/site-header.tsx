import { Link } from "@tanstack/react-router";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/products";
import logoAsset from "@/assets/chocorunch-logo.asset.json";

export function SiteHeader() {
  const { items, count, subtotal, setQty, remove } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logoAsset.url}
            alt="Chocorunch"
            className="h-11 w-11 rounded-full object-cover shadow-md ring-2 ring-white/70"
            width={44}
            height={44}
          />
          <span className="font-display text-2xl font-extrabold tracking-tight text-primary">
            Chocorunch
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium sm:flex">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} className="text-muted-foreground transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/menu" activeProps={{ className: "text-primary" }} className="text-muted-foreground transition-colors hover:text-primary">
            Menu
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" className="btn-3d relative gap-2 rounded-full font-bold">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--pink)] px-1 text-[11px] font-bold text-primary shadow">
                  {count}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="flex w-full flex-col sm:max-w-md">
            <SheetHeader>
              <SheetTitle className="font-display text-2xl">Your cart</SheetTitle>
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">Your cart is empty.</p>
                <SheetClose asChild>
                  <Button asChild variant="secondary" className="rounded-full">
                    <Link to="/menu">Browse the menu</Link>
                  </Button>
                </SheetClose>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto py-2 pr-1">
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-2xl">
                        {product.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{formatINR(product.price)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setQty(product.id, qty - 1)}>
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <span className="w-5 text-center text-sm font-medium">{qty}</span>
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setQty(product.id, qty + 1)}>
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => remove(product.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <SheetFooter className="mt-auto gap-3 border-t border-border/60 pt-4 sm:flex-col sm:space-x-0">
                  <div className="flex items-center justify-between text-base font-semibold">
                    <span>Subtotal</span>
                    <span>{formatINR(subtotal)}</span>
                  </div>
                  <SheetClose asChild>
                    <Button asChild size="lg" className="btn-3d w-full rounded-full font-bold">
                      <Link to="/checkout">Checkout</Link>
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}