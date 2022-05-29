import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from './mongodb';
import Fields from '../models/fields';

export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {
    await connectToDatabase().then(async ()=>{

        let fields = new Fields({
          email: req.body.email,
          monitor: req.body.monitor,
          field1Name: req.body.field1,
          field2Name: req.body.field2,
          field3Name: req.body.field3,
          field4Name: req.body.field4,
          field5Name: req.body.field5,
          field6Name: req.body.field6,
          field7Name: req.body.field7,
          field8Name: req.body.field8,
          field9Name: req.body.field9,
          field10Name: req.body.field10,
          field11Name: req.body.field11,
          field12Name: req.body.field12,
          field13Name: req.body.field13,
          field14Name: req.body.field14,
          field15Name: req.body.field15,
          field16Name: req.body.field16,
          field17Name: req.body.field17,
          field18Name: req.body.field18,
          field19Name: req.body.field19,
          field20Name: req.body.field20,
          dependent: req.body.dependent,
        });

        await Fields.findOne({email: req.body.email, monitor:req.body.monitor}).then(async (userfields: any) => {
            if(userfields){
                userfields.field1Name = req.body.field1;
                userfields.field2Name = req.body.field2;
                userfields.field3Name = req.body.field3;
                userfields.field4Name = req.body.field4;
                userfields.field5Name = req.body.field5;
                userfields.field6Name = req.body.field6;
                userfields.field7Name = req.body.field7;
                userfields.field8Name = req.body.field8;
                userfields.field9Name = req.body.field9;
                userfields.field10Name = req.body.field10;
                userfields.field11Name = req.body.field11;
                userfields.field12Name = req.body.field12;
                userfields.field13Name = req.body.field13;
                userfields.field14Name = req.body.field14;
                userfields.field15Name = req.body.field15;
                userfields.field16Name = req.body.field16;
                userfields.field17Name = req.body.field17;
                userfields.field18Name = req.body.field18;
                userfields.field19Name = req.body.field19;
                userfields.field20Name = req.body.field20;
                userfields.dependent = req.body.dependent;
                // console.log(`userfields ${JSON.stringify(userfields)}`);
                await userfields.update(userfields).then((result:any)=>{
                    console.log(`result1 ${JSON.stringify(result)}`);
                    return res.status(200).json({status:200, msg:"field names updates"})
                })
            }else{
                await fields.save().then((result: any) =>{
                    // console.log(`result ${JSON.stringify(result)}`);
                    return res.status(200).json({status:200, msg:"field names updates"})
                }).catch((error:any) => {
                    console.log(`error ${JSON.stringify(error)}`);
                    return res.status(200).json({status:210, msg:`Failed to save field names.  ${error.message}`})
                })
            }
        }).catch((error:any) => {
            console.log(`error ${error}`);
            res.status(200).json({status:210, msg: 'Failed to save field names.'})
        })

    })
    .catch((error:any)=>{
        console.log(`error ${error}`);
        res.status(200).json({status:210, msg: 'Failed to save field names.'})
    })
}