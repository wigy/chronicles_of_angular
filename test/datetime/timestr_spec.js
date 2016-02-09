describe('module coa.datetime, TimeStr class', function() {

    var TimeStr;

    beforeEach(function() {
        module('coa.datetime');
        inject(function(_TimeStr_){
            TimeStr = _TimeStr_;
        });
    });

    it('initializes values correctly', function() {
        var zero = new TimeStr();
        expect(zero.toString()).toBe('00:00:00');
        expect(zero.short()).toBe('00:00');
        expect(zero.seconds()).toBe(0);

        var time = new TimeStr({time: '19:12:59'});
        expect(time.toString()).toBe('19:12:59');
        expect(time.short()).toBe('19:12');
        expect(time.seconds()).toBe(69179);

        // TODO: Initialize with another Time instance (needs support in Data.init()).
        // TODO: Initialize with single string (needs support in Data.init() and definition of primary field).
    });

    it('adds hours, minutes and seconds correctly', function() {
        var time = new TimeStr({time: '15:00:00'});
        time.addSeconds(1)
        expect(time.toString()).toBe('15:00:01');
        time.add(1, 1, 1);
        expect(time.toString()).toBe('16:01:02');
    });

    // TODO: Test comparison.
    // TODO: Support and test negative additions.
});
