describe('module coa.data, Type class', function() {

    var Data, TypeStr;

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
        Testing.prototype = new Data([
            {testing_name: new TypeStr({})}
        ]);

        expect((new Testing()).getType('testing_name').options.label).toBe('Testing Name');
    });
});
