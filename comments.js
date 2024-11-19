// create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});

// create server
var server = app.listen(8081, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server is listening at http://%s:%s', host, port);
});

// get request
app.get('/comments', function(req, res){
    fs.readFile(__dirname + '/' + 'comments.json', 'utf8', function(err, data){
        if(err){
            console.log(err);
        }else{
            console.log(data);
            res.end(data);
        }
    });
});

// post request
app.post('/comments', urlencodedParser, function(req, res){
    var comment = {
        name: req.body.name,
        comment: req.body.comment
    };
    fs.readFile(__dirname + '/' + 'comments.json', 'utf8', function(err, data){
        if(err){
            console.log(err);
        }else{
            data = JSON.parse(data);
            data.push(comment);
            fs.writeFile(__dirname + '/' + 'comments.json', JSON.stringify(data), function(err){
                if(err){
                    console.log(err);
                }else{
                    res.end(JSON.stringify(data));
                }
            });
        }
    });
});