// format.js: turns raw data into display text.
// No localStorage and no page logic here. Just conversion helpers.

// ₱ amounts: stored as centavos (integers), displayed as pesos.
const pesoFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export function formatPeso(centavos) {
  return pesoFormatter.format(centavos / 100);
}

// Converts what a user types (e.g. 150.50) into centavos (15050).
// Math.round avoids floating-point leftovers like 15049.999999.
export function pesosToCentavos(pesos) {
  return Math.round(Number(pesos) * 100);
}

// Turns "2026-10-04" into "Oct 4, 2026".
// We build the Date from parts (year, month, day) on purpose:
// new Date("2026-10-04") is read as UTC and can show the wrong day
// in some time zones.
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}