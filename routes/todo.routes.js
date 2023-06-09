const express = require('express');
const router = express.Router();
//export the router
module.exports = router;
router.get("/", (req, res) => {
    if (req.session.isLoggedin) {
        const {
            conn
        } = req;


        conn.query("SELECT * from todo where userid=$1", [req.session.userid], (error, result) => {
            if (error) {
                res.status(500).send("error");
            }
            res.render("index", {
                items: result.rows,
                username: req.session.username,
                msg: req.flash('msg', null)
            });
        })


    } else {
        res.redirect("/login");
    }
});

router.post("/add-todo", (req, res) => {
    const todo = req.body.title;
    req.conn.query("INSERT into todo (title,userid) values ($1,$2)", [todo, req.session.userid], (error, result) => {
        if (error) {

            req.flash('msg', 'error inserting todo');
            return res.redirect('/todo');
        } else {
            req.flash('msg', 'todo inserted successfully');
            return res.redirect('/todo');
        }

    })
});

router.post("/edit-todo/:id", (req, res) => {
    console.log("here");
    req.conn.query("Select * from todo where id=$1", [req.params.id], (error, result) => {
        if (error) {
            res.send("error data selection");
        }
        if (result.rowCount > 0) {
            res.render("edittodo", {
                items: result.rows
            });
        }
    })
})

router.post("/update-todo", (req, res) => {
    const id = parseInt(req.body.todoid);
    const title = req.body.title;
    req.conn.query("UPDATE todo set title=$1 where id=$2", [title, id], (error, result) => {
        if (error) {
            res.status(500).send("Error update todo")
        }
        result.rowCount > 0 ? req.flash('msg', 'Todo updated successfully') : req.flash("msg", 'no data found');
        res.redirect("/todo");

    })
});

router.post("/remove-todo/:id", (req, res) => {
    const id = parseInt(req.params.id)
    req.conn.query("DELETE from todo where id=$1", [id], (error, result) => {
        if (error) {
            res.status(500).send("Error deleting todo");

        }
        result.rowCount > 0 ? req.flash('msg', 'deleted successfully') : req.flash("msg", 'no data found');
        res.redirect('/todo');
    })
});




router.post('/complete-todo', (req, res) => {
    console.log('completed:' + req.body.complete);
    const todoId = parseInt(req.body.complete);


    res.redirect('/');
});