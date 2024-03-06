import express from "express";
import blacklist from '../../models/blacklist';
const router = express.Router();

function isAuthorized(req: any, res: any, next: any) {
    if(req.user) {
        console.log("User is logged in.");
        next();
    } else {
        console.log("User is not logged in.");
        res.status(401).send('Not logged in');
    }
}

router.get('/', isAuthorized, async (req: any, res: any) => {
    const blacklists = await blacklist.find();
    res.send({
        blacklistedUser: blacklists
    });
});

router.get('/settings', isAuthorized, (req: any, res: any) => {
    res.send(200);
});

export default router;