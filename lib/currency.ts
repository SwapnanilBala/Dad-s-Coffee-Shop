/**
 * Money handling for an INR storefront.
 *
 * Every amount in this codebase is an integer number of paise — never a float.
 * ₹249 is stored as 24900. Floating point cannot represent decimal currency
 * exactly, and the errors compound once quantities, discounts and GST are
 * involved. Paise (not whole rupees) is the unit because both GST calculation
 * and Razorpay work in the smallest denomination.
 *
 * Field and function names carry the unit — `basePricePaise`, not `basePrice` —
 * so a value in the wrong unit is a compile error rather than a pricing bug.
 */

/** Paise in one rupee. */
export const PAISE_PER_RUPEE = 100;

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Format integer paise for display as whole rupees with Indian digit grouping:
 * 12345600 → "₹1,23,456".
 *
 * Menu prices are whole rupees, so this is exact today. Once GST lands it can
 * produce fractional paise; invoice-level rounding is a deliberate decision to
 * make then, not something to leave to this display helper.
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

/** Convert whole rupees to paise. For authoring price data readably. */
export function rupees(amount: number): number {
  return Math.round(amount * PAISE_PER_RUPEE);
}
