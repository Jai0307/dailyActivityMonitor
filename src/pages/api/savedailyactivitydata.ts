import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from './mongodb';
import DailyData from '../../models/dailyactivitydata';

export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {

    console.log(`req.body ${JSON.stringify(req.body)}`);

    await connectToDatabase().then(async ()=>{

        let data = new DailyData({
          email: req.body.email,
          monitor: req.body.monitor,
          field1Value: req.body.field1,
          field2Value: req.body.field2,
          field3Value: req.body.field3,
          field4Value: req.body.field4,
          field5Value: req.body.field5,
          field6Value: req.body.field6,
          field7Value: req.body.field7,
          field8Value: req.body.field8,
          field9Value: req.body.field9,
          field10Value: req.body.field10,
          field11Value: req.body.field11,
          field12Value: req.body.field12,
          field13Value: req.body.field13,
          field14Value: req.body.field14,
          field15Value: req.body.field15,
          field16Value: req.body.field16,
          field17Value: req.body.field17,
          field18Value: req.body.field18,
          field19Value: req.body.field19,
          field20Value: req.body.field20,
          dependentValue: req.body.dependent,
          recordDate: req.body.recordDate,
        });

        await data.save().then((result: any) =>{
            // console.log(`result ${JSON.stringify(result)}`);
            return res.status(200).json({status:200, msg:"daily data saved"});
        }).catch((error:any) => {
            console.log(`error ${JSON.stringify(error)}`);
            return res.status(200).json({status:210, msg:`Failed to save data.  ${error.message}`})
        })

    })
    .catch((error)=>{
        console.log(`error ${error}`);
        res.status(200).json({status:210, msg:`Failed to save data.  ${error.message}`})
    })
}