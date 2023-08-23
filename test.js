const newman = require('newman');
const moment = require('moment-timezone');

// set timezone ke Jakarta
moment.tz.setDefault('Asia/Jakarta');

newman.run({
    collection: 'https://api.postman.com/collections/25479458-d4d63e35-c5a0-41ed-8678-51967def50c9?access_key=PMAT-01H4DDBVHKHPJJ36VJ79VAS6YK',
    reporters: ['cli', 'htmlextra'],
    reporter: {
        htmlextra: {
            export: `./report/report_test_${moment().format('dddd_YYYY-MM-DD_HH-mm-ss')}.html`
        }
    }
}, function (err) {
    if (err) {
        throw err;
    }
    console.log('collection run complete!');
});
