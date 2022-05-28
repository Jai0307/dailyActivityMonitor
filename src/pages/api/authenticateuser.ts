// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
import User from '../models/users';
import bcrypt from 'bcryptjs'
import connectToDatabase from './mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {

    switch (req.method) {
        case 'POST':
            return authenticateuser();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function authenticateuser() {

      const {email, password} = req.body;

      await connectToDatabase().then(async ()=>{
        await User.findOne({email: email}).then((user:any) =>{
          if(!user){
            console.log(`Login error user not found ${email}`);
            throw 'User not found';
          }
          bcrypt
            .compare(password, user.password)
            .then((isMatch: any) => {
                if (!isMatch) return res.status(200).json({ status:210, msg: 'Invalid credential' })
                const token = jwt.sign({ sub: email }, serverRuntimeConfig.secret, { expiresIn: '1h' });

                return res.status(200).json({
                  id: user.id,
                  email: user.email,
                  firstName: user.firstname,
                  lastName: user.lastname,
                  token,
                  status:200
                });
            })
        })
      }).catch((err) => {
        console.log(`Error connecting to db ${err}`);
        throw 'Unknown error';
      })
    }
}
