import express from "express";
import vwarns from '../../models/vwarns';
import dusers from '../../models/DiscordUser';
import warns from '../../models/warns';
const router = express.Router();

function isAuthorized(req: any, res: any, next: any) {
    if(req.user) {
        if(req.user.discordId != '251698679059054593' && req.user.discordId != '1024224180218118164') {
            console.log("Tentative acces panel admin.");
            res.status(403).send('Can\'t access to panel admin');
            return;
        }
        console.log("User is logged in.");
        next();
    }
    else {
        console.log("User is not logged in.");
        res.status(401).send('Not logged in');
    }
}

router.get('/', isAuthorized, async (req: any, res: any) => {
    const dUsers = await dusers.find();
    const wUsers = await warns.find();
    const vUsers = await vwarns.find();
    res.send({
        vwList: vUsers,
        dUsers: dUsers,
        wUsers: wUsers
    });
});

router.get("/isAdmin", isAuthorized, (req: any, res: any) => {
    res.sendStatus(200);
});

router.get('/settings', isAuthorized, (req: any, res: any) => {
    res.send(200);
});

export default router;