module.exports = {


  friendlyName: 'Diff items',


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
    },
    key: {
      type: 'string',
      example: '',
      description: '',
      required: true,
    },
    query: {
      type: 'ref',
      example: 'Array: []',
      description: 'A query to find possible DB concurrences, otherwise its all',
      required: false,
      defaultsTo: {}
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function(inputs, exits) {
    console.log(('Comparing ' + inputs.model.tableName + ' data ..').brightMagenta);
    const start = process.hrtime();
    const query = inputs.data.map(row => row[inputs.key]);
    const allItems = await inputs.model.find({[inputs.key] : query});
    const itemsIndex = {};
    for (let i = 0; i < allItems.length; i++) {
      itemsIndex[allItems[i][inputs.key]] = allItems[i];
    }
    let newItems = [];
    let updateItems = [];
    let sameItems = [];
    for (let i = 0; i < inputs.data.length; i++) {
      let existingItem = itemsIndex[inputs.data[i][inputs.key]];
      if (existingItem) {
        let changeData = sails.helpers.compareItems(existingItem, inputs.data[i]);
        if (changeData) {
          updateItems.push({
            data: changeData,
            existingItem : existingItem
          });
        } else {
          sameItems.push(existingItem);
        }
      } else {
        newItems.push(inputs.data[i]);
      };
    }
    console.log('  Existing Items: '.bold + allItems.length);
    console.log('  New Items: '.bold + newItems.length);
    console.log('  Updated Items: '.bold + updateItems.length);

    let end = process.hrtime(start);
    console.log('  Time: '.bold + end[0] + 's ' + (end[1] / 1000000) + 'ms');

    return exits.success({ newItems, updateItems, sameItems });
  }


};
