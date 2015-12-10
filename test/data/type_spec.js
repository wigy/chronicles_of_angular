describe('Class Type', function() {

    function Team(data) {
        this.name = null;
        this.init(data);
    }

    var Class, Type, TypeStr

    beforeEach(function() {
        module('coa.data');
        inject(function(_Class_, _Type_, _TypeStr_){
            Class = _Class_;
            Type = _Type_;
            TypeStr = _TypeStr_;
            Team.prototype = new Type([
                {name: {type: TypeStr, label: "Name of the team", options: {}}}
            ]);
        });
    });

    it('has Class as its base-class', function() {
        expect((new Type()) instanceof Class).toBe(true);
    });

    it('can initialize string members', function() {
        expect((new Team({name: 'TRC'})).name).toBe('TRC');
        expect((new Team({name: true})).name).toBe('true');
        expect((new Team({name: 21122})).name).toBe('21122');
        d(new Team({name: undefined}))
    });
    // TODO: Add support for d() to collect and return all failures.
    // TODO: Test invalid initialization.
    // TODO: Test initialization without parameters.
    // TODO: Test null handling.
});
