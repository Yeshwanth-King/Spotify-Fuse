import mongoose from "mongoose";

export async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI_LOCAL).then((r) => {
        console.log("Connected Successfully ", r.connection.host)
    }).catch((err) => {
        console.log(err)
    })
}