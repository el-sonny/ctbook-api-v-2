/**
 * Contractor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    rupc: {
      type: 'string',
      allowNull: true
    },

  },
  normalizeName: (name) => {
    return name ? name.toUpperCase()
      .trim()
      .replace('/t', '')
      .replace(/\"/g, '')
      .replace(/(,? S\.?A\.? DE C\.?V\.?)/, ', S.A. DE C.V.')
      .replace(/,? S\.? DE R\.?L\.? DE C\.?V\.?/, ', S. DE R.L. DE C.V.') : '';
  }
};
