const express = require('express');
require('dotenv');
const colors = require('colors');
const bodyParser = require('body-parser')
const app = express();

const PORT = process.env.PORT || 3003;
const path = require('path');
const middleware = require('./middleware');
const mongoose = require('./database');
const session = require('express-session')



app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`.yellow.bold.underline);
});
// View Engine
app.set('view engine', 'pug');
// set the views "folder" is the views 
app.set('views', 'views');

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
// Static Files
app.use(express.static(path.join(__dirname, "public")));

// session
app.use(session({
	secret: 'this session is mine man!',
	resave: true,
	saveUninitialized: false
}));

// Routes
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
app.use('/login',loginRoute);
app.use('/register',registerRoute);


app.get('/', middleware.requireLogin, (req, res, next) => {
	var payload = {
		pageTitle: 'Home',
		userLoggedIn: req.session.user,
	};
	res.status(200).render('home', payload);
	next();
});
