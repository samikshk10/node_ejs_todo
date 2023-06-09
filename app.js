//require
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const getconnection = require("./config/db");
const helmet = require("helmet");
const session = require("express-session");
const loginRouter = require('./routes/login.route');
const todoRoutes = require("./routes/todo.routes")
const signupRouter = require("./routes/signup.routes")
const logoutRouter = require("./routes/logout.routes")
const flash = require("connect-flash");



//init process
dotenv.config();
const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({
    extended: true
}));
const conn = getconnection();
//middleware
app.use((req, res, next) => {
    req.conn = conn;
    console.log("middle ware call");
    next();

})
app.use(express.static(__dirname + '/public'));


app.use(
    session({
        name: "auth-session",
        secret: "secret-key",
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        },
        resave: false,
    })
);

app.use(flash());


app.set("view engine", 'ejs');
const APP_PORT = process.env.PORT || 3000;

//routes
app.use('/login', loginRouter);
app.use("/todo", todoRoutes);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);

//server activation
app.listen(APP_PORT, () => {
    console.log("listening on port:" + APP_PORT);
});