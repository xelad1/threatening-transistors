var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var db = require('../config.js');
var User = require('../models/user.js') // find this

// expose this function to our app using module.exports
module.exports = function(passport) {
    // passport session setup 
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // LOCAL SIGNUP 
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error

            if (err) {return done(err);}
            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, {message: 'That email is already taken.'});
            } else {
                // if there is no user with that email
                // create the user
                var newUser = new User();
                // set the user's local credentials
                newUser.name = req.body.name;
                newUser.email = email;
                newUser.password = User.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    req.session.name = newUser.name;
                    req.session.email = newUser.email;
                    
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

    // LOCAL LOGIN 
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
      
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            console.log(User)
            if (err) {return done(err);}

            // if no user is found, return the message
            if (!user){
                return done(null, false, {message: 'Wrong username or password'}); // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            if (!User.validPassword.call(user,password)) {
                return done(null, false, {message: 'Wrong username or password'}); // create the loginMessage and save it to session as flashdata
            }
            
            // all is well, return successful user
            req.session.name = user.name;
            req.session.email = user.email

            return done(null, user);
        });

    }));

};
