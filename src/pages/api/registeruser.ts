import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';
import User from '../../models/users'
import bcrypt from 'bcryptjs'
import logger from '../../utils/logger'
import connectToDatabase from './mongodb';
import { sendEmailToAdmin } from '../../utils/nodeSendEmail';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {
  const {email, password, verificationcode, firstname, lastname, address, phone, publickey} = req.body;
    logger.info(`registering user: ${email}, code: ${verificationcode}, name:${firstname} ${lastname}, address: ${address}, phone:${phone}`);

    await connectToDatabase().then(async ()=>{
      
        await User.findOne({ email: req.body.email.toLowerCase() }).then(async (user: any) => {
          if (!user) {
            return res.status(200).json({status:210,
              msg: 'Please request email verification code.',
            })
          }
          if (user.verified) {
            logger.info('DAMUSA user already verified: ')
            return res.status(200).json({status:210, msg: 'This account is already active'})
          }
      
          if (user.verificationcode == req.body.verificationcode) {
            await bcrypt.genSalt(10, async (err, salt) => {
              await bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err
                user.password = hash
                user.firstname = firstname
                user.lastname = lastname
                user.admin = false
                user.role = 'client'
                user.phonenumber = phone
                user.verified = true
                user.verificationcode = ''
                user.address = address
                user.solpublickey = publickey;
                user
                  .updateOne(user)
                  .then(async (r: any) => {
                    logger.info(`DAMUSA registration successful: ${user.email}`)
                    let subject: string = 'New account created'
                    let message: string = `${user.email}<br>${user.firstname}<br>${user.phonenumber}`
                    await sendEmailToAdmin(subject, message)

                    const token = jwt.sign({ sub: user.email }, serverRuntimeConfig.secret, { expiresIn: '1h' });

                    let userinfo = {
                      id: user.id,
                      email: user.email,
                      firstName: user.firstname,
                      lastName: user.lastname,
                      role: user.role,
                      token
                    };
                    return res.status(200).json({status:200, msg:`Registration successful`, user: userinfo})
                  })
                  .catch((err: any) => {
                    logger.info(`DAMUSA error saving user: ${err}`)
                    return res.status(200).json({status:210, msg:`Registration failed ${err}`})
                  })
              })
            })
          } else {
            logger.info('Invalid verification code')
            return res.status(200).json({status:210, msg:'Verification code is incorrect.'})
          }
        })

    })
    .catch((error)=>{
        logger.info(`db error ${error}`)
        return res.status(200).json({status:210, msg: 'failed'})
    })
}