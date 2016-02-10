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
});
