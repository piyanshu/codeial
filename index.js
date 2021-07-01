const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session')
const passport = require('passport');
const passportLocal = require('./config/passprt-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(expressLayouts);

// extract styles and scripts from subpages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// Use express router 
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});
