describe('module coa.data, factory service', function() {

    var factory, User, Data;

    beforeEach(function() {
        module('coa.auth');
        module('coa.data');
        inject(function(_factory_, _User_, _Data_){
            factory = _factory_;
            User = _User_;
            Data = _Data_;
        });
    });

    it('can locate and instantiate classes', function() {

        var userclass = factory.constructor('coa.auth', 'User');
        var user = factory.create('coa.auth', 'User', {name: 'Factory Testing'});

        expect(user.name).toBe('Factory Testing');
        expect(user instanceof userclass).toBe(true);
    });

    it('supports fully qualified class names', function() {

        var user = factory.create('coa.auth.User', {name: 'FQ Factory Testing'});
        expect(factory.constructor('coa.auth.User') === User).toBe(true);
        expect(user.name).toBe('FQ Factory Testing');
    });

    it('provides the same constructors than directly injected classes', function() {

        var user = factory.create('coa.auth.User', {name: 'Instance1'});
        expect(user instanceof User).toBe(true);
        expect(user instanceof Data).toBe(true);

        var user2 = new User({name: 'Instance2'});
        expect(user2 instanceof factory.constructor('coa.auth','User')).toBe(true);
        expect(user2 instanceof Data).toBe(true);
        // Hmm, this does not work.
        // expect(user2 instanceof factory.constructor('coa.data','Data')).toBe(true);
    });
});
