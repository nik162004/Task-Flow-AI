export class ProviderService {
  createStripeCheckout(organizationId: string, plan: string) {
    return {
      mode: "subscription",
      provider: "stripe",
      checkoutUrl: `https://checkout.stripe.com/mock/${organizationId}?plan=${encodeURIComponent(plan)}`
    };
  }

  uploadSignature(folder: string) {
    return { folder, timestamp: Math.floor(Date.now() / 1000), provider: "cloudinary" };
  }

  notifications() {
    return [
      { id: "n_1", title: "Task assigned", body: "You have two high-priority tasks due this week.", readAt: null },
      { id: "n_2", title: "Invoice ready", body: "Your latest Pro invoice is available.", readAt: new Date().toISOString() }
    ];
  }
}
