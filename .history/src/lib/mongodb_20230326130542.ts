import { MongoClientOptions } from "mongodb";
import * as mongoDB from "mongodb";

// const MONGODB_URI  = "mongodb+srv://admin:admin@cluster0.urmjmrf.mongodb.net/?retryWrites=true&w=majority";
const MONGODB_URI  = "mongodb+srv://admin:admin@cluster0.urmjmrf.mongodb.net";
const MONGODB_NAME = "nextauth"
if(!MONGODB_URI){
    throw new Error("Define the mongodb environmental variables")
}
if(!MONGODB_NAME){
    throw new Error("Define the mmongodb name environmental variables.")
}
let cacheClient : any = null;
let cachedDb : any = null;
let options={
    useUnifiedTopology: true,
    useNewUrlParser: true,

} as MongoClientOptions ;

// let clientPromise : Promise<mongoDB.MongoClient>
let clientPromise ;
if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      cacheClient  = new mongoDB.MongoClient(MONGODB_URI, options)
      global._mongoClientPromise = cacheClient.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    cacheClient = new mongoDB.MongoClient(MONGODB_URI, options)
    clientPromise = cacheClient.connect()
  }
const connectToDatabase = async () => {
    if(cacheClient && cachedDb){
        return{
            client: cacheClient,
            db: cachedDb
        }
    }
   
    let client : mongoDB.MongoClient =new mongoDB.MongoClient(MONGODB_URI,options)
    // await client.connect();
    clientPromise =  client.connect();
    // let db : mongoDB.Db = client.db(MONGODB_NAME);
    cacheClient = client;
    // cachedDb = db;
    return{
        client: cacheClient,
        // db :cachedDb,
        clientPromise 

    }
}
export {
    clientPromise
}
export default connectToDatabase;
