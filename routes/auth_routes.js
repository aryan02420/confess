const router = require('express').Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google',{
    scope: ['profile','email']
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/', failureFlash: true }), (req, res) => {
    const redirectTo = req.session.redirectTo || '/';
    delete req.session.redirectTo;
    res.redirect(redirectTo);
});

router.post('/guest', passport.authenticate('local', { failureRedirect: '/', failureFlash: true }), (req, res) => {
    const redirectTo = req.session.redirectTo || '/';   // same redirection as above but doesnot work
    delete req.session.redirectTo;                      
    res.status(422);
    res.json({redirectTo: `${redirectTo}`});            // send redirect path to client an let them handle it
});

module.exports = router;