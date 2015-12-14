describe('module coa.data, service factory', function() {

    var factory;

    beforeEach(function() {
        module('coa.data');
        inject(function(_factory_){
            factory = _factory_;
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

        expect(user.name).toBe('FQ Factory Testing');
    });
});
