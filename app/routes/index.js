const noteRoutes = require('./note_routes');
const gifs = require('./gifs');
const testRoute = require('./test_route');

module.exports = (app, db)=>{
	noteRoutes(app, db);
	gifs(app, db);
	testRoute(app);
}