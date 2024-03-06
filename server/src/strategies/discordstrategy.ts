import discordPassport from "passport-discord";
import passport from 'passport';
import * as config from "../config.json";
import DiscordUser from '../models/DiscordUser';
const DiscordStrategy = discordPassport.Strategy;

passport.serializeUser((user: any, done: any) => {
    console.log("Serialize");
    done(null, user.id)
});

passport.deserializeUser(async (id: any, done: any) => {
    console.log("Deserializing");
    const user = await DiscordUser.findById(id);
    if(user) 
        done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: config.CLIENT_REDIRECT,
    scope: ['identify', 'guilds', 'email']
}, async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    console.log("test")
    try {
        const user = await DiscordUser.findOne({ discordId: profile.id });
        if(user)
        {
            console.log("User exists.");
            await user.updateOne({
                username: `${profile.username}`,
                tag: `${profile.username}#${profile.discriminator}`,
                email: profile.email,
                guilds: profile.guilds,
                avatar: profile.avatar
            });
            done(null, user);
        }
        else {
            console.log("User does not exist");
            const newUser = await DiscordUser.create({
                discordId: profile.id,
                username: profile.username,
                guilds: profile.guilds,
                avatar: profile.avatar,
                tag: profile.tag,
                email: profile.email
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    }
    catch(err) {
        console.log("🚀 ~ file: discordstrategy.ts:54 ~ err:", err);
        done(err, null);
    }
}));