describe('module coa.data, TypeTriple class', function() {

    var Data, TypeStr, TypeInt, TypePair, TypeTuple;

    beforeEach(function() {
        module('coa.data');
        inject(function(_Data_,  _TypeStr_,  _TypeInt_, _TypeTriple_, _TypeTuple_){
            Data = _Data_;
            TypeStr = _TypeStr_;
            TypeInt = _TypeInt_;
            TypeTriple = _TypeTriple_;
            TypeTuple = _TypeTuple_;
        });
    });

    it('has string presentation', function() {
        var type = new TypeTriple({types: [new TypeInt(), new TypeStr(), new TypeStr()]});
        expect(type.toString()).toBe('TypeTriple({required: false, types: [TypeInt({required: false}), TypeStr({required: false}), TypeStr({required: false})]})');
    });

    it('refuses invalid number of types', function() {
        d.quiet();
        var type = new TypeTriple({types: [new TypeInt(), new TypeStr()]});
        expect(d.errors()).toEqual(['Invalid options {types: [TypeInt({required: false}), TypeStr({required: false})]} for type TypeTriple({})']);
    });

    it('does not mess up prototype of TypeTuple', function() {
        expect(TypeTuple.prototype.optionDefinitions.types.type === TypeTriple.prototype.optionDefinitions.types.type).toBe(false);
    });
});
