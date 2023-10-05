import mongoose, { Model } from "mongoose";


export interface UserType{
    _id?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    isDeleted: boolean;
    createdAt: Date;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,"Please provide a name"]
    },
    email:{
        type: String,
        required:[true,"Please provide an email address"],
        unique: true,
    },
    password:{          // hashed password
        type: String,
        required:[true,"Please provide a password"],
    },
    isDeleted:{
        type: Boolean,
        default: false,
    },
    createdAt:{
        type: Date,
        default: new Date(),
    }
})

let User: Model<UserType>;

if (mongoose.models && mongoose.models.User) {
    User = mongoose.models.User;
} else {
    User = mongoose.model('User', userSchema);
}

export { User }