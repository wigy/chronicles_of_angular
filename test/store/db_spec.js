describe('module coa.store, db service', function() {

    var db, dbconfig, Data, TypeStr;

    function Project(data) {
        this.init(data);
    }

    beforeEach(function() {
        module('coa.data');
        module('coa.store');
        inject(function(_dbconfig_, _db_, _Data_, _TypeStr_) {
            db = _db_;
            dbconfig = _dbconfig_;
            Data = _Data_;
            TypeStr = _TypeStr_;
            Project.prototype = new Data([{
                name: new TypeStr(),
                description: new TypeStr(),
            }]);
            Project.prototype.__class = 'unit-testing.Project';

            // Clear all data.
            db.destroy();
        });
    });

    it('can insert objects into memory', function(done) {
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

    it('refuses invalid options in find()', function() {
        d.expect(function() {
            db.find(Project, {}, {invalid: 111});
        }).toBe("Invalid options {invalid: 111} for storage find(). Using defaults.");
    });

    it('supports raw data', function(done) {
        var p1 = new Project({name: "Project 1", description: "This is one."});
        var p2 = new Project({name: "Project 2", description: "This is two."});
        db.insert(p1);
        db.insert(p2);
        db.find(Project, {}, {raw: true}).then(function(data){
            expect(data.length).toBe(2);
            expect(data[0] instanceof Project).toBe(false);
            expect(data[1] instanceof Project).toBe(false);
        }).finally(function() {
            done();
        });
        db.flush();
    });

    it('performs simple lookup', function(done) {
        var p1 = new Project({name: "Project 1", description: "This is one."});
        var p2 = new Project({name: "Project 2", description: "This is two."});
        db.insert(p1);
        db.insert(p2);
        db.find(Project, {name: "Project 2"}, {raw: true}).then(function(data){
            expect(data.length).toBe(1);
            expect(data[0].name).toBe("Project 2");
        }).finally(function() {
            done();
        });
        db.flush();
    });

    it('can switch between data storages', function(done) {

        dbconfig.set('MemA', 'memory://mem_a');
        dbconfig.set('MemB', 'memory://mem_b');

        var p1 = new Project({name: "Project 1", description: "This is one."});
        var p2 = new Project({name: "Project 2", description: "This is two."});
        db.using('MemA');
        db.insert(p1);
        db.using('MemB');
        db.insert(p2);

        db.using('MemA');
        db.find(Project).then(function(data) {
            expect(data.length).toBe(1);
            expect(data[0] instanceof Project).toBe(true);
            expect(data[0].name).toBe("Project 1");
            expect(data[0].description).toBe("This is one.");

            db.using('MemB');
            db.find(Project).then(function(data) {
                expect(data.length).toBe(1);
                expect(data[0].name).toBe("Project 2");
                expect(data[0].description).toBe("This is two.");
            }).finally(function() {
                done();
            });
        });
        db.flush();
    });

    // TODO: Saving objects over previous copies.
});
