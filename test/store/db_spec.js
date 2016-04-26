describe('module coa.store, db service', function() {

    var db, dbconfig, Data, TypeStr, TypeInt;

    function Project(data) {
        this.init(data);
    }

    beforeEach(function() {
        module('coa.data');
        module('coa.store');
        inject(function(_dbconfig_, _db_, _Data_, _TypeStr_, _TypeInt_) {
            db = _db_;
            dbconfig = _dbconfig_;
            Data = _Data_;
            TypeStr = _TypeStr_;
            TypeInt = _TypeInt_;
            Project.prototype = new Data([{
                name: new TypeStr(),
                description: new TypeStr(),
                number: new TypeInt(),
            }]);
            Project.prototype.__class = 'unit-testing.Project';

            // Clear all data.
            db.destroy();
            // Insert samples.
            var p1 = new Project({name: "Project 1", description: "This is one.", number: 10001});
            var p2 = new Project({name: "Project 2", description: "This is two.", number: 10002});
            // Note that memory DB is guaranteed to act immediately, so no need to chain promises.
            db.insert(p1);
            db.insert(p2);
        });
    });

    it('can insert objects into memory', function(done) {
        db.find(Project).then(function(data) {
            expect(data.length).toBe(2);
            expect(data[0].name).toBe("Project 1");
            expect(data[0].description).toBe("This is one.");
            expect(data[0].number).toBe(10001);
            expect(data[1].name).toBe("Project 2");
            expect(data[1].description).toBe("This is two.");
            expect(data[1].number).toBe(10002);
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

    it('performs simple lookup', function(done) {
        db.find(Project, {name: "Project 2"}).then(function(data){
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

    it('performs simple lookup', function(done) {
        db.find(Project, {name: "Project 2"}).then(function(data){
            expect(data.length).toBe(1);
            expect(data[0].name).toBe("Project 2");
        }).finally(function() {
            done();
        });
        db.flush();
    });

    it('can update existing objects', function(done) {
        db.update(Project, {name: "Project 2"}, {name: 'Second Project', description: null});
        db.find(Project).then(function(data){
            expect(data.length).toBe(2);
            expect(data[0].name).toBe("Project 1");
            expect(data[0].description).toBe("This is one.");
            expect(data[0].number).toBe(10001);
            expect(data[1].name).toBe("Second Project");
            expect(data[1].description).toBe(null);
            expect(data[1].number).toBe(10002);
        }).finally(function() {
            done();
        });
        db.flush();
    });

    it('refuses changing _id with update()', function() {
        d.expect(function() {
            db.update(Project, {}, {_id: '1234'});
        }).toBe('Cannot change _id of unit-testing.Project with update {_id: "1234"}');

        db.find(Project).then(function(data){
            expect(data.length).toBe(2);
            expect(data[0]._id).not.toBe('1234');
            expect(data[1]._id).not.toBe('1234');
        }).finally(function() {
            done();
        });
        db.flush();
    });
});
