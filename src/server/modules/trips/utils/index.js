/**
 * Calculate cost with discounted price
 * @param {number} cost
 * @param {number} discount
 * @returns {number} - discounted cost
 */
// eslint-disable-next-line no-confusing-arrow
export const calculateCostWithDiscount = (cost, discount) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  discount ? cost - (cost * discount) / 100 : cost;

/**
 * Calculate cost with discounted price
 * @param {string|number} hours
 * @param {string|number} minutes
 * @returns {number} - time in minutes
 */
export const calculateTimeInMinutes = (hours, minutes) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Number(hours) * 60 + Number(minutes);

export default {
  calculateCostWithDiscount,
};
