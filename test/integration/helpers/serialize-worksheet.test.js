describe('serialize-worksheet (helper)', function() {
  it('serializes a worksheet from xlsx using dictionary', async function() {
    const worksheet = [{
      name : 'sheet1',
      data : [
        ['Nombre','Titulo'],
        ['name1','title1'],
        ['name2','title2'],
        ['name',null],
      ]
    }];
    const dictionary = {
      Nombre : 'name',
      Titulo : 'title'
    }
    const contracts = await sails.helpers.serializeWorksheet(worksheet, dictionary);
    const keys = Object.keys(contracts[0]);
    contracts.length.should.equal(3);
    keys[0].should.equal('name');
    keys[1].should.equal('title');
    should.not.exist(contracts[2][1]);
  });
});
