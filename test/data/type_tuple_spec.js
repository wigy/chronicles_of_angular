describe('module coa.data, TypeTuple class', function() {

    function Tuples(data) {
        this.init(data);
    }

    var Data, TypeStr, TypeInt, TypeTuple;

    beforeEach(function() {
        module('coa.data');
        inject(function(_Data_, _TypeStr_, _TypeInt_, _TypeTuple_){
            Data = _Data_;
            TypeStr = _TypeStr_;
            TypeInt = _TypeInt_;
            TypeTuple = _TypeTuple_;
            Tuples.prototype = new Data([{
                pair: new TypeTuple({default: ['A', 'B'], types: [new TypeStr(), new TypeStr()]})
            }]);
        });
    });

    it('can initialize string tuples', function() {
        expect((new Tuples({pair: ["x", "y"]})).pair).toEqual(["x", "y"]);
    });

    it('fills in default values for members', function() {
        expect((new Tuples()).pair).toEqual(["A", "B"]);
    });

    it('refuses to initialize undefined values', function() {
        d.quiet();
        var team = new Tuples({pair: undefined});
        expect(d.errors()).toEqual(['Invalid value undefined for member of type TypeTuple({default: ["A", "B"], label: "Pair", required: false, types: [TypeStr({required: false}), TypeStr({required: false})]}) for object Data({pair: ["A", "B"]})']);
    });

    xit('has string presentation', function() {
        var type = new TypeStr();
        expect(type.toString()).toBe('TypeStr({required: false})');
    });

    xit('validates options correctly', function() {

        var type = new TypeStr();

        var options =  {};
        expect(type.optionDefinitions.validate(options)).toEqual({ required: false, default: null, label: null, pattern: null });
        options = {pattern: 12};
        expect(type.optionDefinitions.validate(options)).toEqual(null);
        options = {pattern: /xxx/};
        expect(type.optionDefinitions.validate(options)).toEqual({ pattern: /xxx/, required: false, default: null, label: null });

        options = {};
        type.init(options);
        expect(type.isInvalid(null)).toEqual(false);
        expect(type.isInvalid({})).toEqual(['Value has not correct type.']);
        expect(type.isInvalid(true)).toEqual(['Value has not correct type.']);
        expect(type.isInvalid(1)).toEqual(['Value has not correct type.']);

        options = {pattern: /xxx/};
        type.init(options);
        expect(type.isInvalid(null)).toEqual(false);
        expect(type.isInvalid('x')).toEqual(['Value does not have correct format.']);
        expect(type.isInvalid('axxxb')).toEqual(false);

        options = {pattern: /^xxx/};
        type.init(options);
        expect(type.isInvalid(null)).toEqual(false);
        expect(type.isInvalid('axxxb')).toEqual(['Value does not have correct format.']);
    });
});
