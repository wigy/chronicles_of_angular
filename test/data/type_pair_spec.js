describe('module coa.data, TypePair class', function() {

    var Data, TypeStr, TypeInt, TypePair;

    beforeEach(function() {
        module('coa.data');
        inject(function(_Data_,  _TypeStr_,  _TypeInt_, _TypePair_){
            Data = _Data_;
            TypeStr = _TypeStr_;
            TypeInt = _TypeInt_;
            TypePair = _TypePair_;
        });
    });

    it('has string presentation', function() {
        var type = new TypePair({types: [new TypeInt(), new TypeStr()]});
        expect(type.toString()).toBe('TypePair({required: false, types: [TypeInt({required: false}), TypeStr({required: false})]})');
    });

    it('refuses invalid number of types', function() {
        d.quiet();
        var type = new TypePair({types: [new TypeInt(), new TypeStr(), new TypeStr()]});
        expect(d.errors()).toEqual(['Invalid options {types: [TypeInt({required: false}), TypeStr({required: false}), TypeStr({required: false})]} for type TypePair({})']);
    });
});
