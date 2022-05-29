import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from './mongodb';
import Fields from '../models/fields';

export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {
    await connectToDatabase().then(async ()=>{

        let email = req.body.email;

        await Fields.find({email: req.body.email}).then((fieldnames: any) =>{
            if(!fieldnames){
                return res.status(200).json({status:210, msg: "document not found"});
            }
            return res.status(200).json({status:200, fieldnames: fieldnames})
        }).catch((error:any) => {
            console.log(`error ${JSON.stringify(error)}`);
            return res.status(200).json({status:210, msg:`Failed to get field names.  ${error.message}`})
        })

    })
    .catch((error)=>{
        console.log(`error ${error}`);
        res.status(200).json({status:210, msg: 'Failed to get field names.'})
    })
}