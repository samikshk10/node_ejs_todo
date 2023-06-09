const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/", (req, res) => {
    res.render("login");
});


router.post("/auth", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {

        req.conn.query("SELECT * FROM users where username=$1 AND password=$2", [username, password], (error, result) => {
            if (error) {
                return res.status(500).send("Error in displaying data")
            }
            if (result.rows.length > 0) {
                req.session.isLoggedin = true;
                req.session.username = username;
                console.log(result.rows[0].id);
                req.session.userid = result.rows[0].id;
                return res.redirect("/todo");

            } else {
                return res.send('incorrect username and password')
            }
        })

    }
});