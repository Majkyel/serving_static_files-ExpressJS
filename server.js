const express = require('express');
const app = express();

app.use(express.static('assets'));


app.get('/', function(req, res) {
    res.sendFile('./assets/index.html');
});

app.use(function(req, res, next) {
    console.log('Hi! I am between request and response!');
    next();
});

app.get('/userform', function(req, res) {
    const response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    
    res.end(JSON.stringify(response));
});

const server = app.listen(3000, 'localhost', function() {
    let host = server.address().address;
    let port = server.address().port;
    
    console.log('Application listen on http://'+host+':'+port);
});

app.use(function(req, res) {
    res.status(404).send('Error. Please check the path!');
});
