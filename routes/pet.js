let r = require('request').defaults({
	json: true
});
let async = require('async');

module.exports = (app) => {
    /* Read */
	app.get('/pets', (req, res) => {
		async.parallel({
				cat: function(callback) {
					r({url: 'http://localhost:3003/cat'}, (error, response, body) => {
						if (error) {
							callback({service: 'cat', error: error});
							return;
						}
						if (!error && response.statusCode === 200) {
							callback(null, body.data);
						} else {
							callback(response.statusCode);
						}
					});
				},
				dog: function(callback) {
					r({url: 'http://localhost:3002/dog'}, (error, response, body) => {
						if (error) {
							callback({service: 'dog', error: error});
							return;
						}
						if (!error && response.statusCode === 200) {
							callback(null, body.data);
						} else {
							callback(response.statusCode);
						}
					});
				}
			},
			function(error, results) {
				res.json({
					error: error,
					results: results
				});
			}
		);
	});

}