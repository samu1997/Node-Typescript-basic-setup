import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { sampleSchema } from './mongoose.schema';

const sampledetall = mongoose.model('movie', sampleSchema, 'movie');

export class mongooseRouter{
    public findall (req: Request, res: Response) {
        sampledetall.find({}, (err, aaa:any) => {
            console.log(aaa, err);
            res.json({status: true, data: aaa});
        })
    }
    
}