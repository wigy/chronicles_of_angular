describe('module coa.datetime, TimeStr class', function() {

    var TimeStr;

    beforeEach(function() {
        module('coa.datetime');
        inject(function(_TimeStr_){
            TimeStr = _TimeStr_;
        });
    });

    it('can calculate seconds', function() {
        // TODO: Test TimeStr throughly.
        d(new TimeStr());
        expect(true).toBe(true);
    });
});
