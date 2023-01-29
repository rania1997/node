import express from 'express';

import {getAll, add} from "../controllers/car-controller.js"
const router = express.Router();

router.route("/")
    .get(getAll)
    
router.route('/getAll').get(getAll);
router.route('/add').post(add);


export default router;