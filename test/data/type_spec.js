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
        Testing.prototype = new Data('Testing', 'unit-test',
            [{testing_name: {type: TypeStr}}]);
        expect((new Testing()).getType('testing_name').label).toBe('Testing Name')
    });
});
