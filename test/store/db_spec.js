describe('module coa.store, db service', function() {

    var db, Data, TypeStr;

    function Project(data) {
        this.init(data);
    }
    Project.prototype.__class = 'unit-testing.Project';

    beforeEach(function() {
        module('coa.data');
        module('coa.store');
        inject(function(dbconfig, _db_, _Data_, _TypeStr_) {
            dbconfig.set('a', 'memory://a');
            dbconfig.set('b', 'memory://b');
            db = _db_;
            Data = _Data_;
            TypeStr = _TypeStr_;
            Project.prototype = new Data([{
                name: new TypeStr(),
                description: new TypeStr(),
            }]);
        });
    });

    it('can insert objects into memory', function(done) {
        // Note that memory DB is guaranteed to act immediately.
        db.using('a');
        db.insert(new Project({name: "Project 1"}));
        db.insert(new Project({name: "Project 2"}));
        db.find(Project).then(function(data) {
            d(data);
            expect(true).toBe(true);
            done();
        });
        db.flush();
    });
});
