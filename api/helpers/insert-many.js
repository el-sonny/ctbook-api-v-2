module.exports = {


  friendlyName: 'Save contracts',


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


  fn: async function(inputs, exits) {
    if (inputs.data.length) {
      const message = 'Saving ' + inputs.model.tableName + ': ' + inputs.data.length;
      console.log(message.brightMagenta);
      const start = process.hrtime();
      const db = inputs.model.getDatastore().manager;
      const collection = db.collection(inputs.model.tableName);
      const saved = await collection.insertMany(inputs.data);
      let end = process.hrtime(start);
      console.log('  Time: '.bold + end[0] + 's ' + (end[1] / 1000000) + 'ms');
      return exits.success(saved.ops);
    } else {
      return exits.success([]);
    }
  }


};
