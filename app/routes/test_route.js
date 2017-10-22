
module.exports = (app)=>{

	app.get('/test_route', (req, res)=>{
        res.send("Hi Person");
	});
};

//http://stackoverflow.com/questions/11442356/storing-some-small-under-1mb-files-with-mongodb-in-nodejs-without-gridfs