const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const Profile = require('../models/profiles');
if (!(process.env.NODE_ENV === "production")) {
    require('dotenv').config();
}
const bcrypt = require('bcrypt');
const blacklist = require('./blacklist');
const whitelist = require('./whitelist');


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

        if (JSON.parse(blacklist).includes(profile._json.email)) {    // blacklist
            return done(null, false, { message: 'Banned!' });
        }

        if (!profile._json.email.endsWith('bits-pilani.ac.in') && !JSON.parse(whitelist).includes(profile._json.email)) {     // non bits email and not in whitelist
            return done(null, false, { message: 'Must use BITS email' });
        }  

        Profile.findOne({
            $and: [
                { googleId: profile.id },
                { rank: { $not: { $elemMatch: { $eq: "deleted" } } } }
            ]
        }).then((existingProfile) => {

            if(existingProfile) {                                                // existing profile
                if (existingProfile.rank.includes('ban')) {                      // if banned user
                    return done(null, false, { message: 'Banned!' });
                }
                return done(null, existingProfile);
            }                                                   
            
            // new bits email
            Promise.all([
                Profile.countDocuments({})
            ]).then(([count]) => {
                new Profile({
                    // email: profile._json.email,
                    googleId: profile.id,
                    rank: ['user'],
                    created: new Date(),
                    index: count
                }).save().then((newProfile) => {
                    return done(null, newProfile);
                });
            });

        });
    })
);

passport.use(new LocalStrategy(
    (username, password, done) => {
        if (username.toString() === 'guest' && password.toString() === 'guest') {
            Profile.findById(process.env.guestId).then((guestProfile) => {
                done(null, guestProfile);
            });
        } else {
            done(null, false);
        }
    })
);