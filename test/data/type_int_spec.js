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
            Numbering.prototype = new Data('Numbering', 'unit-testing',
                [{first: {type: TypeInt, default: -1, options: {}}}]);
        });
    });

    it('can initialize integer members', function() {
        expect((new Numbering({first: 1})).first).toBe(1);
        expect((new Numbering()).first).toBe(-1);
        expect((new Numbering({first: '12'})).first).toBe(12);
        expect((new Numbering({first: null})).first).toBe(null);
    });
});
