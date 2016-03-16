describe('module coa.data, TypeAny class', function() {

    var Data, TypeAny;

    beforeEach(function() {
        module('coa.data');
        inject(function(_Data_, _TypeAny_){
            Data = _Data_;
            TypeAny = _TypeAny_;
        });
    });

    it('accepts almost any value', function() {

        var type = new TypeAny();

        expect(type.isInvalid(undefined)).toEqual(['Value has not correct type.']);
        expect(type.isInvalid(false)).toEqual(false);
        expect(type.isInvalid(true)).toEqual(false);
        expect(type.isInvalid(null)).toEqual(false);
        expect(type.isInvalid(1)).toEqual(false);
        expect(type.isInvalid([null])).toEqual(false);
        expect(type.isInvalid({})).toEqual(false);
        expect(type.isInvalid(new TypeAny())).toEqual(false);

        var type2 = new TypeAny({required: true});
        expect(type2.isInvalid(null)).toEqual(['This value is required.']);
    });
});
