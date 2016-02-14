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
                    test: function(option, value) {
                        return !(option && value === null);
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
    });
});
