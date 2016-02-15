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
            Numbering.prototype = new Data('unit-testing.Numbering',
                [{first: {type: TypeInt, default: -1, options: {}}}]);
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
        expect(d.errors()).toEqual(['Invalid kind of value 3.5 for member of type [object Object] for object unit-testing.Numbering{"first":-1}']);
        d.quiet();
        new Numbering({first: '1'});
        expect(d.errors()).toEqual(['Invalid kind of value 1 for member of type [object Object] for object unit-testing.Numbering{"first":-1}']);
    });

    it('handles zero as default', function() {
        Numbering.prototype = new Data('unit-testing.Numbering',
            [{first: {type: TypeInt, default: 0, options: {}}}]);
        expect((new Numbering()).first).toBe(0);
    });
});
