const pack = require('./package.json');

const express = require('express');
const path = require('path');
const logger = require('morgan');
const fs = require('fs');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));

const indexHtml = fs.readFileSync(path.join(__dirname, './client/build/index.html')).toString();

app.use('/api', require('./routes/api'));
app.use(express.static(__dirname + '/client/build'));
app.use((req, res) => res.send(indexHtml));

app.get("/calendars", function(req, res) {
  res.redirect("/");
});

app.listen(pack.port, () => {
	console.log('Express server listening on port ' + pack.port);
});