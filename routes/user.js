import express from 'express';

import { getAll, signUp, signIn, getOnce, 
putOnce, patchOnce, deleteOnce } from '../controllers/user.js';
import {authenticateToken} from '../configuration/auth.js';
// import multer from '../middlewares/muter-config.js';
const router = express.Router();

router.route('/').get(authenticateToken,getAll).post(
    // multer,
    signUp);

router.route('/signin').post(signIn);
router.route('/signup').post(signUp);

router.route('/:nom').get(authenticateToken,getOnce).put(putOnce)
.patch(patchOnce).delete(deleteOnce);

export default router;