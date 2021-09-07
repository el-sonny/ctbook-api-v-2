/**
 * Contract.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    contractor : {
      model : 'contractor'
    },
    contractCode : {
      unique : true,
      type : 'string'
    }

  },

};

