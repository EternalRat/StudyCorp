import express from "express";
import getPermissions from '../../utils/utils';
import vwarns from '../../models/vwarns';
const router = express.Router();

function isAuthorized(req: any, res: any, next: any) {
    if(req.user) {
        console.log("User is logged in.");
        next();
    }
    else {
        console.log("User is not logged in.");
        res.status(401).send('Not logged in');
    }
}

router.get('/', isAuthorized, async (req: any, res: any) => {
    const models = await vwarns.find({userId: req.user.discordId})
    var test = models.length;
    if(test === 0){
        res.send({
            vw: null
        });
    } else {
        res.send({
            vw: models
        });
    }
});

router.get('/settings', isAuthorized, (req, res) => {
    res.send(200);
});

export default router;