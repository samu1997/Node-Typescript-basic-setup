import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import * as winston from 'winston';

import { studentSchema } from "./student.schema";

const schema_student = mongoose.model('student', studentSchema);
const { combine, timestamp, json } = winston.format;
const logger = winston.createLogger({
    level: 'error',
    format: combine(
        timestamp(),
        json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'verbose.log', level: 'verbose' }),
    ]
});

export class students {

    public getAllStudentData(req: Request, res: Response) {
        schema_student.find({}, (error: any, findData) => {
            if (findData.length > 0) {
                res.json({ status: true, message: "Students " + findData.length + " data found", data: findData });
            } else {
                res.json({ status: false, message: "No Students data found", data: [] });
            }
        })
    }

    public addStudentData(req: Request, res: Response) {
        let reqBody: any = new schema_student(req.body);

        schema_student.find({ emailId: reqBody.emailId }, (finderror: any, findData) => {
            if (findData.length > 0) {
                res.json({ status: false, message: "Students emailID data already exist.", data: [] });
            } else {
                reqBody.save(reqBody)
                    .then((saveData: any) => {
                        logger.log({ level: 'verbose', message: saveData });
                        res.json({ status: true, message: "Student Data Inserted Successfully.", data: saveData });
                    })
                    .catch((saveError: any) => {
                        logger.log({ level: 'error', message: saveError });
                        res.json({ status: false, message: "Something went wrong. Please contact Admin", error: saveError });
                    })
            }
        })
    }

    public getStudentById(req: Request, res: Response) {

    }

    public getStudentByCustomField(req: Request, res: Response) {

    }

    public updateStudentData(req: Request, res: Response) {

    }

}