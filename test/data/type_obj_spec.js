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
        d.expect(function(){
            new Data([
                {invalid: new TypeObj({})},
            ]);
        }).toBe('Invalid options {} for type TypeObj({})');
    });

    it('initializes object members with default values', function() {
        function Container(data) {
            this.init(data);
        }
        Container.prototype = new Data([
            {user: new TypeObj({class: 'coa.auth.User'})}
        ]);
        var container = new Container();
        expect(container.user).toBe(null);

        Container.prototype = new Data([
            {user: new TypeObj({class: 'coa.auth.User', default: {name: 'Test default'}})}
        ]);
        container = new Container();
        expect(container.user instanceof User).toBe(true);
        expect(container.user.name).toBe('Test default');
    });

    it('does not share default object', function() {
        function Container(data) {
            this.init(data);
        }
        Container.prototype = new Data([
            {user: new TypeObj({class: 'coa.auth.User', default: {name: 'Test default'}})}
        ]);
        var container1 = new Container();
        var container2 = new Container();

        expect(container1.user !== container2.user).toBe(true);
    });

    it('has string presentation', function() {
        var type = new TypeObj({class: 'unit-testing.Dummy'});
        expect(type.toString()).toBe('TypeObj({class: "unit-testing.Dummy", required: false})');
    });

    it('validates options correctly', function() {

        var type = new TypeObj();
        var options =  {};
        expect(type.optionDefinitions.validate(options)).toEqual(null);
        options = {class: 'coa.auth.User'};
        expect(type.optionDefinitions.validate(options)).toEqual({ class: 'coa.auth.User', required: false, default: null, label: null });

        type.init(options);
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
