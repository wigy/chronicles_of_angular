describe('module coa.store, db service', function() {

    var db, Data, TypeStr;

    function Project(data) {
        this.init(data);
    }

    beforeEach(function() {
        module('coa.data');
        module('coa.store');
        inject(function(dbconfig, _db_, _Data_, _TypeStr_) {
            dbconfig.set('mem a', 'memory://mem_a');
            dbconfig.set('mem b', 'memory://mem_b');
            db = _db_;
            Data = _Data_;
            TypeStr = _TypeStr_;
            Project.prototype = new Data([{
                name: new TypeStr(),
                description: new TypeStr(),
            }]);
            Project.prototype.__class = 'unit-testing.Project';
        });

        // TODO: Drop debug.
        d.channels({
            STORE: true
        });

    });

    it('can insert objects into memory', function(done) {
        db.using('mem a');
        var p1 = new Project({name: "Project 1", description: "This is one."});
        var p2 = new Project({name: "Project 2", description: "This is two."});
        // Note that memory DB is guaranteed to act immediately, so no need to chain promises.
        db.insert(p1);
        db.insert(p2);
        db.find(Project).then(function(data) {
            expect(data.length).toBe(2);
            expect(data[0] instanceof Project).toBe(true);
            expect(data[1] instanceof Project).toBe(true);
            expect(data[0].name).toBe("Project 1");
            expect(data[0].description).toBe("This is one.");
            expect(data[1].name).toBe("Project 2");
            expect(data[1].description).toBe("This is two.");
        }).finally(function() {
            done();
        });
        db.flush();
    });

    // TODO: Saving objects over previous copies.
});
