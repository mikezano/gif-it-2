var ObjectID = require('mongodb').ObjectID;

module.exports = (app, db)=>{

	app.get('/notes/:id', (req, res)=>{
		const id = req.params.id;
		const details = { '_id': new ObjectID(id)};
		db.collection('notes').findOne(details, (err, item)=>{
			if(err){
				res.send({'error': 'An error has occurred'});
			}
			else{
				res.send(item);
			}
		});
	});

	app.delete('/notes/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('notes').remove(details, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send('Note ' + id + ' deleted!');
			}
		});
	});

	app.post('/notes', (req, res) => {
		const note = {text: req.body.body, title: req.body.title};
		//res.send("hello"); //two of these causes error in response
		db.collection('notes').insert(note, (err, result) =>{
			if(err)
				res.send({'error': 'An error has ocurred'});
			else
				res.send(result.ops[0]);
		});
	 });

	app.put('/notes/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		const note = { text: req.body.body, title: req.body.title };
		db.collection('notes').update(details, note, (err, result) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(note);
			} 
		});
	});
};

//http://stackoverflow.com/questions/11442356/storing-some-small-under-1mb-files-with-mongodb-in-nodejs-without-gridfs