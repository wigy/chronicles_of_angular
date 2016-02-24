describe('module coa.data, Data class', function() {

    var Data, TimeStr, TypeStr, TypeBool, TypeInt, TypeObj;

    beforeEach(function() {
        module('coa.data');
        module('coa.datetime');
        inject(function(_Data_, _TimeStr_, _TypeStr_, _TypeInt_, _TypeBool_, _TypeObj_){
            Data = _Data_;
            TimeStr = _TimeStr_;
            TypeStr = _TypeStr_;
            TypeInt = _TypeInt_;
            TypeBool = _TypeBool_;
            TypeObj = _TypeObj_;
        });
    });

    it('refuses to define same member twice', function() {
        d.quiet();
        function Testing(data) {
            this.init(data);
        }
        Testing.prototype = new Data([
            {name: {type: TypeStr}},
            {name: {type: TypeStr}},
        ]);
        var testing = new Testing();
        expect(d.errors()).toEqual(['Trying to define member name as TypeStr({default: null, label: "Name", name: "name", options: {"required":false,"pattern":null}}) but it has been already defined as TypeStr({default: null, label: "Name", name: "name", options: {"required":false,"pattern":null}}) in Data()']);
        expect(testing.getMembers().length).toBe(1);
    });

    it('can validate all members', function() {

        function Testing(data) {
            this.init(data);
        }

        Testing.prototype = new Data([
            {name1: {type: TypeStr, options: {required: true}}},
            {name2: {type: TypeStr, options: {required: true}}},
        ]);

        var testing = new Testing();
        expect(testing.isInvalid()).toEqual({ name1: [ 'This value is required.' ], name2: [ 'This value is required.' ] });
        expect(testing.isValid()).toEqual(false);
        testing.name1 = "";
        expect(testing.isInvalid()).toEqual({ name2: [ 'This value is required.' ] });
        expect(testing.isValid()).toEqual(false);
        testing.name2 = "0";
        expect(testing.isInvalid()).toEqual(false);
        expect(testing.isValid()).toEqual(true);

        Testing.prototype = new Data([
            {name1: {type: TypeStr, options: {}}},
            {name2: {type: TypeStr, options: {}}},
        ]);

        testing = new Testing();
        expect(testing.isInvalid()).toEqual(false);
        expect(testing.isValid()).toEqual(true);
        testing.name1 = "";
        expect(testing.isInvalid()).toEqual(false);
        expect(testing.isValid()).toEqual(true);
        testing.name2 = "0";
        expect(testing.isInvalid()).toEqual(false);
        expect(testing.isValid()).toEqual(true);
    });

    it('converts to JSON', function() {

        function Testing(data) {
            this.init(data);
        }

        Testing.prototype = new Data([
            {var1: {type: TypeBool, default: true, options: {}}},
            {var2: {type: TypeStr, options: {}}},
            {var3: {type: TypeInt, default: -1, options: {}}},
            {var4: {type: TypeObj, options: {class: 'unit-testing.Testing'}}},
        ]);
        Testing.prototype.__class = 'unit-testing.Testing';
        var obj = new Testing({var2: 'x', var4: new Testing({var2: 'y'})});

        expect(obj.isInvalid()).toBe(false);
        expect(obj.toJSON()).toEqual({
            var1: true,
            var2: 'x',
            var3: -1,
            var4: {
                var1: true,
                var2: 'y',
                var3: -1,
                var4: null
            }
        });
    });

    it('can copy objects', function() {

        function Testing(data) {
            this.init(data);
        }

        Testing.prototype = new Data([
            {name: {type: TypeStr}},
            {time: {type: TypeObj, options: {class: 'coa.datetime.TimeStr'}}},
        ]);

        var time = new TimeStr({time: '01:02:03'});
        var obj = new Testing({name: 'Cloned', time: time});
        var clone = new Testing();
        clone.copy(obj);

        expect(clone.time===obj.time).toBe(false);
        expect(clone.name).toBe('Cloned');
        expect(clone.time.time).toBe('01:02:03');

        var clone2 = new Testing(obj);
        expect(clone2.time===obj.time).toBe(false);
        expect(clone2.name).toBe('Cloned');
        expect(clone2.time.time).toBe('01:02:03');
    });

    it('can initialize from atom value', function() {

        function Testing(data) {
            this.init(data);
        }

        Testing.prototype = new Data([
            {name: {type: TypeStr}},
            {number: {type: TypeInt}},
        ], {primary_field: 'name'});

        var obj;
        obj = new Testing('Hello!');
        expect(obj.name).toBe('Hello!');
        obj = new Testing();
        expect(obj.name).toBe(null);
    });
});
