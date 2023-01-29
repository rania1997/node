import express from 'express';

import { getAll, add } from '../controllers/garage-controller.js';
import {authenticateToken} from '../configuration/auth.js';
// import multer from '../middlewares/muter-config.js';
const router = express.Router();

router.route('/').get(authenticateToken,getAll).post(
    // multer,
    authenticateToken,add);


export default router;