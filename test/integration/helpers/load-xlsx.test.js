describe('load-xlsx (helper)', function() {
  it('loads xlxsx file', async function() {
    const worksheet = await sails.helpers.loadXlsx('source_docs/update-example-0.xlsx');
    worksheet.length.should.equal(1);
    worksheet[0].name.should.equal('reporte1');
    worksheet[0].data.length.should.equal(4);
  });
});
