//Require axios to make API calls
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const accessKey = process.env.UNSPLASH_ACCESS_KEY;

const perPage = 10;
const orderBy = 'popular';

export const getPhotoRoutes = async (req, res) => {
  try {
    //fetching from the api
    const { data } = await axios.get(
      `https://api.unsplash.com/photos?client_id=${accessKey}&per_page=${perPage}&order_by=${orderBy}`
    );
    console.log(data);
    // const urls = data.map((photo) => photo.urls.raw);
    const urlsAndIds = data.map((photo) => ({
      id: photo.id,
      raw: photo.urls.raw,
    }));
    res.status(200).json(urlsAndIds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// module.exports = { getPhotoRoutes };

export const getPhotoByIdRoute = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/${req.params.id}?client_id=${accessKey}`
    );

    const data = response.data;

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
