import express from 'express';
const router = express.Router();
import { getUserPhotos } from '../controllers/userController.js';
import { getAllUser } from '../controllers/userController.js';

router.route('/:username').get(getUserPhotos);
router.route('/').get(getAllUser);
export default router;
