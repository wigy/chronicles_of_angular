describe('module coa.data, TypeObj class', function() {

    var Data, TypeObj, TypeStr, User;

    beforeEach(function() {
        module('coa.data');
        module('coa.auth');
        inject(function(_Data_, _TypeObj_, _TypeStr_, _User_){
            Data = _Data_;
            TypeObj = _TypeObj_;
            TypeStr = _TypeStr_;
            User = _User_;
        });
    });

    it('requires class option', function() {
        d.quiet();
        new Data([
            {invalid: {type: TypeObj}},
        ]);
        expect(d.errors()).toEqual(['Invalid options [object Object] for type TypeObj({default: undefined, label: "Invalid", name: "invalid", options: {}})']);
    });

    it('initializes object members with default values', function() {
        function Container(data) {
            this.init(data);
        }
        Container.prototype = new Data([
            {user: {type: TypeObj, options: {class: 'coa.auth.User'}}}
        ]);
        var container = new Container();
        expect(container.user).toBe(null);

        Container.prototype = new Data([
            {user: {type: TypeObj, default: {name: 'Test default'}, options: {class: 'coa.auth.User'}}}
        ]);
        container = new Container();
        expect(container.user.name).toBe('Test default');
    });

    it('does not share default object', function() {
        function Container(data) {
            this.init(data);
        }
        Container.prototype = new Data([
            {user: {type: TypeObj, default: {name: 'Test default'}, options: {class: 'coa.auth.User'}}}
        ]);
        var container1 = new Container();
        var container2 = new Container();

        expect(container1.user !== container2.user).toBe(true);
    });

    it('has string presentation', function() {
        var type = new TypeObj('name', null, null, {class: 'unit-testing.Dummy'});
        expect(type.toString()).toBe('TypeObj({default: null, label: "Name", name: "name", options: {"class":"unit-testing.Dummy","required":false}})');
    });

    it('validates options correctly', function() {

        var type = new TypeObj();
        var options =  {};
        expect(type.optionDefinitions.validate(options)).toEqual(null);
        options = {class: 'coa.auth.User'};
        expect(type.optionDefinitions.validate(options)).toEqual({class: 'coa.auth.User', required: false});

        type.init('name', null, 'Label', options);
        expect(type.isInvalid(null)).toEqual(false);
        expect(type.isInvalid({})).toEqual(['Value must belong to coa.auth.User class.']);
        expect(type.isInvalid(new User())).toEqual(false);

        function Dummy(data) {
            this.init(data);
        }
        Dummy.prototype = new Data([]);
        expect(type.isInvalid(new Dummy())).toEqual(['Value must belong to coa.auth.User class.']);
    });
});
