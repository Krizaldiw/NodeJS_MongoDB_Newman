const newman = require('newman');

newman.run({
    collection: require('./node_postman_collection.json'),
    reporters: ['cli','htmlextra'],
    reporter: {
        htmlextra:{
            export: '../report/report_test.html'
        }
    }
}, function (err) {
	if (err) { throw err; }
    console.log('collection run complete!');
});
