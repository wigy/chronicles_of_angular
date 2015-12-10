describe('Class Data', function() {

    function Team(data) {
        this.name = null;
        this.init(data);
    }

    var Class, Data, TypeStr

    beforeEach(function() {
        module('coa.data');
        inject(function(_Class_, _Data_, _TypeStr_){
            Class = _Class_;
            Data = _Data_;
            TypeStr = _TypeStr_;
            Team.prototype = new Data([
                {name: {type: TypeStr, label: "Name of the team", options: {}}}
            ]);
        });
    });

    it('has Class as its base-class', function() {
        expect((new Data()) instanceof Class).toBe(true);
    });

    it('can initialize string members', function() {
        expect((new Team({name: 'TRC'})).name).toBe('TRC');
        expect((new Team({name: true})).name).toBe('true');
        expect((new Team({name: 21122})).name).toBe('21122');
    });
    // TODO: Add support for d() to collect and return all failures.
    // TODO: Test invalid initialization.
    // TODO: Test initialization without parameters.
    // TODO: Test null handling.
});
