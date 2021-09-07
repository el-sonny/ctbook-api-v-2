describe('load-xlsx (helper)', function() {

  describe('load-xlsx()', function() {
    it('loads xlxsx file', async function () {
      const worksheet = await sails.helpers.loadXlsx('source_docs/test-sample-2014.xlsx');
      worksheet.length.should.equal(1);
      worksheet[0].name.should.equal('2014');
      worksheet[0].data.length.should.equal(584);
    });
  
  });

});