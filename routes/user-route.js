import express from 'express';

const router = express.Router()
import {motDePasseOublie, changerMotDePasse} from "../controllers/user-controller.js"

router.post("/motDePasseOublie", motDePasseOublie)

router.put("/changerMotDePasse", changerMotDePasse)


export default router;