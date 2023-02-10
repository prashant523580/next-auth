import User from "@/model/user.model";
import { NextApiRequest, NextApiResponse } from "next";


const handler =  async (req : NextApiRequest,res:NextApiResponse) => {
        
    if(req.method == "POST"){
        try{

            let {email,password} = req.body;
            let user = await User.findOne({email});
            if(user.password === password){
                console.log(user)
                res.status(200).json({
                    user
                })

            }
            // console.log(email, password)
        }catch(error){
            res.status(422).json({
                error
            })
        }
    }
}

export default handler;