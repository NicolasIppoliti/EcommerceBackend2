import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const collectionName = 'users';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }},
    {
        timestamps: true,
    }
);

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const usersModel = mongoose.model(collectionName, userSchema);

export default usersModel;