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

    it('has string presentation', function() {
        var type = new TypeTuple({default: [1, 'A'], types: [new TypeInt(), new TypeStr()]});
        expect(type.toString()).toBe('TypeTuple({default: [1, "A"], required: false, types: [TypeInt({required: false}), TypeStr({required: false})]})');
    });

    it('validates options correctly', function() {

        var type = new TypeTuple({default: [1, 'A'], types: [new TypeInt({required: true}), new TypeStr()]});

        expect(type.isInvalid(null)).toEqual(false);
        expect(type.isInvalid({})).toEqual(['Value has not correct type.']);
        expect(type.isInvalid(true)).toEqual(['Value has not correct type.']);
        expect(type.isInvalid(1)).toEqual(['Value has not correct type.']);
        expect(type.isInvalid([])).toEqual(['Invalid tuple members.']);
        expect(type.isInvalid([1, 2])).toEqual(['Invalid tuple members.']);
        expect(type.isInvalid([1, "2"])).toEqual(false);
        expect(type.isInvalid([1, "2", "3"])).toEqual(['Invalid tuple members.']);
        expect(type.isInvalid([1])).toEqual(['Invalid tuple members.']);
        expect(type.isInvalid(["1", 2])).toEqual(['Invalid tuple members.']);
        expect(type.isInvalid([null, null])).toEqual(['Invalid tuple members.']);
    });
});
