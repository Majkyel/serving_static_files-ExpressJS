const express = require('express');
const app = express();

app.use(express.static('assets'));


app.get('/', function(req, res) {
    res.sendFile('./assets/index.html');
});

app.use('/userform', function(req, res, next) {
    console.log('Hi! I am intermediary on the "/userform - middleware function"');
    next();
});

app.get('/userform', function(req, res) {
    const response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    
    res.send(JSON.stringify(response));
});

app.use('/store',function(req, res, next) {
    console.log('I am intermediary on the requesting "/store" - middleware function');
    next();
});

app.get('/store', function(req, res) {
    res.send('This is shop!');
});

const server = app.listen(3000, 'localhost', function() {
    let host = server.address().address;
    let port = server.address().port;
    
    console.log('Application listen on http://'+host+':'+port);
});

app.use(function(req, res) {
    res.status(404).send('Error. Please check the path!');
});
