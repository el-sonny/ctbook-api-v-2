module.exports = {


  friendlyName: 'Compare Items',


  description: 'compares two objects and returns the differing properties if any if not then returns false',

  sync: true,

  inputs: {
    existingItem: {
      type: 'ref',
      example: '',
      description: '',
      required: true
    },
    newItem: {
      type: 'ref',
      example: '',
      description: '',
      required: true,
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: function(inputs, exits) {
    const existingItem = inputs.existingItem;
    const newItem = inputs.newItem;

    const keys = Object.keys(existingItem);
    const newKeys = Object.keys(newItem);
    const newData = newKeys.filter(key => (!existingItem[key] || existingItem[key] === null) && newItem[key]);
    const changedData = keys.filter(key => existingItem[key] !== null && newItem[key] && newItem[key] !== existingItem[key]);
    const updateKeys = [...newData, ...changedData];

    properties = {};
    for (let i = 0; i < updateKeys.length; i++) {
      properties[updateKeys[i]] = newItem[updateKeys[i]];
    }

    const result = Object.entries(properties).length ? properties : false;

    return exits.success(result);
  }


};

