const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');

// Define the Local Signup Strategy
passport.use('local-signup', new LocalStrategy({
    // Customize field names if needed
    usernameField: 'email', // Assuming email is used for signup
    passwordField: 'password',
    passReqToCallback: true // Allows us to access req in the callback
}, async (req, email, password, done) => {
    try {
        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return done(null, false, { message: 'Email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new User({
            email,
            password: hashedPassword // Save the hashed password
            // Add other user properties if needed
        });

        // Save the new user
        await newUser.save();

        // Pass the new user to the next middleware or route handler
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
}));
