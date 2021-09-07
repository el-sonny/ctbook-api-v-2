module.exports = {


  friendlyName: 'Update many',


  description: '',

  inputs: {
    data: {
      type: 'ref',
      example: '',
      description: '',
      required: true
    },
    model: {
      type: 'ref',
      example: '',
      description: '',
      required: true,
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function(inputs,exits) {
    if (inputs.data.length) {
      var ObjectId = inputs.model.getDatastore().driver.mongodb.ObjectID;
      const message = 'Updating ' + inputs.model.tableName + ': ' + inputs.data.length;
      console.log(message.brightMagenta);
      const start = process.hrtime();
      const db = inputs.model.getDatastore().manager;
      const bulk = db.collection(inputs.model.tableName).initializeUnorderedBulkOp();
      inputs.data.forEach(record => bulk.find({ _id: ObjectId(record.existingItem.id) }).update({ $set: record.data }));
      const result = await bulk.execute();
      const end = process.hrtime(start);
      console.log('  Time: '.bold + end[0] + 's ' + (end[1] / 1000000) + 'ms');
      return exits.success(result);
    } else {
      return exits.success([]);
    }
  }
};
