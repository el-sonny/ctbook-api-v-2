/**
 * ContractController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  count: async function(req, res) {
    const query = req.query.where ? JSON.parse(req.query.where) : undefined;
    const numRecords = await Contract.count(query);
    res.json(numRecords);
  }
};
