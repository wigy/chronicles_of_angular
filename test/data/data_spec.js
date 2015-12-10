describe('Class Data', function() {

    function Team(data) {
        this.init(data);
    }

    var Data, TypeStr

    beforeEach(function() {
        module('coa.data');
        inject(function(_Data_, _TypeStr_){
            Data = _Data_;
            TypeStr = _TypeStr_;
            Team.prototype = new Data([
                {name: {type: TypeStr, label: "Name of the team", default: 'default name', options: {}}}
            ]);
        });
    });

    it('can initialize string members', function() {
        expect((new Team({name: 'TRC'})).name).toBe('TRC');
        expect((new Team({name: true})).name).toBe('true');
        expect((new Team({name: 21122})).name).toBe('21122');
        expect((new Team({name: null})).name).toBe(null);
    });

    it('fills in default values for members', function() {
        expect((new Team()).name).toBe('default name');
    });

    it('refuses to initialize undefined values', function() {
        d.quiet();
        var team = new Team({name: undefined})
        expect(d.errors().length > 0).toBe(true);
        expect(team.name).toBe('default name');
    });
    // TODO: Test invalid initialization.
    // TODO: Prevent defining the same member twice.
});
