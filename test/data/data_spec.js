describe('module coa.data, Data class', function() {

    var Data;

    beforeEach(function() {
        module('coa.data');
        inject(function(_Data_, _TypeStr_){
            Data = _Data_;
            TypeStr = _TypeStr_;
        });
    });

    it('refuses to define same member twice', function() {
        d.quiet();
        function Testing(data) {
            this.init(data);
        }
        Testing.prototype = new Data('Testing', 'unit-testing', [
            {name: {type: TypeStr}},
            {name: {type: TypeStr}},
        ]);
        var testing = new Testing();
        expect(d.errors().length > 0).toBe(true);
        expect(testing.getMembers().length).toBe(1);
    });

    it('can validate all members', function() {

        function Testing(data) {
            this.init(data);
        }

        Testing.prototype = new Data('Testing', 'unit-testing', [
            {name1: {type: TypeStr, options: {required: true}}},
            {name2: {type: TypeStr, options: {required: true}}},
        ]);

        var testing = new Testing();
        expect(testing.isInvalid()).toEqual({ name1: [ 'This value is required.' ], name2: [ 'This value is required.' ] });
        expect(testing.isValid()).toEqual(false);
        testing.name1 = "";
        expect(testing.isInvalid()).toEqual({ name2: [ 'This value is required.' ] });
        expect(testing.isValid()).toEqual(false);
        testing.name2 = "0";
        expect(testing.isInvalid()).toEqual(false);
        expect(testing.isValid()).toEqual(true);

        Testing.prototype = new Data('Testing', 'unit-testing', [
            {name1: {type: TypeStr, options: {}}},
            {name2: {type: TypeStr, options: {}}},
        ]);

        var testing = new Testing();
        expect(testing.isInvalid()).toEqual(false);
        expect(testing.isValid()).toEqual(true);
        testing.name1 = "";
        expect(testing.isInvalid()).toEqual(false);
        expect(testing.isValid()).toEqual(true);
        testing.name2 = "0";
        expect(testing.isInvalid()).toEqual(false);
        expect(testing.isValid()).toEqual(true);
    });
});
