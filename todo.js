var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');


// Create a new application.
        var app = express();

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'todos'
        });

        connection.connect(function(err) {
            if (!err) {
                console.log("Database is connected ...");
            } else {
                console.log("Error connecting database ...");
            }
        });

        // Use JSON body parser middleware
        app.use(bodyParser.json());

        //  GET request
        app.get('/todo', function(req, res) {
             var id = req.params.id;
            connection.query('select id, name, done from todos', id, function(err, rows, fields) {
                res.json(rows)
                res.end();
            });
        });

        //  POST request 
        app.post('/todo', function(req, res) {
             var todo = req.body;
            connection.query('insert into todos set ?', todo, function(err, rows, fields) {
                res.json(rows)
                res.end();
            });
        });

        //  PUT request 
        app.put('/todo', function(req, res) {
             var id = req.params.id;
            connection.query('update todos set ? where id = ?' , id, function(err, rows, fields) {
                res.json(rows)
                res.end();
            });
        });

        //  DELETE request
        app.delete('/todo', function(req, res) {
             var id = req.params.id;
            connection.query('delete from todos where id = ?', id, function(err, rows, fields) {
                res.json(rows)
                res.end();
            });
        });

        function sendError(res, code, message) {
            res.statusCode = code;
            res.json({
                error: message
            });
            res.end();
        }


// Start the server
        app.listen(8888);