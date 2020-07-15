const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const Profile = require('../models/profiles');
if (!(process.env.NODE_ENV === "production")) {
    require('dotenv').config();
}
const bcrypt = require('bcrypt');
const blacklist = require('./blacklist');


passport.serializeUser((currentProfile, done) => {
    done(null, currentProfile.id);
});

passport.deserializeUser((id, done) => {
    Profile.findById(id).then((currentProfile) => {
        done(null, currentProfile);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.google_clientID,
    clientSecret: process.env.google_clientSecret,
    callbackURL: "/auth/google/callback"
    }, (accessToken, refreshToken, profile, done) => {
        Profile.findOne({googleId: profile.id}).then((existingProfile) => {
            if(existingProfile) {                                                // existing profile
                done(null, existingProfile);
            } else if (JSON.parse(blacklist).includes(profile._json.email)) {    // blacklisted profile                                                     // blacklist
                done(null, false);
            } else if (!profile._json.email.endsWith('bits-pilani.ac.in')) {     // non bits email
                done(null, false);
            } else {                                                             // new bits email
                new Profile({
                    email: profile._json.email,
                    googleId: profile.id,
                    name: 'Anon',
                    rank: ['user'],
                    created: new Date()
                    // hashedId: bcrypt.hashSync(profile._json.email, '/'+profile.id.toString())
                }).save().then((newProfile) => {
                    done(null, newProfile);
                });
            }
        });
    })
);

passport.use(new LocalStrategy(
    (username, password, done) => {
        if (username.toString() === 'guest' && password.toString() === 'guest') {
            Profile.findById('5eff20cf1851860f724d3217').then(
                (guestProfile) => { done(null, guestProfile); }
            );
        } else {
            done(null, false);
        }
    })
);