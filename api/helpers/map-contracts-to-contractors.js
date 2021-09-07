module.exports = {


  friendlyName: 'Map contracts to contractors',


  description: '',


  inputs: {
    contracts: {
      type: 'ref',
      example: '',
      description: '',
      required: true
    },
    contractors: {
      type: 'ref',
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


  fn: async function(inputs, exits) {
    console.log('Mapping contractors in contracts..'.brightMagenta);
    const start = process.hrtime();
    const contractorMap = Object.fromEntries(inputs.contractors.map(c => [c.name, c]));
    const contractorRFCMap = Object.fromEntries(inputs.contractors.filter(c => c.rfc).map(c => [c.rfc, c]));
    const mappedContracts = inputs.contracts.map(contract => {
      let name = Contractor.normalizeName(contract.contractorSupplier);
      let contractor = name !== '' ? contractorMap[name] : contractorRFCMap[contract.rfc];
      if (contractor) {
        let id = Contractor.getDatastore().driver.mongodb.ObjectID(contractor.id || contractor._id);
        contract.contractor = id;
        return contract;
      } else {
        return contract;
      }
    }).filter(c => Object.entries(c).length > 0);
    let end = process.hrtime(start);
    console.log('  Contracts: '.bold + mappedContracts.length);
    console.log('  Time: '.bold + end[0] + 's ' + (end[1] / 1000000) + 'ms');
    exits.success(mappedContracts);
  }


};
