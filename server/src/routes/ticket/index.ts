import express from "express";
import getPermissions from '../../utils/utils';
import ticket from '../../models/ticket';
import ticketMessages from '../../models/ticketMessages';
const router = express.Router();

function isAuthorized(req: any, res: any, next: any) {
    if (req.user) {
        console.log("User is logged in.");
        next();
    }
    else {
        console.log("User is not logged in.");
        res.status(401).send('Not logged in');
    }
}

router.get('/', isAuthorized, async (req: any, res: any) => {
    if (req.user.discordId === '251698679059054593' || req.user.discordId === '1024224180218118164') {
        const t = await ticket.find();
        res.send({
            t
        });
    } else {
        const t = await ticket.find({ pris: req.user.discordId });
        res.send({
            t
        });
    }
});

router.get('/:id', isAuthorized, async (req: any, res: any) => {
    const tm = await ticketMessages.find({idticket: req.params.id})
    res.send({
        tm
    })
});

router.get('/settings', isAuthorized, (req, res) => {
    res.send(200);
});

export default router;