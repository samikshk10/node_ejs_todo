//require
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

//init process
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", 'ejs');
const APP_PORT = process.env.PORT || 3000;

//routes
app.get("/", (req, res) => {
    // res.status(200).send("Hello World");
    // res.send("Hello World");
    res.render("index", {
        items: todos
    });
});

let todos = [{
    task: 'go to college',
    completed: false
}, {
    task: 'cook your food',
    completed: false
}];
app.post("/add-todo", (req, res) => {
    // console.log("working");
    console.log(req.body);
    const todo = {
        task: req.body.todo,
        completed: false
    };
    todos.push(todo);
    res.redirect("/");
    res.end();
})
app.post("/remove-todo", (req, res) => {
    console.log(req.body.delete);
    todos.splice(req.body.delete, 1);
    res.redirect("/");
})

app.post('/complete', (req, res) => {
    console.log('completed:' + req.body.complete);
    const completeindex = parseInt(req.body.complete);
    todos[completeindex].completed = !todos[completeindex].completed;
    res.redirect('/');
});



//server activation
app.listen(APP_PORT, () => {
    console.log("listening on port:" + APP_PORT);
});