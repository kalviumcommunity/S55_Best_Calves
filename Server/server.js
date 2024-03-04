const express = require('express');
const app = express();
const app_routes = require('./routes')
var cors = require('cors')

app.use(cors())

const{startDatabase} = require('./db')
app.use('/', app_routes);

app.listen(3000, () => {
    startDatabase();
    console.log('Port 3000');
});

module.exports = app;