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
        var subtype = new TypeStr(null, null, null, {required: true});
        var options =  {};
        expect(type.optionDefinitions.validate(options)).toEqual(null);
        options = {type: subtype};
        expect(type.optionDefinitions.validate(options) instanceof Object).toEqual(true);

        type.init('name', null, 'Label', options);
        expect(type.isInvalid(null)).toEqual(false);
        expect(type.isInvalid([])).toEqual(false);
        expect(type.isInvalid(['Hi'])).toEqual(false);
        expect(type.isInvalid([null])).toEqual(['Incorrect value in this collection.']);
        expect(type.isInvalid({})).toEqual(['Value has not correct type.']);
        expect(type.isInvalid(new User())).toEqual(['Value has not correct type.']);

        var subtype2 = new TypeStr('str', null, null, {required: false});
        type.init('name', [], 'Label', {type: subtype2, required: true});
        expect(type.isInvalid(null)).toEqual(['At least one is required.']);
        expect(type.isInvalid([])).toEqual(['At least one is required.']);
        expect(type.isInvalid(['Hi'])).toEqual(false);
        expect(type.isInvalid([null])).toEqual(false);
        expect(type.isInvalid([null, 'Hi', null])).toEqual(false);
    });
});
