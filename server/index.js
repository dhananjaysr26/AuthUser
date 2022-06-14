import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

// env configuration
dotenv.config()

// import appRouter from "./src/routes/appRouter.js";
const app = express();
const PORT = process.env.PORT;


app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,

}));

app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    return done(null, user)
})
passport.deserializeUser((user, done) => {
    return done(null, user)
})
// 
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        // this will call on successful login
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });
        console.log(profile)
        cb(null, profile)
    }
));
//Auth reqGoogle
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3000/');
    });
// Auth reqTwitter
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "/auth/twitter/callback"
},
    function (token, tokenSecret, profile, cb) {
        console.log(profile)
        cb(null, profile)
    }
));
app.get('/auth/twitter',
    passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3000/');
    });

app.get("/getuser", (req, res) => {
    res.send(req.user)
})
app.post("/logout", (req, res) => {
    if (req.user) {
        req.logout((err) => {
            if (err) {
                return err;
            }
            res.send("Successfully Logout!")
        });

    }
})
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`DB Connected!\n`))
    .catch((err) => console.log(err.message))

app.listen(PORT, () => console.log(`Server Running on PORT:${PORT}`))
// app.use(appRouter);




