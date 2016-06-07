var express = require('express');
var app = express();
var PORT = process.env.PORT ||3000;

var todos = [{
	id: 1,
	description: "Meet mom for lunch",
	completed: false
}, {
	id: 2,
	description: "Go to market",
	completed: false
},{
	id: 3,
	description: "Feed the cat",
	completed: true
}];


app.get('/', function (req, res)  {
	res.send('Todo API Root');

});

app.get('/todos', function(req,res) {
	res.json(todos);
});

app.get('/todos/:id', function (req,res) {
	var todoId = parseInt(req.params.id,10);     //any request parameter is always a string
	var matchedTodo;
	for (var i = 0; i < todos.length; i++  )  {
		if (todos[i].id === todoId) {
			matchedTodo = todos[i];
		}
	}

	if ( typeof matchedTodo === 'undefined' ) {
		res.status(404).send();
	} else {
		res.json(matchedTodo);
	}
	// res.send("Asking for todo with id of " + req.params.id);
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});










