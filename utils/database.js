// connect db

import mongoose from 'mongoose';

let isConnected = false; 

export const connectToDB = async()=> {
    // set strick query -> to retrive just fields in the  schema 
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("connected to Mdb");
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_pompots",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected=true


    } catch (error) {
        console.log("error to connect to db",error)
    }

}