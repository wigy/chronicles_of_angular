describe('module coa.data, TypePair class', function() {

    var Data, TypeStr, TypeInt, TypePair, TypeTuple;

    beforeEach(function() {
        module('coa.data');
        inject(function(_Data_,  _TypeStr_,  _TypeInt_, _TypePair_, _TypeTuple_){
            Data = _Data_;
            TypeStr = _TypeStr_;
            TypeInt = _TypeInt_;
            TypePair = _TypePair_;
            TypeTuple = _TypeTuple_;
        });
    });

    it('has string presentation', function() {
        var type = new TypePair({types: [new TypeInt(), new TypeStr()]});
        expect(type.toString()).toBe('TypePair({required: false, types: [TypeInt({required: false}), TypeStr({required: false})]})');
    });

    it('refuses invalid number of types', function() {
        d.expect(function(){
            var type = new TypePair({types: [new TypeInt(), new TypeStr(), new TypeStr()]});
        }).toBe('Invalid options {types: [TypeInt({required: false}), TypeStr({required: false}), TypeStr({required: false})]} for type TypePair({})');
    });

    it('does not mess up prototype of TypeTuple', function() {
        expect(TypeTuple.prototype.optionDefinitions.types.type === TypePair.prototype.optionDefinitions.types.type).toBe(false);
    });
});
