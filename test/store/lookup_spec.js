describe('module coa.store, Lookup class', function() {

    var Lookup;

    var haystack1 = [
        {name: 'foo', value: 12},
        {name: 'bar', value: 13},
        {name: 'baz', value: 14},
        {name: 'needle', value: 15},
    ];

    var haystack2 = {
        A: {name: 'foo', value: 12},
        B: {name: 'bar', value: 13},
        C: {name: 'baz', value: 14},
        D: {name: 'needle', value: 15},
    };

    beforeEach(function() {
        module('coa.store');
        inject(function(_Lookup_) {
            Lookup = _Lookup_;
        });
    });

    it('can search from list for exact match', function() {
        var q = new Lookup({name: "needle"});
        var res = q.search(haystack1);
        expect(res.length).toBe(1);
        expect(res[0]).toBe(haystack1[3]);
    });

    it('can search from object for exact match', function() {
        var q = new Lookup({name: "needle"});
        var res = q.search(haystack2);
        expect(res.length).toBe(1);
        expect(res[0]).toBe(haystack2.D);
    });

    it('can search for more than one field', function() {
        var q = new Lookup({name: "bar", value: 13});
        var res = q.search(haystack1);
        expect(res.length).toBe(1);
        expect(res[0]).toBe(haystack1[1]);

        var q2 = new Lookup({name: "bar", value: 14});
        var res2 = q2.search(haystack1);
        expect(res2.length).toBe(0);
    });

    it('finds everyhing by default', function() {
        var q = new Lookup();
        expect(q.search(haystack1).length).toBe(4);
        expect(q.search(haystack2).length).toBe(4);

        var q2 = new Lookup({});
        expect(q2.search(haystack1).length).toBe(4);
        expect(q2.search(haystack2).length).toBe(4);
    });
});
