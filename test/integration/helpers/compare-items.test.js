describe('compare-items (helper)', function() {

  describe('compareItems()', function() {
    it('returns false when both items are equal', function (done) {
      const diff = sails.helpers.compareItems({RFC:'111',name:'ABC SA de CV'},{RFC:'111',name:'ABC SA de CV'});
      diff.should.equal(false);
      return done();
    });
    
    it('returns false when new item has no new data', function (done) {
      let diff = sails.helpers.compareItems({RFC:'111',name:'ABC SA de CV'},{RFC:'111',name:null});
      diff.should.equal(false);
      diff = sails.helpers.compareItems({RFC:'111',name:'ABC SA de CV'},{RFC:'111'});
      diff.should.equal(false);
      return done();
    });

    it('returns new data if there is any', function (done) {
      let diff = sails.helpers.compareItems({RFC:'111',name:'ABC SA de CV'},{RFC:'111',name:'ABC SA de CV',rpc:'12'});
      diff.rpc.should.equal('12');
      return done();
    });

    it('returns updated data', function (done) {
      let diff = sails.helpers.compareItems({RFC:'111',name:'ABC SA de CV',rpc:'15'},{RFC:'111',name:'ABC SA de CV',rpc:'12'});
      diff.rpc.should.equal('12');
      return done();
    });

  });

});