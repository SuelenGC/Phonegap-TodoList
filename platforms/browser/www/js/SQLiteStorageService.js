SQLiteStorageService = function () {
	var service = {};
	var db = window.sqlitePlugin.openDatabase({name: "demo.toptal"});

    service.initialize = function() {
        // Initialize the database 
        var deferred = $.Deferred();
        db.transaction(function(tx) {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS projects ' + 
                '(id integer primary key, name text, company text, description text, latitude real, longitude real)'
            ,[], function(tx, res) {
                tx.executeSql('DELETE FROM projects', [], function(tx, res) {
                    deferred.resolve(service);
                }, function(tx, res) {
                    deferred.reject('Error initializing database');
                });
            }, function(tx, res) {
                deferred.reject('Error initializing database');
            });
        });
        return deferred.promise();
    }

    service.getProjects = function() {
    	// fetch projects
    }

    service.addProject = function(name, company, description, addLocation) {
        // add a new project
    }

    return service.initialize();
}