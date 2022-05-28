import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from './mongodb';
import DailyData from '../models/dailyactivitydata';

export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {
    await connectToDatabase().then(async ()=>{

        let email = req.body.email;

        await DailyData.find({email: req.body.email, recorddate: {$gte: req.body.startdate, $lte: req.body.enddate}}).then((data: any) =>{
            if(!data){
                return res.status(200).json({status:200, data: []});
            }
            return res.status(200).json({status:200, data: data})
        }).catch((error:any) => {
            console.log(`error ${JSON.stringify(error)}`);
            return res.status(200).json({status:210, msg:`Query failed.  ${error.message}`})
        })

    })
    .catch((error)=>{
        console.log(`error ${error}`);
        res.status(200).json({status:210, msg:`Query failed.  ${error.message}`})
    })
}