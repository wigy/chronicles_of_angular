describe('module coa.data, TypeOptions class', function() {

    var Data, TypeStr, TypeInt, TypeOptions, Options;
    var opts, Opts;

    beforeEach(function() {
        module('coa.data');
        inject(function(_Data_, _TypeStr_, _TypeInt_, _TypeOptions_, _Options_){
            Data = _Data_;
            TypeStr = _TypeStr_;
            TypeInt = _TypeInt_;
            TypeOptions = _TypeOptions_;
            Options = _Options_;
        });

        opts = new TypeOptions({default: {one: false}, options: new Options({
            one: {text: 'One fails.', type: 'boolean', required: true},
            two: {text: 'Two fails.', type: 'string', default: 'X'},
        })});

        Opts = function(data) {
            this.init(data);
        };
        Opts.prototype = new Data([
            {settings: opts},
        ]);
    });

    it('requires options option', function() {
        d.quiet();
        new Data([
            {invalid: new TypeOptions({})},
        ]);
        expect(d.errors()).toEqual(['Invalid options {} for type TypeOptions({})']);
    });

    it('initializes object members with default values', function() {
        var obj = new Opts({settings: {one: true}});
        expect(obj.settings).toEqual({ one: true, two: 'X' });
    });


    it('has string presentation', function() {
        expect(opts.toString()).toEqual('TypeOptions({default: {"one":false,"two":"X"}, label: "Settings", options: Options({one: Option({default: null, required: true, text: "One fails.", type: "boolean"}), two: Option({default: "X", required: false, text: "Two fails.", type: "string"})})})');
    });

    it('converts to JSON with new copies of objects', function() {
        var settings = {one: false, two: '2'};
        var obj = new Opts({settings: settings});
        var json = obj.toJSON();
        expect(json).toEqual({settings: { one: false, two: '2' }});
        expect(json.settings === settings).toBe(false);
    });

    it('validates options correctly', function() {
        expect(opts.isInvalid(true)).toEqual(['Value has not correct type.']);
        expect(opts.isInvalid({'a': 12})).toEqual(['Value has not correct type.']);
        expect(opts.isInvalid({})).toEqual(['Value has not correct type.']);
        expect(opts.isInvalid({one: false})).toEqual(false);
        expect(opts.isInvalid({one: true})).toEqual(false);
        expect(opts.isInvalid({one: null})).toEqual(['Value has not correct type.']);
        expect(opts.isInvalid({one: false, two: 1})).toEqual(['Value has not correct type.']);
        expect(opts.isInvalid({one: false, two: '1'})).toEqual(false);
        expect(opts.isInvalid({two: '1'})).toEqual(['Value has not correct type.']);
    });

    it('does not share default value', function() {

        function Container(data) {
            this.init(data);
        }
        Container.prototype = new Data([
            {opts: new TypeOptions({options: new Options()})}
        ]);

        var c1 = new Container();
        var c2 = new Container();
        expect(c1.opts === c2.opts).toBe(false);
    });
});
