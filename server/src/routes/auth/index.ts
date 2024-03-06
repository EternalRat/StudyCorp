import express from "express";
import passport from 'passport';
const router = express.Router();

router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', { 
    failureRedirect: 'http://localhost:3000/forbidden',
    successRedirect: 'http://localhost:3000/blacklist'
}));
router.get('/logout', (req: any, res: any) => {
    if(req.user) {
        req.logout();
        res.sendStatus(200);
    } else {
        res.status(401).send('Not logged in');
    }
});

export default router;