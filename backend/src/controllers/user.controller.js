import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/user.model.js";
import { sendToken } from "../utils/sendToken.js";

const register = asyncHandler(async (req, res, next) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return next(new ErrorHandler("Enter all fields", 400));

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already exist", 409));


    user = await User.create({
        name,
        email,
        password,
    })

    sendToken(res, user, "Registered Successfully.", 201);
});

const login = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password)
        return next(new ErrorHandler("Please enter Email and Password", 400));

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("User does't exist", 401));

    const isMatch = await user.comparePassword(password);

    if (!isMatch)
        return next(new ErrorHandler("Invalid Email or Password", 401));

    sendToken(res, user, `Welcome Back, ${user._id}`, 201);
});

const logout = asyncHandler(async (req, res, next)=> {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true, 
        sameSite: "none",
    }).json({
        success: true,
        message: "Logout Successfully."
    })
});

const getprofile = asyncHandler(async (req, res, next)=> {
    
    const user = await User.findById(req.user._id);
    
    res.status(200).json({
        success: true,
        user,
    });
})

const uploadresume = asyncHandler(async (req, res, next)=> {
    
    // const file = req.file;
    // const user = await User.findById(req.user._id);
    // const fileUri = getDataUri(file);
    // const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
    
    // if(user.photo.public_id)
    //     await cloudinary.v2.uploader.destroy(user.photo.public_id);

    // user.photo = {
    //     public_id: mycloud.public_id,
    //     url: mycloud.secure_url,
    // }
    // user.save();
    // res.status(200).json({
    //     success: true,
    //     message: "Profile Picture Updated Successfully."
    // });
})

export { register, login, logout, getprofile, uploadresume };