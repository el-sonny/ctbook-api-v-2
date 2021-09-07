module.exports = {
  friendlyName: 'Extract contractors',
  description: 'Extracts contractor data from contract data',
  inputs: {
    contracts: {
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
    console.log('Extracting contractors..'.brightMagenta);
    const start = process.hrtime();
    let contractors = {};
    let rfcContractors = {};
    for (let i = 0; i < inputs.contracts.length; i++) {
      let contract = inputs.contracts[i];
      //console.log(contract);
      let regex = /\\"/g;
      let record = {};
      if (contract.contractorSupplier) {
        let contractor = contract.contractorSupplier
          .toUpperCase()
          .trim()
          .replace('/t', '')
          .replace(/\"/g, '')
          .replace(/(,? S\.?A\.? DE C\.?V\.?)/, ', S.A. DE C.V.')
          .replace(/,? S\.? DE R\.?L\.? DE C\.?V\.?/, ', S. DE R.L. DE C.V.');

        //If we dont have a contractor name we have to check in the rfc contractors to see if it showed up in another contract otherwise we give it it's rfc for a name and emmit a warning
        if (contractor === '') {
          contractor = rfcContractors[contract.rfc] ? rfcContractors[contract.rfc].name : contract.rfc;
          if (contractor = contract.rfc) console.log('Warning: contractor name not found: '.red + contract.rfc.red);
        }
        if (contractors[contractor]) {
          record = {
            rfc: contractors[contractor].rfc || contract.rfc,
            rupc: contractors[contractor].rupc || contract.rupcCode,
            name: contractor
          }
        } else {
          record = {
            rfc: contract.rfc,
            rupc: contract.rupcCode,
            name: contractor,
          }
        }
        if (!record.rfc) delete record.rfc;
        if (!record.rupc) delete record.rupc;
        contractors[contractor] = record;
        if (record.rfc && record.name !== record.rfc) rfcContractors[record.rfc] = record;
      }
    }
    contractors = Object.values(contractors);
    contractors = contractors.sort((a, b) => a.name.localeCompare(b.name));
    let end = process.hrtime(start);
    console.log('  Contractors: '.bold + contractors.length);
    console.log('  Time: '.bold + end[0] + 's ' + (end[1] / 1000000) + 'ms');
    return exits.success(contractors);
  }

};
