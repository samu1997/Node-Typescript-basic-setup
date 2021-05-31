import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import * as winston from 'winston';

import { studentSchema } from "./student.schema";

const atob = require('atob');
const schema_student = mongoose.model('student', studentSchema);
const { combine, timestamp, json } = winston.format;
const logger = winston.createLogger({
    level: 'error',
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'verbose.log', level: 'verbose' })
    ]
});

// eyJlbWFpbCI6InVkZ2lyaTg4QGdtYWlsLmNvbSIsIm5hbWUiOiJzYW0iLCJpZCI6MTIzNDU2Nzg5fQ==
export class students {
    public getAllStudentData(req: Request, res: Response) {
        let token: any = req.get('Authorization');
        let auth = (token != '') ? JSON.parse(atob(token)) : null;
        if (auth != null && auth.email == "udgiri88@gmail.com") {
            schema_student.find({}, (error: any, findData) => {
                if (findData.length > 0) {
                    res.json({ status: true, message: "Students " + findData.length + " data found", data: findData });
                } else {
                    res.json({ status: false, message: "No Students data found", data: [] });
                }
            })
        } else {
            res.statusCode = 401;
            res.json({ status: false, message: "You are Not Authorized to do this operation. Please contact your Admin", data: [] });
        }
    }

    public addStudentData(req: Request, res: Response) {
        let reqBody: any = new schema_student(req.body);
        let token: any = req.get('Authorization');
        let auth = (token != '') ? JSON.parse(atob(token)) : null;
        if (auth != null && auth.email == "udgiri88@gmail.com") {
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
        } else {
            res.statusCode = 401;
            res.json({ status: false, message: "You are Not Authorized to do this operation. Please contact your Admin", data: [] });
        }
    }

    public getStudentById(req: Request, res: Response) {

    }

    public getStudentByCustomField(req: Request, res: Response) {

    }

    public updateStudentData(req: Request, res: Response) {

    }

}