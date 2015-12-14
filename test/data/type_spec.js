describe('module coa.data, class Type', function() {

    var Data, TypeStr

    beforeEach(function() {
        module('coa.data');
        inject(function(_Data_, _TypeStr_){
            Data = _Data_;
            TypeStr = _TypeStr_;
        });
    });

    it('can provide default labels', function() {
        function Testing(data) {
            this.init(data);
        }
        Testing.prototype = new Data('Testing', 'unit-test', [
            {testing_name: {type: TypeStr}}
        ]);
        expect((new Testing()).getType('testing_name').label).toBe('Testing Name')
    });
});

describe('module coa.data, class TypeObj', function() {

    var Data, TypeObj, TypeStr;

    beforeEach(function() {
        module('coa.data');
        inject(function(_Data_, _TypeObj_, _TypeStr_){
            Data = _Data_;
            TypeObj = _TypeObj_;
            TypeStr = _TypeStr_;
        });
    });

    it('requires class option', function() {
        d.quiet();
        new Data('Testing', 'unit-testing', [
            {invalid: {type: TypeObj}},
        ]);
        expect(d.errors().length > 0).toBe(true);
    });

    it('initializes object members with default values', function() {
        function Container(data) {
            this.init(data);
        }
        Container.prototype = new Data('Container', 'unit-test', [
            {user: {type: TypeObj, options: {class: 'coa.auth.User'}}}
        ])
        var container = new Container();
        expect(container.user.name).toBe(null);

        Container.prototype = new Data('Container', 'unit-test', [
            {user: {type: TypeObj, default: {name: 'Test default'}, options: {class: 'coa.auth.User'}}}
        ])
        var container = new Container();
        expect(container.user.name).toBe('Test default');
    });
});
