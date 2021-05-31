
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';

import { crudSchema } from "./crud.schema";

const schema_movie = mongoose.model('movie', crudSchema);
export class CRUDRouter {
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

    public updateMovie(req: Request, res: Response) {
        let newBody: any = req.body;
        let filter: any = { _id: newBody.id };
        let update: any = { name: newBody.name };
        schema_movie.find(filter, (err: any, db_res: any) => {
            if (db_res.length != 0) {
                schema_movie.findOneAndUpdate(filter, update, { new: true }, (error, DB_data) => {
                    if (error) {
                        res.send(error);
                    }
                    res.json({ status: true, data: DB_data });
                });
            } else {
                res.json({ status: false, message: "Data not present. Please add data and update it." });
            }
        })
    }

    public deleteMovie(req: Request, res: Response) {
        let newBody: any = req.body;
        let filter: any = { _id: newBody.id };

        schema_movie.find(filter, (err: any, db_res: any) => {
            if (db_res.length != 0) {
                schema_movie.findOneAndDelete(filter)
                    .then((DB_data) => {
                        res.json({ status: true, data: DB_data });
                    })
                    .catch((error) => {
                        res.send(error);
                    });
            } else {
                res.json({ status: false, message: "Data not present. Please add data and delete it." });
            }
        })
    }

}