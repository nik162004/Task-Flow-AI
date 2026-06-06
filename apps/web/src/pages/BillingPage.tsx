import { Check, Download } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export function BillingPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-sm text-foreground/60">Stripe checkout, subscriptions, invoice history, and plan controls.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {["Free", "Pro", "Enterprise"].map((plan) => (
          <Card key={plan} className={plan === "Pro" ? "border-brand" : ""}>
            <h2 className="text-lg font-semibold">{plan}</h2>
            <div className="mt-4 text-3xl font-semibold">{plan === "Enterprise" ? "Custom" : plan === "Pro" ? "$29" : "$0"}</div>
            <div className="mt-4 space-y-2 text-sm text-foreground/60">
              <div className="flex gap-2"><Check size={16} className="text-brand" /> Unlimited projects</div>
              <div className="flex gap-2"><Check size={16} className="text-brand" /> AI summaries</div>
              <div className="flex gap-2"><Check size={16} className="text-brand" /> Audit logs</div>
            </div>
            <Button className="mt-6 w-full" variant={plan === "Pro" ? "primary" : "outline"}>Choose {plan}</Button>
          </Card>
        ))}
      </div>
      <Card>
        <h2 className="mb-3 font-semibold">Invoice history</h2>
        <div className="flex items-center justify-between rounded-md border border-border p-3 text-sm">
          <span>INV-001 · $29.00 · Paid</span>
          <Button variant="ghost" className="h-8"><Download size={15} /> PDF</Button>
        </div>
      </Card>
    </div>
  );
}
