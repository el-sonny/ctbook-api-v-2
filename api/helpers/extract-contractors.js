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
    sails.log.info('Extracting contractors..'.brightMagenta);
    const start = process.hrtime();
    let contractors = {};
    let rfcContractors = {};
    let orphanedContractors = [];
    for (let i = 0; i < inputs.contracts.length; i++) {
      let contract = inputs.contracts[i];
      //sails.log.info(contract);
      let regex = /\\"/g;
      let record = {};
      if (contract.contractorSupplier) {
        let contractor = Contractor.normalizeName(contract.contractorSupplier);
        console.log(contractor);
        //If we dont have a contractor name we have to check in the rfc contractors to see if it showed up in another contract otherwise we give it it's rfc for a name and emmit a warning
        if (contractor === '') {
          contractor = rfcContractors[contract.rfc] ? rfcContractors[contract.rfc].name : contract.rfc;
          if (contractor == contract.rfc) sails.log.info('Warning: contractor name not found: '.red + contract.rfc.red);
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
      }else if(contract.rfc){
        orphanedContractors.push(contract.rfc);
      }
    }
    contractors = Object.values(contractors);
    contractors = contractors.sort((a, b) => a.name.localeCompare(b.name));
    let end = process.hrtime(start);
    sails.log.info('  Contractors: '.bold + contractors.length);
    sails.log.info('  Time: '.bold + end[0] + 's ' + (end[1] / 1000000) + 'ms');
    return exits.success(contractors);
  }

};
