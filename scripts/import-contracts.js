module.exports = {
  friendlyName: 'Import contracts',
  args: ['year'],
  inputs: {
    year: {
      description: '',
      type: 'string',
      defaultsTo: '2021'
    }
  },
  description: '',
  fn: async function(inputs) {
    const colors = require('colors');
    const dictionary = require(sails.config.appPath + '/source_docs/contract-dictionary.json');
    console.log('Processing Contracts'.bold.yellow);
    const sources = ['update-example-0', 'update-example-1', 'update-example-3', 'test-sample-sub', 'test-sample', 'test-sample-2014'];
    const worksheet = await sails.helpers.loadXlsx('source_docs/' + sources[inputs.year] + '.xlsx');
    //const worksheet = await sails.helpers.loadXlsx('source_docs/contracts-'+inputs.year+'.xlsx');
    const contracts = await sails.helpers.serializeWorksheet(worksheet, dictionary);
    // Process and Save Contractor info
    const contractors = await sails.helpers.extractContractors(contracts);
   //console.log(contractors);
    const contractorDiff = await sails.helpers.diffItems(contractors, Contractor, 'name');
    /*const newContractors = await sails.helpers.insertMany(contractorDiff.newItems, Contractor);
    console.log(contractorDiff.updateItems);
    const updateContractorResult = await sails.helpers.updateMany(contractorDiff.updateItems, Contractor);
    const dbContractors = [...contractorDiff.updateItems.map(c => c.existingItem), ...contractorDiff.sameItems, ...newContractors];
    //Process and save contract info
    const contractDiff = await sails.helpers.diffItems(contracts, Contract, 'contractCode');
    const mappedContracts = await sails.helpers.mapContractsToContractors(contractDiff.newItems, dbContractors);
    const newContracts = await sails.helpers.insertMany(mappedContracts, Contract);
    const updateContractResult = await sails.helpers.updateMany(contractDiff.updateItems,Contract);*/

  }

};
