import mongoose from "mongoose";

let dbURI = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_NAMEs;

const connectToMongoDb = async () => {
    const options :any  = {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
    if(mongoose.connection.readyState >= 1){
        return
    }
    mongoose.connect(`${dbURI}/${dbName}`,options)
    
}
export default connectToMongoDb
