import mongoose from "mongoose";


const connectToMongoDb = async () => {
    const options  = {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
    if(mongoose.connection.readyState >= 1){
        return
    }
    mongoose.connect("mongodb+srv://admin:admin@cluster0.urmjmrf.mongodb.net/nextauth",options)
    .then((con) => {
        console.log("connected to database");
    })
}
export default connectToMongoDb