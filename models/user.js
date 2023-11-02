import {Schema,models,model} from 'mongoose';
const userScehma = new Schema({
    email: {
        type: String,
        unique: [true, "email invalid , it must unique"],
        required:[true,"email is required "]
    },
    username: {
        type: String,
        unique: [true, "user name invalid , it must unique"],
        required:[true,"user name is required "]
    },
    image: {
        type:String
    }

})

export const User = models.User || model("User",userScehma)