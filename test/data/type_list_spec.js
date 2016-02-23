describe('module coa.data, TypeList class', function() {

    var Data, TypeStr, TypeObj, TypeList, User;

    beforeEach(function() {
        module('coa.data');
        module('coa.auth');
        inject(function(_Data_, _TypeStr_, _TypeObj_, _TypeList_, _User_){
            Data = _Data_;
            TypeStr = _TypeStr_;
            TypeObj = _TypeObj_;
            TypeList = _TypeList_;
            User = _User_;
        });
    });

    it('requires type option', function() {
        /*
        d.quiet();
        new Data('unit-testing.Testing', [
            {invalid: {type: TypeObj}},
        ]);
        expect(d.errors()).toEqual(['Invalid options [object Object] for type TypeObj()']);
        */
    });

    it('initializes object members with default values', function() {
        /*
        function Container(data) {
            this.init(data);
        }
        Container.prototype = new Data('unit-testing.Container', [
            {user: {type: TypeObj, options: {class: 'coa.auth.User'}}}
        ]);
        var container = new Container();
        expect(container.user).toBe(null);

        Container.prototype = new Data('unit-testing.Container', [
            {user: {type: TypeObj, default: {name: 'Test default'}, options: {class: 'coa.auth.User'}}}
        ]);
        container = new Container();
        expect(container.user.name).toBe('Test default');
        */
    });


    it('has string presentation', function() {
        /*
        var type = new TypeObj('name', null, null, {class: 'unit-testing.Dummy'});
        expect(type.toString()).toBe('TypeObj(unit-testing.Dummy)');
        */
    });

    it('validates options correctly', function() {
        /*
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
        Dummy.prototype = new Data('unit-testing.Dummy', []);
        expect(type.isInvalid(new Dummy())).toEqual(['Value must belong to coa.auth.User class.']);
        */
    });
});
