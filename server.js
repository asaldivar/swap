const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

// require environment variables
// and append to process.env
require('dotenv').config({ path: 'variables.env' })

// parse requests and append as properties to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '200kb', extended: true }));

// exposes methods for validating data
// heavily used on userController.validateRegister
app.use(expressValidator())

// connect to db
mongoose.connect(process.env.DATABASE)
mongoose.connection.on('error', (err) => {
	console.error(`👿 👿 👿 -> ${err.message}`)
})

// import models
require('./models/Vendor')
require('./models/Swap')

// app.use(session({
// 	secret: 'secet',
// 	key: 'secretkey',
//   resave: false,
//   saveUninitialized: false,
//   store: new MongoStore({ mongooseConnection: mongoose.connection })
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// require('./handlers/passport')

// implement routes
require('./routes/index')(app)

// start server
app.set('port', process.env.PORT || 8080)
const server = app.listen(app.get('port'), () => {
	console.log(`Express running -> PORT ${server.address().port}`)
})