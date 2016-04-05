describe('module coa.store, db service', function() {

    var db, Data, TypeStr, $rootScope;

    function Project(data) {
        this.init(data);
    }
    Project.prototype.__class = 'unit-testing.Project';

    beforeEach(function() {
        module('coa.data');
        module('coa.store');
        inject(function(_db_, _Data_, _TypeStr_, _$rootScope_) {
            db = _db_;
            Data = _Data_;
            TypeStr = _TypeStr_;
            $rootScope = _$rootScope_;
            Project.prototype = new Data([{
                name: new TypeStr()
            }]);
        });
    });

    it('can insert objects into memory', function() {
        // TODO: Implement with promises
        db.insert(new Project({name: "Project 1"}));
        db.insert(new Project({name: "Project 2"}));
        db.find(Project).then(function(data) {
            d(data);
        });
        $rootScope.$apply();
        expect(true).toBe(true);
    });
});
