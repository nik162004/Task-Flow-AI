import { describe, expect, it } from "vitest";
import { ProviderService } from "../services/providerService.js";

describe("ProviderService", () => {
  it("returns a Stripe checkout descriptor", () => {
    const checkout = new ProviderService().createStripeCheckout("org_1", "Pro");
    expect(checkout.checkoutUrl).toContain("org_1");
    expect(checkout.mode).toBe("subscription");
  });

  it("returns Cloudinary upload metadata and notifications", () => {
    const service = new ProviderService();
    expect(service.uploadSignature("organizations/org_1").provider).toBe("cloudinary");
    expect(service.notifications()).toHaveLength(2);
  });
});
