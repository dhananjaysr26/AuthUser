import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport'
import { createRequire } from 'module';
import UserData from './models/users.js';
import NotesData from './models/notes.js';
const require = createRequire(import.meta.url);

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

// env configuration
dotenv.config()

// import appRouter from "./src/routes/appRouter.js";
const app = express();

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
        UserData.findOne({ user_id: profile.id }, async (err, doc) => {
            if (err) {
                return cb(err, null)
            }
            if (!doc) {
                const newUser = new UserData({
                    user_id: profile.id,
                    name: profile.displayName,
                    profile_pic_url: profile.photos[0].value
                })
                await newUser.save();
            }
        })
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
        // https://mynotes26.netlify.app/
        res.redirect('http://localhost:3000/');
    });
// Auth reqTwitter
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "/auth/twitter/callback"
},
    function (token, tokenSecret, profile, cb) {
        UserData.findOne({ user_id: profile.id }, async (err, doc) => {
            if (err) {
                return cb(err, null)
            }
            if (!doc) {
                const newUser = new UserData({
                    user_id: profile.id,
                    name: profile.displayName,
                    profile_pic_url: profile.photos[0].value
                })
                await newUser.save();
            }
        })
        cb(null, profile)
    }
));
app.get('/auth/twitter',
    passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        // https://mynotes26.netlify.app
        res.redirect('http://localhost:3000/');
    });

app.get("/getuser", (req, res) => {
    if (req.user) {
        res.send(req.user)
    } else {
        res.status(401).send("Un-Authorized Access!")
    }

})
app.get("/", (req, res) => {
    res.send("Hello MyNotes!")
})
app.post("/note/create", (req, res) => {
    if (req.user) {
        NotesData.findOne({ user_id: req.user.id }, async (err, doc) => {
            if (err) {
                return cb(err, null)
            }
            if (!doc) {
                const newNote = new NotesData({
                    user_id: req.user.id,
                    notes: [{
                        title: req.body.title,
                        note: req.body.note
                    }]
                })
                await newNote.save();
                res.status(200).send("Notes Created")
            } else {
                console.log("Adding New Value!")
                NotesData.findOneAndUpdate({
                    user_id: req.user.id
                }, {
                    $push: {
                        notes: [
                            {
                                title: req.body.title,
                                note: req.body.note

                            }
                        ]
                    }
                }, (err) => {
                    console.log(err)
                })
                res.status(200).send("Note Added!")

            }
        })
    } else {
        res.status(401).send("Un-Authorized Access!")
    }
})
app.get("/getnotes", (req, res) => {
    if (req.user) {
        NotesData.findOne({ user_id: req.user.id }, async (err, doc) => {
            if (err) {
                return cb(err, null)
            }
            if (doc) {
                res.status(200).send(doc)
            }
        })

    } else {
        res.status(401).send("Un-Authorized Access!")
    }
})

app.patch("/deletenote", (req, res) => {
    NotesData.updateOne({
        user_id: req.user.id
    }, {
        $pull: {
            notes: { _id: req.body.id }
        }
    }, (err, doc) => {
        if (err) {
            res.status(300).send(err)
        }
        if (doc) {
            res.status(200).send("Notes Deleted!")
        }
    })
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

app.listen(process.env.PORT || 5000, () => console.log(`Server Running on PORT:${process.env.PORT || 5000}`))
// app.use(appRouter);




