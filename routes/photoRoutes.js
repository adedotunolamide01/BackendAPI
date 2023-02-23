import express from 'express';
const router = express.Router();
import {
  getPhotoRoutes,
  getPhotoByIdRoute,
  getUserPhotos,
  getAllUser,
} from '../controllers/photoController.js';

router.route('/').get(getPhotoRoutes);
router.route('/:id').get(getPhotoByIdRoute);
router.route('/:username').get(getUserPhotos);
router.route('/').get(getAllUser);

export default router;
