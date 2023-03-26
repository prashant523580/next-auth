import mongoose from "mongoose";

let dbURI = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_NAMEs;
let clientPromise; 
const connectToMongoDb = async () => {
    const options :any  = {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
    if(mongoose.connection.readyState >= 1){
        return
    }
    clientPromise = mongoose.connect(`${dbURI}/${dbName}`,options)
    
}
export default connectToMongoDb