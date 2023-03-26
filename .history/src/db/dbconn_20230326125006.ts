import mongoose from "mongoose";


const connectToMongoDb = async () => {
    const options :any  = {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
    if(mongoose.connection.readyState >= 1){
        return
    }
    mongoose.connect("mongodb+srv://admin:admin@cluster0.urmjmrf.mongodb.net/nextauth",options)
    
}
export default connectToMongoDb