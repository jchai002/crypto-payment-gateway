let express = require('express');
let v1 = require('./routes');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/v1', v1);

module.exports = app;
