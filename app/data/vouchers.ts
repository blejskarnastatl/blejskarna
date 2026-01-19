export const vouchers = [
  { id: "FEST", src: "/poukazy/v1- fest.svg", alt: "Dárkový poukaz FEST", title: "FEST", price: 2000 },
  { id: "GRUNT", src: "/poukazy/v1- grunt.svg", alt: "Dárkový poukaz GRUNT", title: "GRUNT", price: 1500 },
  { id: "MRTE", src: "/poukazy/v1- mrte.svg", alt: "Dárkový poukaz DO MRTĚ", title: "DO MRTĚ", price: 3500 },
  { id: "PRANI", src: "/poukazy/v1 - prani.svg", alt: "Dárkový poukaz NA PŘÁNÍ", title: "NA PŘÁNÍ", price: 0 },
] as const;

export type Voucher = (typeof vouchers)[number];
export type VoucherId = Voucher["id"];

// užitečné v košíku:
export const voucherById = Object.fromEntries(
  vouchers.map((v) => [v.id, v]),
) as Record<VoucherId, Voucher>;

export const NAPRANI_VOUCHER_ID = "PRANI" as VoucherId;
export const NAPRANI_MIN = 200;
export const NAPRANI_MAX = 10000;
export const NAPRANI_STEP = 100;