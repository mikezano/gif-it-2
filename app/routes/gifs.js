var ObjectID = require('mongodb').ObjectID;
var Binary = require('mongodb').Binary;

var fileUpload = require('express-fileupload');

var gifs = 'gifs';
module.exports = (app, db) =>{

	app.use(fileUpload());

	app.post(`/${gifs}/upload`, (req, res)=>{

		console.log(req.files);
		var file = req.files.gifs;

		db.collection(gifs).insert(file, (err, item)=>{
			if(err){
				console.log(item);
				console.log(err);
				res.send({'error': 'An error has occurred'});
			}
			else{
				res.send(item);
			}
		});
	});

	app.get(`/${gifs}/all`, (req, res)=>{

		db.collection(gifs).find({}).toArray((err, item)=>{
			if(err){
				res.send({'error': 'An error has occurred'});
			}
			else{
				console.log(item);
				res.send(JSON.stringify(item));
			}
		});
	});

	app.get(`/${gifs}/random`, (req, res)=>{
		
		const details = { $sample: {size: 1} };
		db.collection(gifs).aggregate(details, (err, item)=>{
			if(err){
				res.send({'error': 'An error has occurred'});
			}
			else{
				console.log(item);
				res.send(JSON.stringify(item));
			}
		});
	});
};