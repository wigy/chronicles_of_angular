describe('module coa.data, TypeBool class', function() {

    function Flagged(data) {
        this.init(data);
    }

    var Data, TypeBool;

    beforeEach(function() {
        module('coa.data');
        inject(function(_Data_, _TypeBool_){
            Data = _Data_;
            TypeBool = _TypeBool_;
        });
    });

    it('can initialize boolean members', function() {

        Flagged.prototype = new Data(
            [{flag: new TypeBool({})}]);
        expect((new Flagged({flag: false})).flag).toBe(false);
        expect((new Flagged({flag: true})).flag).toBe(true);
        expect((new Flagged()).flag).toBe(null);

        Flagged.prototype = new Data(
            [{flag: new TypeBool({default: false})}]);
        expect((new Flagged()).flag).toBe(false);

        Flagged.prototype = new Data(
            [{flag: new TypeBool({default: true})}]);
        expect((new Flagged()).flag).toBe(true);
    });

    it('validates options correctly', function() {

        var type = new TypeBool();

        var options =  {};
        expect(type.optionDefinitions.validate(options)).toEqual({required: false, default: null, label: null});
        options = {required: false};
        expect(type.optionDefinitions.validate(options)).toEqual({required: false, default: null, label: null});
        options = {required: true};
        expect(type.optionDefinitions.validate(options)).toEqual({required: true, default: null, label: null});
        options = {required: 0};
        expect(type.optionDefinitions.validate(options)).toBe(null);

        options = {required: true};
        type.init(options);
        expect(type.isInvalid(false)).toEqual(false);
        expect(type.isInvalid(true)).toEqual(false);
        expect(type.isInvalid(null)).toEqual(['This value is required.']);

        options = {required: false};
        type.init(options);
        expect(type.isInvalid(false)).toEqual(false);
        expect(type.isInvalid(true)).toEqual(false);
        expect(type.isInvalid(null)).toEqual(false);
    });
});
