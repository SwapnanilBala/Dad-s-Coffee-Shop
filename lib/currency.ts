/**
 * Money handling for an INR storefront.
 *
 * Every amount in this codebase is an integer number of paise — never a float.
 * ₹249 is stored as 24900. Floating point cannot represent decimal currency
 * exactly, and the errors compound once quantities, discounts and GST are
 * involved. Paise (not whole rupees) is the unit because both GST calculation
 * and Razorpay/UPI gateways work in the smallest denomination.
 *
 * Field and function names carry the unit — `basePricePaise`, not `basePrice` —
 * so a value in the wrong unit is a compile error rather than a pricing bug.
 */

/** Paise in one Indian Rupee (₹1 = 100 paise). */
export const PAISE_PER_RUPEE = 100;

/** Default Restaurant GST rate in India (5%). */
export const DEFAULT_GST_RATE_PERCENT = 5;

/** Threshold for free delivery in paise (₹500.00). */
export const FREE_DELIVERY_THRESHOLD_PAISE = 50000;

/** Standard delivery charge in paise (₹40.00). */
export const STANDARD_DELIVERY_PAISE = 4000;

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Format integer paise for display as whole rupees with Indian digit grouping:
 * 12345600 → "₹1,23,456".
 */
export function formatINR(paise: number): string {
  return inrFormatter.format(Math.round(paise / PAISE_PER_RUPEE));
}

/**
 * Format a price add-on: 4000 → "+₹40". Returns an empty string for zero, so
 * free options render as a bare label.
 */
export function formatAddOn(paise: number): string {
  return paise > 0 ? `+${formatINR(paise)}` : "";
}

/** Convert whole rupees to paise. For authoring price data readably: rupees(249) → 24900. */
export function rupees(amount: number): number {
  return Math.round(amount * PAISE_PER_RUPEE);
}

/** Convert paise to numeric rupee value: 24900 → 249. */
export function paiseToRupees(paise: number): number {
  return Math.round(paise / PAISE_PER_RUPEE);
}

/**
 * Calculate GST in paise for an amount in paise.
 * Uses integer math with standard rounding to the nearest whole paisa.
 */
export function calculateGSTPaise(
  subtotalPaise: number,
  gstRatePercent: number = DEFAULT_GST_RATE_PERCENT
): number {
  return Math.round((subtotalPaise * gstRatePercent) / 100);
}

/**
 * Calculate delivery fee based on cart subtotal.
 * Orders equal to or above the threshold qualify for free delivery.
 */
export function calculateDeliveryFeePaise(
  subtotalPaise: number,
  thresholdPaise: number = FREE_DELIVERY_THRESHOLD_PAISE,
  standardFeePaise: number = STANDARD_DELIVERY_PAISE
): number {
  if (subtotalPaise <= 0 || subtotalPaise >= thresholdPaise) {
    return 0;
  }
  return standardFeePaise;
}

export interface CartPricingBreakdown {
  subtotalPaise: number;
  gstPaise: number;
  deliveryPaise: number;
  discountPaise: number;
  grandTotalPaise: number;
}

/**
 * Calculate the complete financial breakdown for an order.
 * All inputs and outputs are integer paise.
 */
export function calculateCartBreakdownPaise({
  subtotalPaise,
  gstRatePercent = DEFAULT_GST_RATE_PERCENT,
  discountPaise = 0,
  deliveryFeePaise,
}: {
  subtotalPaise: number;
  gstRatePercent?: number;
  discountPaise?: number;
  deliveryFeePaise?: number;
}): CartPricingBreakdown {
  const taxableSubtotal = Math.max(0, subtotalPaise - discountPaise);
  const gstPaise = calculateGSTPaise(taxableSubtotal, gstRatePercent);
  const deliveryPaise =
    deliveryFeePaise !== undefined
      ? deliveryFeePaise
      : calculateDeliveryFeePaise(subtotalPaise);

  const grandTotalPaise = taxableSubtotal + gstPaise + deliveryPaise;

  return {
    subtotalPaise,
    gstPaise,
    deliveryPaise,
    discountPaise,
    grandTotalPaise,
  };
}

