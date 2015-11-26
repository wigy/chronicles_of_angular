describe('Class Type', function() {

    beforeEach(module('coa.data'));

    it('has Class as its base-class', function() {
        inject(function(Class, Type){
            var t = new Type();
            expect(t instanceof Class).toBe(true);
        });
    });

});
