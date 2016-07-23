// require packages
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('todosdb', ['todos']);
var url = 'mongodb://localhost:27017/todosdb'

// get all todos
router.get('/todos', function(req, res, next) {
	db.todos.find(function(err, todos) {
		if (err) {
			res.send(err);
		} else {
			res.json(todos);
		}
	});
});

// get one todo with ID
router.get('/todo/:id', function(req, res, next) {
	db.todos.findOne({
		_id: mongojs.ObjectId(req.params.id)
	}, function(err, todos) {
		if (err) {
			res.send(err);
		} else {
			res.json.todos;
		}
	});
});

// post a todo to the database
router.post('/todo', function(req, res, next) {
	var todo = req.body;
	if (!todo.text || !(todo.isCompleted + '')) {
		res.status(400);
		res.json({"error": "Invalid data"});
	} else {
		db.todos.save(todo, function(err, result) {
			if (err) {
				res.send(err);
			} else {
				res.json(result);
			}
		});
	}
});

// put a todo (update)
router.put('/todo/:id', function(req, res, next) {
	var todo = req.body;
	var updObj = {};
	if (todo.isCompleted) {
		updObj.isCompleted = todo.isCompleted;
	}
	if (todo.text) {
		updObj.text = todo.text;
	}
	if (!updObj) {
		res.status(400);
		res.json({"error": "Invalid Data"});
	} else {
		db.todos.update({
			_id: mongojs.ObjectId(req.params.id)
		}, updObj, {}, function(err, result) {
			if (err) {
				res.send(err);
			} else {
				res.json(result);
			}
		});
	}
});

// delete a todo
router.delete('/todo/:id', function(req, res) {
	db.todos.remove({
		_id: mongojs.ObjectId(req.params.id)
	}, '', function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.json(result);
		}
	});
});

module.exports = router;

