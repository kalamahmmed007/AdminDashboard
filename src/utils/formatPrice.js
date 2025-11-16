// src/utils/formatPrice.js

/**
 * Formats a number as a price string, e.g. 1234.5 → "$1,234.50"
 * @param {number} amount
 * @param {string} currencySymbol
 * @returns {string}
 */
export const formatPrice = (amount, currencySymbol = "$") => {
    if (typeof amount !== "number") amount = Number(amount) || 0;
    return currencySymbol + amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
