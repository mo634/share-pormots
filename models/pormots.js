import { Schema,model, models } from 'mongoose';

const pormotSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId
        ,ref:"User"
    },

    prompt: {
        type: String,
        required:[true,"this field is required"]
    },

    tag: {
        type: String,
        required:[true,"this field is required"]
    }
})

export const Prompot = models.Prompot || model("Prompot",pormotSchema)