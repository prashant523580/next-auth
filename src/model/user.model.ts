import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    firstname :{
        type : String,
        required: true
    },
    lastname :{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        
    },
    password: {
        type: String,
        required: true
    }
}
)
// userSchema.methods.comparePassword = async function(password : any){
//     return await CryptoJS.AES.decrypt(password,this.password).toString(CryptoJS.enc.Utf8)
// }
// mongoose.models  = {}
// const User = mongoose.model("User", userSchema);
export default mongoose.models.User || mongoose.model("User", userSchema)