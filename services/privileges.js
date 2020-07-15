const allow = (rank) => {
    return (req, res, next) => {
        if (!req.user) {
            res.redirect('/auth/google');
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