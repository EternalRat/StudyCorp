require('./strategies/discordstrategy');
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import './database';
import * as config from "./config.json";
import mongoose from 'mongoose';
import api from './routes';
import connectMongo from 'connect-mongo';
import cors from 'cors';
const MongoStore = connectMongo(session);
const app = express();
// Routes

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
  }));

app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    resave: false,
    name: 'discord.oauth2',
    store: new MongoStore({ mongooseConnection:  mongoose.connection })
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use('/api', api)

app.listen(config.PORT, () => console.log(`Now listening to requests on port ${config.PORT}`));