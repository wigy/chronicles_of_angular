describe('module coa.data, TypeStr class', function() {

    function Team(data) {
        this.init(data);
    }

    var Data, TypeStr;

    beforeEach(function() {
        module('coa.data');
        inject(function(_Data_, _TypeStr_){
            Data = _Data_;
            TypeStr = _TypeStr_;
            Team.prototype = new Data(
                [{name: {type: TypeStr, label: "Name of the team", default: 'default name', options: {}}}]);
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
        var team = new Team({name: undefined});
        expect(d.errors()).toEqual(['Invalid kind of value undefined for member of type TypeStr({default: "default name", label: "Name of the team", name: "name", options: {"required":false,"pattern":null}}) for object Data({name: "default name"})']);
        expect(team.name).toBe('default name');
    });

    it('has string presentation', function() {
        var type = new TypeStr();
        expect(type.toString()).toBe('TypeStr({default: null, label: null, name: null, options: null})');
    });

    it('validates options correctly', function() {

        var type = new TypeStr();

        var options =  {};
        expect(type.optionDefinitions.validate(options)).toEqual({required: false, pattern: null});
        options = {pattern: 12};
        expect(type.optionDefinitions.validate(options)).toEqual(null);
        options = {pattern: /xxx/};
        expect(type.optionDefinitions.validate(options)).toEqual({required: false, pattern: /xxx/});

        options = {pattern: /xxx/};
        type.init('name', null, 'Label', options);
        expect(type.isInvalid(null)).toEqual(false);
        expect(type.isInvalid('x')).toEqual(['Value does not have correct format.']);
        expect(type.isInvalid('axxxb')).toEqual(false);

        options = {pattern: /^xxx/};
        type.init('name', null, 'Label', options);
        expect(type.isInvalid(null)).toEqual(false);
        expect(type.isInvalid('axxxb')).toEqual(['Value does not have correct format.']);
    });
});
