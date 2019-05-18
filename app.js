var app = require('express')();
var http = require('http').Server(app);
var express = require("express"); 
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var Todo = require("./models/new");

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/todo");

app.get('/', function(req, res) {
    getToDos(function(todos){
        res.render("index", {data: todos});        
    });
});

app.get("/index", function(req, res){
   res.redirect('/');
})

// CREATE NEW TASK
app.post('/', function(req, res){
      var item = req.body.todo;
      console.log(item);
      Todo.create({task: item}, function(err, newToDo){
         if(err){
            console.log(err);
         } else {
         // then, redirect to the index
            getToDos(function(todos){
                console.log('res.json');
                res.json(['Success', {todos}]);        
            });
         }
      });
});


// DELETE ROUTE
app.post('/:id/', function(req, res){
    console.log(req.body.id)
      var item = req.body.id;
      Todo.findByIdAndDelete(item, function(err, newToDo){
         if(err){
            console.log(err);
         } else {
         // then, redirect to the index
            console.log("deleting")
            res.redirect("index");
         }
      });
});

// EDIT TASK STATUS ROUTE
app.put('/:id/', function(req, res){
    console.log("EDIT ITEM")
    console.log(req.params.id);
    console.log(req.body)
    
    Todo.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, foundTask){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            console.log("tasks updated in DB")
                getToDos(function(todos){
                    console.log('res.json');
                    res.json(['Success', {todos}]);        
                });
        }
    });
});

http.listen(1024, function() {
   console.log('listening on *:3000');
});


function getToDos(callback){
    Todo.find({}).sort({completed: 1, created: -1}).exec (function(err, todos){
        if(err){
            console.log(err);
        } else {
            callback(todos);
        }
    });
}
