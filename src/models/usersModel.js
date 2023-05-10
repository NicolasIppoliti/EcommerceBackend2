import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const collectionName = 'users';

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type:String,
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
    },
    loggedBy: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
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