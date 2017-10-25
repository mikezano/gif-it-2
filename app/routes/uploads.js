var ObjectID = require('mongodb').ObjectID;
var Binary = require('mongodb').Binary;

var fileUpload = require('express-fileupload');

module.exports = (app, db) =>{

	app.use(fileUpload());

	app.post('/upload', (req, res)=>{

		var item = {};
		console.log(req.files);
		var file = req.files.gif;
		item.bin = Binary(file);

		return;
		//console.log(file);
		// const id = req.params.id;
		// const details = { '_id': new ObjectID(id)};
		console.log("Here");
		db.collection('uploads').insert(file, (err, item)=>{
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

	app.get('/uploads/all', (req, res)=>{

		db.collection('uploads').find({}).toArray((err, item)=>{
			if(err){
				res.send({'error': 'An error has occurred'});
			}
			else{
				console.log(item);
				res.send(JSON.stringify(item));
			}
		});
	});

	app.get('/uploads/random', (req, res)=>{
		
		const details = { $sample: {size: 1} };
		db.collection('uploads').aggregate(details, (err, item)=>{
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