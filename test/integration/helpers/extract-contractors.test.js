describe('extract-contractors (helper)', function() {
  it('extracts contractors from an array of contracts', async function() {
    const contracts = [
      { id: '0', contractorSupplier: 'Televisa SA de CV'},
      { id: '1', contractorSupplier: 'Televisa SA de CV', rfc: 'TLV' },
      { id: '2', contractorSupplier: 'Televisa, S.A de C.V', rfc: 'TLV' },
      { id: '4', contractorSupplier: '', rfc: 'AZT' },
      { id: '3', contractorSupplier: 'Azteca', rfc: 'AZT', rupcCode: 123 },
      { if: '4', contractorSupplier: 'ABC' },
    ];
    const contractors = await sails.helpers.extractContractors(contracts);
    console.log(contractors);
  });
});
