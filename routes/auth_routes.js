const router = require('express').Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google',{
    scope: ['profile','email']
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google' }), (req, res) => {
    res.redirect('/');
});

router.post('/guest', passport.authenticate('local'));

module.exports = router;