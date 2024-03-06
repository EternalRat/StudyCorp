import express from "express";
import admin from "./admin";
import auth from "./auth";
import blacklist from "./blacklist";
import warns from "./warns";
import ticket from "./ticket";
import user from "./user";
const router = express.Router();

router.use('/admin', admin);
router.use('/auth', auth);
router.use('/blacklist', blacklist);
router.use('/warns', warns);
router.use('/ticket', ticket);
router.use('/user', user);

export default router;