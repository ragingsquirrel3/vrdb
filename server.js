const express = require("express");
const app = express();

const getData = require('./src/server/api/getData');
const setup = require('./src/server/api/setupApi');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/assets', express.static('build'));
app.use('/', require('./src/server/routers/index'));

app.get('/api/:chrom', getData);

const server = app.listen(3000);
setup(server);
