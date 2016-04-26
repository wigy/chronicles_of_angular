describe('module coa.data, Data class', function() {

    var Data, TimeStr, TypeStr, TypeBool, TypeInt, TypeObj, db;

    beforeEach(function() {
        module('coa.data');
        module('coa.datetime');
        module('coa.store');
        inject(function(_Data_, _TimeStr_, _TypeStr_, _TypeInt_, _TypeBool_, _TypeObj_, _db_){
            Data = _Data_;
            TimeStr = _TimeStr_;
            TypeStr = _TypeStr_;
            TypeInt = _TypeInt_;
            TypeBool = _TypeBool_;
            TypeObj = _TypeObj_;
            db = _db_;

            db.destroy();
        });
    });

    it('refuses to define same member twice', function() {

        d.expect(function() {
            function Testing(data) {
                this.init(data);
            }
            Testing.prototype = new Data([
                {name: new TypeStr()},
                {name: new TypeStr()},
            ]);
            var testing = new Testing();
        }).toBe('Trying to define member name as TypeStr({label: "Name", required: false}) but it has been already defined as TypeStr({label: "Name", required: false}) in Data()');
    });

    it('can validate all members', function() {

        function Testing(data) {
            this.init(data);
        }

        Testing.prototype = new Data([
            {name1: new TypeStr({required: true})},
            {name2: new TypeStr({required: true})},
        ]);
        Testing.prototype.__class = 'unit-testing.Testing';

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
            {name1: new TypeStr({})},
            {name2: new TypeStr({})},
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
            {var1: new TypeBool({default: true})},
            {var2: new TypeStr({})},
            {var3: new TypeInt({default: -1})},
            {var4: new TypeObj({class: 'unit-testing.Testing'})},
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
            {name: new TypeStr()},
            {time: new TypeObj({class: 'coa.datetime.TimeStr'})},
        ]);
        Testing.prototype.__class = 'unit-testing.Testing';

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
            {name: new TypeStr({})},
            {number: new TypeInt({})},
        ], {primary_field: 'name'});
        Testing.prototype.__class = 'unit-testing.Testing';

        var obj;
        obj = new Testing('Hello!');
        expect(obj.name).toBe('Hello!');
        obj = new Testing();
        expect(obj.name).toBe(null);
    });

    it('refuses to save invalid object', function() {

        function Failing(data) {
            this.init(data);
        }

        Failing.prototype = new Data([
            {name: new TypeStr({})},
        ]);
        Failing.prototype.__class = 'unit-testing.Failing';

        d.expect(function(){
            var f1 = new Failing();
            f1.name = 21;
            f1.save();
        }).toBe("Cannot save Failing({name: 21}) since it has errors: {name: [\"Value has not correct type.\"]}");
    });

    xit('can save and fetch values from the storage', function(done) {
        // Somewhere there is a problem with forcing promises to be resolved.
        // If this test is run with other tests, the promise will not resolve ever.
        // This test works as expected, when running it alone.

        function Testing(data) {
            this.init(data);
        }

        Testing.prototype = new Data([
            {name: new TypeStr({required: true})},
            {number: new TypeInt()},
            {active: new TypeBool()},
        ]);
        Testing.prototype.__class = 'unit-testing.Testing';

        var t1 = new Testing({name: "I am", number: 212, active: true});

        t1.save().then(function(id){
            var t2 = new Testing();
            t2.load(t1._id).then(function() {
                expect(t2.name).toBe("I am");
                expect(t2.number).toBe(212);
                expect(t2.active).toBe(true);
            }).finally(function() {
                done();
            });
        });
        db.flush();
    });

    xit('can update values in the storage', function(done) {
        // Same problem as above.

        function Testing(data) {
            this.init(data);
        }

        Testing.prototype = new Data([
            {name: new TypeStr({required: true})},
            {number: new TypeInt()},
        ]);
        Testing.prototype.__class = 'unit-testing.Testing';

        var t1 = new Testing({name: "I am", number: 212});

        t1.save().then(function(id) {
            var oldId = t1._id;
            t1.name = "I was";
            t1.save().then(function() {
                expect(t1._id).toBe(oldId);
                var t2 = new Testing();
                t2.load(t1._id).then(function() {
                    expect(t2.name).toBe("I was");
                    expect(t2.number).toBe(212);
                }).finally(function() {
                    done();
                });
            });
        });

        db.flush();
    });
});
