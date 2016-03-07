describe('module coa.data, TypeDict class', function() {

    var Data, TypeStr, TypeInt, TypeDict;
    var dict, Dict;

    beforeEach(function() {
        module('coa.data');
        inject(function(_Data_, _TypeStr_, _TypeInt_, _TypeDict_){
            Data = _Data_;
            TypeStr = _TypeStr_;
            TypeInt = _TypeInt_;
            TypeDict = _TypeDict_;
        });

        dict = new TypeDict({default: {}, type: new TypeStr()});

        Dict = function(data) {
            this.init(data);
        };
        Dict.prototype = new Data([
            {elements: dict},
        ]);
    });

    it('requires type option', function() {
        d.quiet();
        new Data([
            {invalid: new TypeDict({})},
        ]);
        expect(d.errors()).toEqual(['Invalid options {} for type TypeDict({})']);
    });

    it('initializes object members with default values', function() {

        var obj = new Dict({elements: {12: 'Twelve'}});
        expect(obj.elements['12']).toEqual('Twelve');
        var defaults = new Dict();
        expect(defaults.elements instanceof Object).toBe(true);
    });


    it('has string presentation', function() {
        expect(dict.toString()).toEqual('TypeDict({default: {}, label: "Elements", type: TypeStr({default: null, label: null, pattern: null, required: false})})');
    });

    it('converts to JSON', function() {
        var obj = new Dict({elements: {12: 'Twelve'}});
        expect(obj.toJSON()).toEqual({elements: {'12': 'Twelve'}});
    });

    it('validates options correctly', function() {

        expect(dict.isInvalid(null)).toEqual(false);
        expect(dict.isInvalid({})).toEqual(false);
        expect(dict.isInvalid({'a': 'Hi'})).toEqual(false);
        expect(dict.isInvalid({'a': 12})).toEqual(['Value has not correct type.']);
        expect(dict.isInvalid({'a': null})).toEqual(false);

        var dict2 = new TypeDict({default: {}, type: new TypeStr({required: true})});
        expect(dict2.isInvalid({'a': null})).toEqual(['Incorrect value in this collection.']);
    });
});
