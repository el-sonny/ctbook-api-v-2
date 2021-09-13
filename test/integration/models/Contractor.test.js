describe('Contractor (model)', function() {
  describe('normalizeName', function() {
    it('Removes whitespace at beggining and end and capitalizes all characters', function(done) {
      const name = Contractor.normalizeName(' Empresa 1 ');
      name.should.equal('EMPRESA 1');
      return done();
    });

    it('Standardizes SA de CV', function(done) {
      const name = Contractor.normalizeName(' Empresa 1 S.A de c.v ');
      name.should.equal('EMPRESA 1, S.A. DE C.V.');
      return done();
    });
    it('Standardizes S de RL de CV', function(done) {
      const name = Contractor.normalizeName(' Empresa 2 S. de RL de CV. ');
      name.should.equal('EMPRESA 2, S. DE R.L. DE C.V.');
      return done();
    });

    it('Returns empty string if no name is provided',function(done){
      const name = Contractor.normalizeName();
      name.should.equal('');
      return done();
    })
  });
});
