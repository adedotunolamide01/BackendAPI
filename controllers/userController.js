//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
import asyncHandler from 'express-async-handler';

//Require axios to make API calls
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const accessKey = process.env.UNSPLASH_ACCESS_KEY;
const perPage = 20;

export const getAllUser = asyncHandler(async (req, res) => {
  try {
    //fetching from the api
    const { data } = await axios.get('https://api.unsplash.com/photos/users', {
      params: {
        client_id: `${accessKey}`,
        per_page: `${perPage}`,
      },
    });

    const users = data.map((user) => ({
      id: user.id,
      username: user.username,
      description: user.description,
      raw: user.urls.raw,
    }));
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Define route handler function
export const getUserPhotos = asyncHandler(async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch photos from Unsplash API
    const { data } = await axios.get(
      `https://api.unsplash.com/users/${username}/photos`,
      {
        params: {
          client_id: `${accessKey}`,
          per_page: `${perPage}`,
        },
      }
    );

    // Map photo data
    const photos = data.map((photo) => ({
      id: photo.id,
      username: photo.user.username,
      description: photo.description || 'No description provided.',
      url: photo.urls.raw,
    }));

    // Send response with array of photo data
    res.status(200).json(photos);
  } catch (error) {
    const { data } = error.response;
    res.status(error.response.status).json({ message: data.message });
  }
});
