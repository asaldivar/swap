const passport = require('passport')
const mongoose = require('mongoose')
const Spectator = mongoose.model('Spectator')

passport.use(Spectator.createStrategy())

passport.serializeUser(Spectator.serializeUser())
passport.deserializeUser(Spectator.deserializeUser())