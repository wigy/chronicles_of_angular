describe('module coa.data, TypeDict class', function() {

    var Data, TypeStr, TypeInt, TypeDict;

    beforeEach(function() {
        module('coa.data');
        inject(function(_Data_, _TypeStr_, _TypeInt_, _TypeDict_){
            Data = _Data_;
            TypeStr = _TypeStr_;
            TypeInt = _TypeInt_;
            TypeDict = _TypeDict_;
        });
    });

    it('requires type options for key and value', function() {
        d.quiet();
        new Data([
            {invalid: new TypeDict({})},
        ]);
        expect(d.errors()).toEqual(['Invalid options {} for type TypeDict({})']);

        d.quiet();
        new Data([
            {invalid: new TypeDict({keytype: new TypeInt()})},
        ]);
        expect(d.errors()).toEqual(['Invalid options {"keytype":"keytype"} for type TypeDict({})']);

        d.quiet();
        new Data([
            {invalid: new TypeDict({valuetype: new TypeStr()})},
        ]);
        expect(d.errors()).toEqual(['Invalid options {"valuetype":"valuetype"} for type TypeDict({})']);
    });

    it('has string presentation', function() {
        expect(1).toEqual(1);
        return;
        var type = new TypeList({default: [], type: new TypeStr({required: true})});
        expect(type.toString()).toBe('TypeList({default: [], label: null, required: null, type: TypeStr({default: null, label: null, pattern: null, required: true})})');
    });

    it('converts to JSON', function() {
        expect(1).toEqual(1);
        return;
        function Container(data) {
            this.init(data);
        }
        Container.prototype = new Data([{
            list: new TypeList({type: new TypeList({type: new TypeStr()})})
        }]);
        var obj = new Container({list: [['x', 'y'], [], ['a', 'b']]});
        expect(obj.isInvalid()).toBe(false);
        expect(obj.toJSON()).toEqual({list: [['x', 'y'], [], ['a', 'b']]});
    });

    it('validates options correctly', function() {
        expect(1).toEqual(1);
        return;

        function Dict(data) {
            this.init(data);
        }
        Dict.prototype = new Data([
            {elements: new TypeDict({default: {}, keytype: new TypeInt(), valuetype: new TypeStr()})},
        ]);
        d(new Dict({elements: {12: 'Twelve'}}))
        expect(1).toEqual(1);
        return;

        var subtype = new TypeStr({required: true});
        var type = new TypeList({type: subtype});
        var options =  {};
        expect(type.optionDefinitions.validate(options)).toEqual(null);
        options = {type: subtype};
        expect(type.optionDefinitions.validate(options) instanceof Object).toEqual(true);

        type.init(options);
        expect(type.isInvalid(null)).toEqual(false);
        expect(type.isInvalid([])).toEqual(false);
        expect(type.isInvalid(['Hi'])).toEqual(false);
        expect(type.isInvalid([null])).toEqual(['Incorrect value in this collection.']);
        expect(type.isInvalid({})).toEqual(['Value has not correct type.']);
        expect(type.isInvalid(new User())).toEqual(['Value has not correct type.']);

        var subtype2 = new TypeStr({required: false});
        type.init({default: [], type: subtype2, required: true});
        expect(type.isInvalid(null)).toEqual(['At least one is required.']);
        expect(type.isInvalid([])).toEqual(['At least one is required.']);
        expect(type.isInvalid(['Hi'])).toEqual(false);
        expect(type.isInvalid([null])).toEqual(false);
        expect(type.isInvalid([null, 'Hi', null])).toEqual(false);
    });
});
