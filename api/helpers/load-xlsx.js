module.exports = {


  friendlyName: 'Load xlsx',


  description: '',


  inputs: {
   file: {
      type: 'string',
      example: '',
      description: '',
      required: true
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function(inputs,exits) {
    let xlsx = require('node-xlsx').default;
    console.log('Opening File..'.brightMagenta);
    const start = process.hrtime();
    const worksheet = xlsx.parse(inputs.file);
    console.log('  Records: '.bold + (worksheet[0].data.length-1));
    let end = process.hrtime(start);
    console.log('  Time: '.bold + end[0] + 's ' + (end[1] / 1000000) + 'ms');
    return exits.success(worksheet);
  }

};