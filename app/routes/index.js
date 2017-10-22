const noteRoutes = require('./note_routes');
const uploads = require('./uploads');
const testRoute = require('./test_route');

module.exports = (app, db)=>{
	noteRoutes(app, db);
	uploads(app, db);
	testRoute(app);
}