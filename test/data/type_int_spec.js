describe('module coa.data, TypeInt class', function() {

    function Numbering(data) {
        this.init(data);
    }

    var Data, TypeInt;

    beforeEach(function() {
        module('coa.data');
        inject(function(_Data_, _TypeInt_){
            Data = _Data_;
            TypeInt = _TypeInt_;
            Numbering.prototype = new Data(
                [{first: {type: TypeInt, options: {default: -1}}}]);
        });
    });

    it('can initialize integer members', function() {
        expect((new Numbering({first: 1})).first).toBe(1);
        expect((new Numbering()).first).toBe(-1);
        expect((new Numbering({first: 12})).first).toBe(12);
        expect((new Numbering({first: null})).first).toBe(null);
    });

    it('refuses invalid initial values', function() {
        d.quiet();
        new Numbering({first: 3.5});
        expect(d.errors()).toEqual(['Invalid kind of value 3.5 for member of type TypeInt({default: -1, label: "First", required: false}) for object Data({first: -1})']);
        d.quiet();
        new Numbering({first: '1'});
        expect(d.errors()).toEqual(['Invalid kind of value 1 for member of type TypeInt({default: -1, label: "First", required: false}) for object Data({first: -1})']);
    });

    it('handles zero as default', function() {
        Numbering.prototype = new Data(
            [{first: {type: TypeInt, options: {default: 0}}}]);
        expect((new Numbering()).first).toBe(0);
    });
});
