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

    it('compares times correctly', function() {

        var t0 = new TimeStr({time: '15:00:00'});
        var t1 = new TimeStr({time: '15:00:00'});
        var t2 = new TimeStr({time: '15:00:01'});

        expect(t0.notYet(t1)).toBe(false);
        expect(t2.notYet(t1)).toBe(false);
        expect(t1.notYet(t2)).toBe(true);

        expect(t0.isPast(t1)).toBe(false);
        expect(t2.isPast(t1)).toBe(true);
        expect(t1.isPast(t2)).toBe(false);

        expect(t0.isAlready(t1)).toBe(true);
        expect(t2.isAlready(t1)).toBe(true);
        expect(t1.isAlready(t2)).toBe(false);

    });

    it('adds negative seconds correctly', function() {
        var time = new TimeStr({time: '01:01:50'});
        time.addSeconds(-5)
        expect(time.toString()).toBe('01:01:45');
        time.addSeconds(-60*60)
        expect(time.toString()).toBe('00:01:45');
        time.addSeconds(-60)
        expect(time.toString()).toBe('00:00:45');
        time.addSeconds(-50)
        expect(time.toString()).toBe('-00:00:05');
    });
});