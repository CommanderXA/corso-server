const https = require("https");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const passport = require("passport");
const mongoose = require("mongoose");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const express = require("express");
const app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Load config
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport);

// Sessions
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

const connectDB = require("./config/db");

const cors = require("cors");
const bodyParser = require("body-parser");

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
const routes = require("./routes/index")(app);
routes

// Connect to MongoDB
connectDB();

// SSL self generated certificate
const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert','cert.pem'))
    },
    app
)

const port = process.env.PORT;
sslServer.listen(port, () => console.log(`Secure Server is running in ${process.env.NODE_ENV} mode on port ${port}`));
// app.listen(port, () => console.log('Running'));