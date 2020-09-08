const allow = (rank) => {
    return (req, res, next) => {
        if (!req.user) {
            // save current url to be use later after authenticated
            req.session.redirectTo = req.originalUrl.toString();
            req.flash('info', `Sign in to access ${req.originalUrl.toString()}`)
            res.redirect('/');
        } else if (JSON.stringify(rank.filter(value => req.user.rank.includes(value)))=='[]') {
            res.status(401).render('401');
        } else {
            next();
        }
    }
}

const deny = (rank) => {
    return (req, res, next) => {
        if(req.user.rank.includes(rank)){
            res.status(401).render('401');
        } else {
            next();
        }
    }
}

module.exports = {allow, deny};