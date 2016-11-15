let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

let dogs = require('./routes/dog.js')(app);

let server = app.listen(3002, () => {
	console.log('Server running at http://127.0.0.1:3002');
});