const express = require('express');
const app = express();
const app_routes = require('./routes')

const{startDatabase} = require('./db')
app.use('/', app_routes);

app.listen(3000, () => {
    startDatabase();
    console.log('Port 3000');
});

module.exports = app;