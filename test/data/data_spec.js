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
});
