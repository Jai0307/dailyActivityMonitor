import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from './mongodb';
import DailyData from '../../models/dailyactivitydata';

export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {
    await connectToDatabase().then(async ()=>{

        let email = req.body.email;
        let retrievedata:any = {
            recordDate:1,
            dependentValue: 1,
        };
        switch(req.body.fieldidx){
            case 1:
                retrievedata.field1Value = 1;
                break;
            case 2:
                retrievedata.field2Value = 1;
                break;
            case 3:
                retrievedata.field3Value = 1;
                break;
            case 4:
                retrievedata.field4Value = 1;
                break;
            case 5:
                retrievedata.field5Value = 1;
                break;
            case 6:
                retrievedata.field6Value = 1;
                break;
            case 7:
                retrievedata.field7Value = 1;
                break;
            case 8:
                retrievedata.field8Value = 1;
                break;
            case 9:
                retrievedata.field9Value = 1;
                break;
            case 10:
                retrievedata.field10Value = 1;
                break;
            case 11:
                retrievedata.field11Value = 1;
                break;
            case 12:
                retrievedata.field12Value = 1;
                break;
            case 13:
                retrievedata.field13Value = 1;
                break;
            case 14:
                retrievedata.field14Value = 1;
                break;
            case 15:
                retrievedata.field15Value = 1;
                break;
            case 16:
                retrievedata.field16Value = 1;
                break;
            case 17:
                retrievedata.field17Value = 1;
                break;
            case 18:
                retrievedata.field18Value = 1;
                break;
            case 19:
                retrievedata.field19Value = 1;
                break;
            case 20:
                retrievedata.field20Value = 1;
                break;
            default:
                retrievedata.field1Value = 1;
                break;
        }

        console.log(`retrievedata ${JSON.stringify(retrievedata)}`);


        await DailyData.find({email: req.body.email, monitor: req.body.monitor}, retrievedata) // , recorddate: {$gte: req.body.startdate, $lte: req.body.enddate}})
        .then((data: any) =>{
            // console.log(`data ${JSON.stringify(data)}`);
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