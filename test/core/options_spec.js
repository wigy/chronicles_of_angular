describe('module coa.core, Options class', function() {

    var Option, Options;
    var options;

    beforeEach(function() {
        module('coa.core');
        inject(function(_Option_, _Options_){
            Option = _Option_;
            Options = _Options_;
        });

        options = new Options({
                required: {
                    text: "This value is required.",
                    type: "boolean",
                    default: false,
                    required: false,
                    op: function(option, extra) {
                        return 'required:' + option + ' ' + extra;
                    },
                }
        });

    });

    it('manages option collection correctly', function() {

        expect(options.required instanceof Option).toBe(true);
        expect(options.required.text).toBe("This value is required.");

        var extended = options.inherit({
            added: {
                text: 'Added option.'
            }
        });
        expect(extended.added.text).toBe("Added option.");

        extended.required.text = 'Original must be unaffected.';
        expect(options.required.text).toBe("This value is required.");
        expect(extended.required.text).toBe("Original must be unaffected.");
    });

    it('validates and operates options correctly', function() {

        var extended = options.inherit({
            added: {
                text: 'Added option need to be %o.',
                type: function(val) {
                    return val === 1;
                }
            },
            as_well: {
                text: 'Another one.',
                type: 'string',
                default: 'xyz',
                op: function(option, extra) {
                    return 'as_well:' + option + ' ' + extra;
                }
            }
        });

        expect(extended.validate({})).toEqual({required: false, added: null, as_well: 'xyz'});
        expect(extended.validate({x: 1})).toBe(null);
        expect(extended.validate({added: 2})).toBe(null);
        expect(extended.validate({required: true, added: 1})).toEqual({required: true, added: 1, as_well: 'xyz'});
        expect(extended.validate({as_well: 'ABC'})).toEqual({required: false, added: null, as_well: 'ABC'});
        expect(extended.validate({as_well: null})).toBe(null);
        expect(extended.validate({as_well: 0})).toBe(null);
    });

    it('runs tests for options correctly', function() {

        var options = new Options({
                required: {
                    text: "Value cannot be %v since option is set to %o.",
                    op: function(option, value) {
                        return !option || value;
                    },
                }
        });

        var values = options.validate({required: true});
        expect(options.test(values, {})).toEqual(['Value cannot be undefined since option is set to true.']);
        expect(options.test(values, {required: 1})).toEqual([]);

        values = options.validate({required: false});
        expect(options.test(values, {})).toEqual([]);
        expect(options.test(values, {required: 1})).toEqual([]);
    });
});
