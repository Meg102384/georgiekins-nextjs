import { BUNDLE_TIERS, PET_PRODUCTS, PRODUCT_TYPES } from './data';

export const FULL_KIT_PRODUCT_KEYS = ['sitter', 'new_pet_parent', 'journal'];

function envKeyForProduct(petKey, typeKey) {
  return `STRIPE_PRICE_${petKey}_${typeKey}`.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
}

export function getProductPrice(pet, type) {
  return type.key === 'kit' ? pet.kitPrice : type.price;
}

export const STRIPE_PRODUCTS = PET_PRODUCTS.flatMap((pet) =>
  PRODUCT_TYPES.map((type) => {
    const envKey = envKeyForProduct(pet.key, type.key);

    return {
      sku: `${pet.key}-${type.key}`,
      name: `${pet.species} ${type.label}`,
      envKey,
      price: getProductPrice(pet, type),
    };
  })
);

export const STRIPE_BUNDLES = Object.entries(BUNDLE_TIERS).map(([petCount, price]) => ({
  sku: `bundle-${petCount}`,
  name: `${petCount}-Pet Full Kit Bundle`,
  envKey: `STRIPE_PRICE_BUNDLE_${petCount}_PETS`,
  petCount: Number(petCount),
  price,
}));

export const STRIPE_CATALOG = [...STRIPE_PRODUCTS, ...STRIPE_BUNDLES];

export function getPetByKey(petKey) {
  return PET_PRODUCTS.find((pet) => pet.key === petKey);
}

export function getProductTypeByKey(typeKey) {
  return PRODUCT_TYPES.find((type) => type.key === typeKey);
}

export function parseCartSku(sku) {
  if (sku.startsWith('bundle-')) {
    const petKeys = sku.replace(/^bundle-/, '').split('-').filter(Boolean);

    return {
      sku,
      kind: 'bundle',
      petKeys,
      productKeys: ['kit'],
    };
  }

  const [petKey, ...typeParts] = sku.split('-');
  const typeKey = typeParts.join('-');

  return {
    sku,
    kind: 'product',
    petKeys: [petKey],
    productKeys: [typeKey],
  };
}

export function getFulfillmentCodesForSku(sku) {
  const parsed = parseCartSku(sku);
  const productKeys = parsed.productKeys.includes('kit') ? FULL_KIT_PRODUCT_KEYS : parsed.productKeys;

  return parsed.petKeys.flatMap((petKey) => productKeys.map((productKey) => `${petKey}-${productKey}`));
}

export function getStripeCatalogItem(sku) {
  if (sku.startsWith('bundle-')) {
    // Cart bundle SKUs encode the actual pet keys (e.g. "bundle-cat-dog"), not a
    // raw count — parseCartSku is the single source of truth for that shape, and
    // getFulfillmentCodesForSku already depends on it. Derive the count from the
    // same parse so pricing and fulfillment never disagree about what a bundle SKU means.
    const { petKeys } = parseCartSku(sku);
    return STRIPE_BUNDLES.find((item) => item.petCount === petKeys.length);
  }

  return STRIPE_PRODUCTS.find((item) => item.sku === sku);
}
