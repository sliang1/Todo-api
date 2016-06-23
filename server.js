var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT ||3000;

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());


app.get('/', function (req, res)  {
	res.send('Todo API Root');

});

// GET /todos
app.get('/todos', function(req,res) {
	res.json(todos);
});

// GET /todos/:id

app.get('/todos/:id', function (req,res) {
	var todoId = parseInt(req.params.id,10);     //any request parameter is always a string
	var matchedTodo = _.findWhere(todos, {id: todoId});

    // var matchedTodo;
	// for (var i = 0; i < todos.length; i++  )  {
	// 	if (todos[i].id === todoId) {
	// 		matchedTodo = todos[i];
	// 	}
	// }

	if ( typeof matchedTodo === 'undefined' ) {
		res.status(404).send();
	} else {
		res.json(matchedTodo);
	}
	// res.send("Asking for todo with id of " + req.params.id);
});

//POST /todos/:id

app.post('/todos', function (req,res) {
     var body = req.body;
     
     body = _.pick(body, 'description', 'completed');


     if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length ===0) {
     	return res.status(400).send();
     } 


     body.description = body.description.trim();
     body.id = todoNextId++;

     todos.push(body);

     res.json(body);

});



app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});

var test;

if(test) {
	console.log('todo is there');
} else {
	console.log('false');
}










