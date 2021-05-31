
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';

import { sampleSchema } from "./mongoose.schema";

const schema_movie = mongoose.model('movie', sampleSchema);
export class mongooseRouter {
    public findall(req: Request, res: Response) {
        schema_movie.find({}, (err, aaa: any) => {
            res.json({ status: true, data: aaa });
        })
    }

    public addnewMovie(req: Request, res: Response) {
        let newBody: any = new schema_movie(req.body);
        schema_movie.find({ name: newBody.name }, (err, db_res: any) => {
            if (db_res.length == 0) {
                newBody.save((error: any, DB_data: any) => {
                    if (error) {
                        res.send(error);
                    }
                    res.json({ status: true, data: DB_data });
                });
            } else {
                res.json({ status: false, message: "Data Already Present" });
            }
        });
    }

}