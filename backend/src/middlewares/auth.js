import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { asyncHandler } from "./../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const isAuthenticated = asyncHandler(async (req, res, next)=> {
    
    const { token } = req.cookies;
    
    if(!req.cookies) return next(new ErrorHandler("Not Logged In", 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
});