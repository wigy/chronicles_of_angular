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
        expect(d.errors()).toEqual(['Invalid options {"label":"Invalid"} for type TypeList({})']);
        expect(1).toEqual(1);
    });

    it('initializes object members with default values', function() {

        var subtype = new TypeObj({class: 'coa.auth.User'});

        function Container(data) {
            this.init(data);
        }
        Container.prototype = new Data([
            {userlist: {type: TypeList, options: {type: subtype}}}
        ]);
        var container = new Container({userlist: [{}, {name: "testinguser"}, null]});

        expect(container.userlist[0] instanceof User).toBe(true);
        expect(container.userlist[1].name).toBe("testinguser");
        expect(container.userlist[2]).toBe(null);
    });

    it('has string presentation', function() {
        var type = new TypeList({default: [], type: new TypeStr({required: true})});
        expect(type.toString()).toBe('TypeList({default: [], label: "", required: null, type: TypeStr({default: null, label: "", pattern: null, required: true})})');
    });

    it('converts to JSON', function() {
        function Container(data) {
            this.init(data);
        }
        Container.prototype = new Data([{
            list: {type: TypeList, options: {type: new TypeList({type: new TypeStr()})}}
        }]);
        var obj = new Container({list: [['x', 'y'], [], ['a', 'b']]});
        expect(obj.isInvalid()).toBe(false);
        expect(obj.toJSON()).toEqual({list: [['x', 'y'], [], ['a', 'b']]});
    });

    it('validates options correctly', function() {

        var subtype = new TypeStr({required: true});
        var type = new TypeList({type: subtype});
        var options =  {};
        expect(type.optionDefinitions.validate(options)).toEqual(null);
        options = {type: subtype};
        expect(type.optionDefinitions.validate(options) instanceof Object).toEqual(true);

        type.init(options);
        expect(type.isInvalid(null)).toEqual(false);
        expect(type.isInvalid([])).toEqual(false);
        expect(type.isInvalid(['Hi'])).toEqual(false);
        expect(type.isInvalid([null])).toEqual(['Incorrect value in this collection.']);
        expect(type.isInvalid({})).toEqual(['Value has not correct type.']);
        expect(type.isInvalid(new User())).toEqual(['Value has not correct type.']);

        var subtype2 = new TypeStr({required: false});
        type.init({default: [], type: subtype2, required: true});
        expect(type.isInvalid(null)).toEqual(['At least one is required.']);
        expect(type.isInvalid([])).toEqual(['At least one is required.']);
        expect(type.isInvalid(['Hi'])).toEqual(false);
        expect(type.isInvalid([null])).toEqual(false);
        expect(type.isInvalid([null, 'Hi', null])).toEqual(false);
    });
});
