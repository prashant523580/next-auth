// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDatabase from '@/lib/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import * as mongoDB from "mongodb";
import connectToMongoDb from '@/db/dbconn';
import User from '@/model/user.model';
import Cryptojs from "crypto-js";
import jwt from "jsonwebtoken";
connectToMongoDb();
type Data = {
  name?: string,
  email?: string
}
interface ResponseType {
  user?: Data[],
  success?: boolean
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // let {clientPromise} = await connectToDatabase();
  // let client = await clientPromise;
  // let db : any  = client?.db("nextauth")
  // let user = await db.collection("users").insertOne({
  //   name:"user",
  //   email: "user@gmail.com"
  // });
  // console.log(req.method)
  if (req.method == "POST") {
    try {

      let { firstname, lastname, email, phone, password } = req.body;
      // console.log(firstname, lastname,phone)
      let user_existed = await User.findOne({
        email
      });
      // console.log(user_existed)
      if (user_existed) {
        res.status(400).json({
          success: false,
          message: "user already existed.",
        })
      } else {
        let user = await new User({
          firstname,
          lastname,
          email,
          phone,
          password: Cryptojs.AES.encrypt(password,process.env.AES_SECRET_KEY).toString()
        }).save();
        let token = jwt.sign({user}, process.env.JWT_SECRET, {
          expiresIn: "1d"
      })
        res.status(201).json({
          success: true,
          token,
          message: "user registered successfully..",
          user
        })
      }
    } catch (error : any) {
      res.status(422).json({
        success: false,
        error
      })
    }
  }
}
