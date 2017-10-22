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
};