const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/", (req, res) => {
    res.render("signup");
});

router.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    req.conn.query("INSERT into users (username,password) values ($1,$2)", [username, password], (error, result) => {
        if (error) {

            res.status(500).send("Error inserting todo data");
        }
        req.session.isLoggedin = true;
        return res.redirect('/todo');

    })

})