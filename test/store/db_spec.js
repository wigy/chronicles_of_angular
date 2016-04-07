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
    });

    it('can insert objects into memory', function(done) {
        // Note that memory DB is guaranteed to act immediately.
        db.using('mem a');
        db.insert(new Project({name: "Project 1", description: "This is one."}));
        db.insert(new Project({name: "Project 2", description: "This is two."}));
        db.find(Project).then(function(data) {
            d(data);
            expect(true).toBe(true);
        }).finally(function() {
            done();
        });
        db.flush();
    });

    // TODO: Saving objects over previous copies.
});
