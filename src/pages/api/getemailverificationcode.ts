import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/users'
import bcrypt from 'bcryptjs'
import connectToDatabase from './mongodb';
import { sendEmailVerificationCode } from '../../utils/nodeSendEmail';
import logger from  '../../utils/logger'

export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {

    logger.info(`Getting verification code: ", ${JSON.stringify(req.body)}`)
    var newUser: any = new User({email:req.body.email.toLowerCase()})
    var verificationcode = Math.floor(100000 + Math.random() * 900000)
    try{
        await connectToDatabase().then(async ()=>{
            await User.findOne({ email: newUser.email }).then(async (user: any) => {
            if (user) {
                if (user.verified) {
                    return res.status(200).json({status:210,
                        msg: 'Email is already registered, please login or use a different email',
                    })
                } else {
                user.verificationcode = verificationcode
                await user
                    .updateOne({ verificationcode: verificationcode })
                    .then(async () => {
                        await sendEmailVerificationCode(user.email, verificationcode)
                        return res.status(200).json({ status:200, msg: `Verification code sent to your email ${newUser.email}` })
                    })
                    .catch((err: any) => {
                        logger.info('error on saving verification code: ', err)
                        return res.status(200).json({status:210, msg:`Error: + ${err}`})
                    })
                }
            } else {
                newUser.verificationcode = verificationcode
                await newUser
                .save()
                .then(async () => {
                    logger.info('monitor user email added')
                    await sendEmailVerificationCode(newUser.email, verificationcode)
                    return res.status(200).json({ status:200, msg: `Verification code sent to your email ${newUser.email}` })
                })
                .catch((err: any) => {
                    logger.info('error on saving user')
                    return res.status(200).json({status:210, msg:`Error ${err}`})
                })
            }
        })
    })
    }catch(err){
        console.log(`error ${err}`);
        return res.status(200).json({status:210, msg:`Error ${err}`})
    }
}