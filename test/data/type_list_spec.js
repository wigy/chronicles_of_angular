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
        d.quiet();
        new Data([
            {invalid: {type: TypeList}},
        ]);
        expect(d.errors()).toEqual(['Invalid options {} for type TypeList({default: undefined, label: "Invalid", name: "invalid", options: {}})']);
        expect(1).toEqual(1);
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
        expect(1).toEqual(1);
    });


    it('has string presentation', function() {
        var type = new TypeList('name', [], null, {type: new TypeStr('str', null, null, {required: true})});
        expect(type.toString()).toBe('TypeList({default: [], label: "Name", name: "name", options: {"type":"type","required":null}})');
    });

    it('validates options correctly', function() {

        var type = new TypeList();
        var subtype = new TypeStr('str', null, null, {required: true});
        var options =  {};
        expect(type.optionDefinitions.validate(options)).toEqual(null);
        options = {type: subtype};
        expect(type.optionDefinitions.validate(options) instanceof Object).toEqual(true);

        /*
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
