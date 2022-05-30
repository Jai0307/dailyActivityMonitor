import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from './mongodb';
import Fields from '../../models/fields';

export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {
    await connectToDatabase().then(async ()=>{

        console.log(JSON.stringify(req.body));

        let email = req.body.email;
        let monitor = req.body.monitor;
        let fields = new Fields({
            email: email,
            monitor: monitor
        })

        await fields.save().then((result: any) =>{
            return res.status(200).json({status:200, msg: "New monitor created"})
        }).catch((error:any) => {
            console.log(`error ${JSON.stringify(error)}`);
            return res.status(200).json({status:210, msg:`Failed to create new monitor.  ${error.message}`})
        })

    })
    .catch((error)=>{
        console.log(`error ${error}`);
        res.status(200).json({status:210, msg:`Failed to create new monitor.  ${error.message}`})
    })
}