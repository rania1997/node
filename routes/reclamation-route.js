import express from 'express';

import {  add,getAll } from '../controllers/reclamation-controller.js';
import {authenticateToken} from '../configuration/auth.js';
// import multer from '../middlewares/muter-config.js';
const router = express.Router();

router.route('/').get(getAll).post(
    // multer,
    authenticateToken,add);


export default router;