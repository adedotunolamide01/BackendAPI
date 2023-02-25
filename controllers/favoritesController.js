//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import asyncHandler from 'express-async-handler';
import FavoritePhoto from '../models/favoritePhotoModel.js';

const accessKey = process.env.UNSPLASH_ACCESS_KEY;
const perPage = 10;
const orderBy = 'popular';

// export const getFavoritePhotos = asyncHandler(async (req, res) => {
//   try {
//     //fetching from the api
//     const { data } = await axios.get(
//       `https://api.unsplash.com/photos?client_id=${accessKey}&per_page=${perPage}&order_by=${orderBy}`
//     );

//     console.log(data);
//     const urlsAndIds = data.map((photo) => ({
//       id: photo.id,
//       raw: photo.urls.raw,
//     }));
//     res.status(200).json(urlsAndIds);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// });

export const getFavoritePhoto = asyncHandler(async (req, res) => {
  const photos = await FavoritePhoto.find({ user: req.user.id });
  res.json(photos);
});

export const addFavoritePhoto = asyncHandler(async (req, res) => {
  const { url, description, username, reason } = req.body;
  const photo = await FavoritePhoto.create({
    user: req.user.id,
    url,
    description,
    username,
    reason,
  });
  res.status(201).json(photo);
});

export const deleteFavoritePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const photo = await FavoritePhoto.findById(id);
  if (!photo) {
    res.status(404).json({ message: 'Photo not found' });
    return;
  }
  if (photo.user.toString() !== req.user.id) {
    res
      .status(401)
      .json({ message: 'You are not authorized to delete this photo' });
    return;
  }
  await photo.remove();
  res.json({ message: 'Photo removed successfully' });
});

export const editFavoritePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  const photo = await FavoritePhoto.findById(id);
  if (!photo) {
    res.status(404).json({ message: 'Photo not found' });
    return;
  }
  if (photo.user.toString() !== req.user.id) {
    res
      .status(401)
      .json({ message: 'You are not authorized to edit this photo' });
    return;
  }
  photo.reason = reason;
  await photo.save();
  res.json(photo);
});
