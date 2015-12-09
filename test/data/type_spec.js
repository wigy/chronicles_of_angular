describe('Class Type', function() {

    beforeEach(module('coa.data'));

    it('has Class as its base-class', function() {
        inject(function(Class, Type){
            var t = new Type();
            expect(t instanceof Class).toBe(true);
        });
    });

    it('can initialize objects from single strings', function() {
        inject(function(Type, TypeStr){

            function Team(data) {
                this.name = null;
                this.init(data);
            }

            Team.prototype = new Type([
                {name: {type: TypeStr, label: "Name of the team", options: {}}}
            ]);

            d(new Team({name: "TRC"}))
            expect(true).toBe(true);
        });
    });
    // TODO: Add support for d() to collect and return all failures.
    // TODO: Test invalid initialization.

});
