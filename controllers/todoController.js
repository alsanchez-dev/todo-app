var bodyParser = require('body-parser')
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:testing7@ds141812.mlab.com:41812/todo');


//Create schema -think is like a blueprint

var todoSchema = new mongoose.Schema({item: String});


var Todo = mongoose.model('Todo', todoSchema);



// var data = [{item:'get milk'},{item:'Feed the Boshka'}, {item:'Learn node JS for living'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){

// get data from mongodb and pass it to the view
    Todo.find({}, function(err, data){
        if(err) throw err;
        res.render('todo', {todo: data});
    });


});

app.post('/todo', urlencodedParser, function(req, res){
// get data from the view and add it to mongodb
var newTodo = Todo(req.body).save(function(err, data){

if(err) throw err;
res.json(data);

})


});

app.delete('/todo/:item', function(req, res){

    //delete the requsted item from mongodb

    Todo.find({item: req.params.item.replace(/\-/g, " ")} ).remove(function(err, data){


    if(err) throw err;
    res.json(data);
    });
});

}
