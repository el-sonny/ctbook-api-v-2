module.exports = {
  friendlyName: 'Converts a worksheet datastructure (from xlsx) to an array of objects using a headerow dictionary',
  description: '',
  inputs: {
    worksheet: {
      type: 'ref',
      example: '',
      description: '',
      required: true
    },
    dictionary: {
      type: 'ref',
      example: '',
      description: '',
      required: true
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async function(inputs,exits) {
    sails.log.info('Serializing data..'.brightMagenta);
    const start = process.hrtime();
    const data = inputs.worksheet[0].data;
    const header = data.shift();
    const propertyKeys = header.map(title => inputs.dictionary[title]);
    const serialized = data.map(row => {
      let entries = [];
      for (let i = 0; i < row.length; i++) {
        let value = row[i] ? String(row[i]) : null;
        entries.push([propertyKeys[i], value]);
      }
      return Object.fromEntries(entries);
    });
    let end = process.hrtime(start);
    sails.log.info('  Records: '.bold + serialized.length);
    sails.log.info('  Time: '.bold + end[0] + 's ' + (end[1] / 1000000) + 'ms');
    return exits.success(serialized);
  }
};
