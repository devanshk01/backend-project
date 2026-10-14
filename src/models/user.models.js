import bcrypt from "bcrypt"; // for password encryption hash functions.
import jwt from "jsonwebtoken"; // for access and refresh tokens.
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        password: {
            type: String, // encrypted
            required: [true, "Password is required."],
        },
        refreshToken: {
            type: String,
        },
    },
    {
        // for createdAt and updatedAt
        timestamps: true,
    }
);

// A mongoose hook: performs some function on some action on data.
// Example -- Pre() hook:
// DO NOT USE arrow functions as they don't have default this reference.
// Make them async because encryption takes time.
// This is mongoose middleware so use next.
userSchema.pre("save", async function (next) {
    // If password is not modified then we don't want to encrypt it everytime.
    if (!this.isModified("password")) return next();

    // 10 rounds of hashing.
    this.password = bcrypt.hash(this.password, 10);
    next();
});

// Similar to custom middlewares (hooks), we can write custom methods in mongoose for a schema.
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Access Token generation using JWT
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        // payload (data that should be contained in the access token)
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

// Refresh Token generation using JWT (has less payload)
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        // payload (data that should be contained in the refresh token)
        {
            _id: this._id,
        },
        process.env.REFERSH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFERSH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model("User", userSchema);
