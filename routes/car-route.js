import express from 'express';
import multer from 'multer';
import { getAll, add, deleteOnce } from "../controllers/car-controller.js"

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: function (request, file, callback) {
            callback(null, './uploads/images');
        },
        filename: function (request, file, callback) {
            callback(null, Date.now() + file.originalname);
        }
    })
})

router.route("/")
    .get(getAll)
    .post(upload.single("image"), add);

router.route('/delete/:_id').delete(deleteOnce);

export default router;