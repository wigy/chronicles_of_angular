describe('module coa.data, factory service', function() {

    var factory, User, Data, Class;

    beforeEach(function() {
        module('coa.auth');
        module('coa.data');
        inject(function(_factory_, _User_, _Data_, _Class_){
            factory = _factory_;
            User = _User_;
            Data = _Data_;
            Class = _Class_;
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

        // Without these the prototypes are different classes and do not match.
        // Need to investigate how to avoid that and is it because of testing system itself.
        factory.constructor('coa.core','Class');
        factory.constructor('coa.data','Data');

        var user = factory.create('coa.auth.User', {name: 'Instance1'});
        expect(user instanceof User).toBe(true);
        expect(user instanceof Data).toBe(true);
        expect(user instanceof Class).toBe(true);
        expect(user instanceof factory.constructor('coa.auth','User')).toBe(true);
        expect(user instanceof factory.constructor('coa.data','Data')).toBe(true);
        expect(user instanceof factory.constructor('coa.core','Class')).toBe(true);

        var user2 = new User({name: 'Instance2'});
        expect(user2 instanceof User).toBe(true);
        expect(user2 instanceof Data).toBe(true);
        expect(user2 instanceof Class).toBe(true);
        expect(user2 instanceof factory.constructor('coa.auth','User')).toBe(true);
        expect(user2 instanceof factory.constructor('coa.data','Data')).toBe(true);
        expect(user2 instanceof factory.constructor('coa.core','Class')).toBe(true);
    });
});
