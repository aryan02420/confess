const express = require('express')
const app = express();
// const cors = require('cors');
const bodyParser = require('body-parser');
// const multer = require('multer');
// const upload = multer();
const authRoutes = require('./routes/auth_routes');
const apiRoutes = require('./routes/api_routes');
const postRoutes = require('./routes/post_routes');
const passport = require('passport');
require('./services/passport_setup');
const cookieSession = require('cookie-session');
require('./services/mongoose_setup');
if (!(process.env.NODE_ENV === "production")) {
    require('dotenv').config();
}
const {allow, deny} = require('./services/privileges');
const slowDown = require("express-slow-down");
const port = process.env.PORT;


app.use(express.static('public'));
app.set('view engine', 'ejs');
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: "1mb" }))
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true, parameterLimit: 5 }))

app.use(cookieSession({
    maxAge: 10 * 60 * 1000,      // 10 minutes
    keys: [
        process.env.cookieKey1,
        process.env.cookieKey2,
        process.env.cookieKey3,
        process.env.cookieKey4
    ],
    httpOnly: true,
    sameSite: 'lax'
}));

// Update a value in the cookie so that the set-cookie will be sent.
// Only changes every minute so that it's not sent with every request.
// used for extending the session expiration.
app.use((req, res, next) => {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
    next();
});

app.use(passport.initialize());
app.use(passport.session());

const speedLimiter = slowDown({
    windowMs: 1 * 60 * 1000, // 1 minutes
    delayAfter: 20, // allow 30 requests to go at full-speed, then...
    delayMs: 1000 // 31st request has a 1s delay, 32nd has a 2s delay, 33rd gets 3s, etc.
});


app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/chat', (req, res) => {
    res.render('chat');
});
app.use('/api', speedLimiter, apiRoutes);

app.use(speedLimiter, (req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => {
   console.log(`Hosted at http://localhost:${port}`)
});