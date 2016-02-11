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

        Flagged.prototype = new Data('Flagged', 'unit-testing',
            [{flag: {type: TypeBool, options: {}}}]);
        expect((new Flagged({flag: false})).flag).toBe(false);
        expect((new Flagged({flag: true})).flag).toBe(true);
        expect((new Flagged()).flag).toBe(null);

        Flagged.prototype = new Data('Flagged', 'unit-testing',
            [{flag: {type: TypeBool, default: false, options: {}}}]);
        expect((new Flagged()).flag).toBe(false);

        Flagged.prototype = new Data('Flagged', 'unit-testing',
            [{flag: {type: TypeBool, default: true, options: {}}}]);
        expect((new Flagged()).flag).toBe(true);
    });

    it('validates options correctly', function() {

        var type = new TypeBool();

        var options =  {};
        expect(type.validateOptions(options)).toEqual({required: false});
        options = {required: false};
        expect(type.validateOptions(options)).toEqual({required: false});
        options = {required: true};
        expect(type.validateOptions(options)).toEqual({required: true});
        options = {required: 0};
        expect(type.validateOptions(options)).toBe(null);

        options = {required: true};
        type.init('name', null, 'Label', options);
        expect(type.isInvalid(false)).toEqual(false);
        expect(type.isInvalid(true)).toEqual(false);
        expect(type.isInvalid(null)).toEqual(['This value is required.']);

        options = {required: false};
        type.init('name', null, 'Label', options);
        expect(type.isInvalid(false)).toEqual(false);
        expect(type.isInvalid(true)).toEqual(false);
        expect(type.isInvalid(null)).toEqual(false);
    });
});
