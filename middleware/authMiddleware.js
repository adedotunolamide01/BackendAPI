// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
// import User from '../models/userModel.js';
// import dotenv from 'dotenv';
// dotenv.config();

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer ')
//   ) {
//     try {
//       console.log('req:', req.headers);
//       // get token from header
//       const token = req.headers.authorization.split(' ')[1];

//       console.log('jwt:', token);
//       //verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       console.log('deceoded:', decoded);
//       // get user from the token
//       req.user = await User.findById(decoded.id).select('-password');
//       console.log('req.user:', req.user);

//       next();
//     } catch (error) {
//       console.log(error);
//       res.status(401);
//       throw new Error('Not authorized');
//     }
//   }
//   if (!token) {
//     res.status(401);
//     throw new Error('Not authorized, no token');
//   }
// });

// export { protect };

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      console.log('req:', req.headers);
      // get token from header
      token = req.headers.authorization.split(' ')[1];

      console.log('jwt:', process.env.JWT_SECRET);
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log('deceoded:', decoded);
      // get user from the token
      const user = await User.findById(decoded.id).select('-password');
      console.log('user:', user);

      if (!user) {
        res.status(401);
        throw new Error('Not authorized');
      }

      // set the user on the request object
      req.user = user;

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
