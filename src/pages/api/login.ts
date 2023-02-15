import User from "@/model/user.model";
import { NextApiRequest, NextApiResponse } from "next";
import CryptoJs from "crypto-js";
import connectToMongoDb from "@/db/dbconn";
import jwt from "jsonwebtoken";
connectToMongoDb()
const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method == "POST") {
        try {
            let { email, password } = req.body;
            console.log(req.body)
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    message: "Invalid credentials",
                    success: false
                })
            } else {

                let token = jwt.sign({user}, process.env.JWT_SECRET, {
                    expiresIn: "1d"
                })
                let dcryptPassword = CryptoJs.AES.decrypt(user.password, process.env.AES_SECRET_KEY).toString(CryptoJs.enc.Utf8)

                if (password == dcryptPassword) {

                    res.status(200).json({
                        user,
                        token,
                        success: true,
                        message: 'login successfully.'
                    })

                }
            }
        } catch (error) {
            res.status(422).json({
                success: false,
                message: "Somethings went wrong."
            })
        }
    }
}

export default handler;