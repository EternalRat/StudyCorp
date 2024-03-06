import express from "express";
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

router.get('/', isAuthorized, (req: any, res: any) => {
    res.send({
        username: req.user.username,
        discordId: req.user.discordId,
        avatar: `https://cdn.discordapp.com/avatars/${req.user.discordId}/${req.user.avatar}.png`,
        email: req.user.email
    });
});

export default router;