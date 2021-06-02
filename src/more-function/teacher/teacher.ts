import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import * as winston from 'winston';

import { teacherSchema } from "./teacher.schema";

const dummyjson = require('dummy-json');
const atob = require('atob');
const schema_teacher = mongoose.model('teacher', teacherSchema);
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
export class teachers {
    public getAllteachersData(req: Request, res: Response) {
        let token: any = req.get('Authorization');
        let auth = (token != '') ? JSON.parse(atob(token)) : null;
        authorization(auth).then((data) => {
            console.log("25", data);
        });
        if (auth != null && auth.email == "udgiri88@gmail.com") {
            schema_teacher.find({}, (error: any, findData) => {
                if (findData.length > 0) {
                    res.json({ status: true, message: "Teachers " + findData.length + " data found", data: findData });
                } else {
                    res.json({ status: false, message: "No Teachers data found", data: [] });
                }
            })
        } else {
            res.statusCode = 401;
            res.json({ status: false, message: "You are Not Authorized to do this operation. Please contact your Admin", data: [] });
        }
    }

    public addTeacherData(req: Request, res: Response) {
        let reqBody: any = new schema_teacher(req.body);
        let token: any = req.get('Authorization');
        let auth = (token != '') ? JSON.parse(atob(token)) : null;
        if (auth != null && auth.email == "udgiri88@gmail.com") {
            schema_teacher.find({ emailId: reqBody.emailId }, (finderror: any, findData) => {
                if (findData.length > 0) {
                    res.json({ status: false, message: "Teachers emailID data already exist.", data: [] });
                } else {
                    reqBody.save(reqBody)
                        .then((saveData: any) => {
                            logger.log({ level: 'verbose', message: saveData });
                            res.json({ status: true, message: "Teacher Data Inserted Successfully.", data: saveData });
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

    public getTeacherById(req: Request, res: Response) { }

    public getTeacherByCustomField(req: Request, res: Response) { }

    public updateTeacherData(req: Request, res: Response) { }

    public addMockData(req: Request, res: Response) {
        const template = `[ {{#repeat 10}} {"name": "{{firstName}} {{lastName}}", "emailId": "{{email}}", "age": {{int 15 35}}, "contact": [{{#repeat min=1 max=3}}{ "name": "{{firstName}} {{lastName}}", "number": {{int 7777777777 9999999999}}, "relation": "{{random 'Father' 'Brother' 'Mother' 'Sister'}}" }{{/repeat}}], "gender": "{{random 'male' 'female'}}", "classes":[ {{#repeat min=1 max=3}} { "id":"{{int 1000 99999}}", "name":"{{lorem 1}}" } {{/repeat}} ], "subjects":[{{#repeat min=2 max=5}} {"id":"{{int 1000 99999}}", "name":"{{lorem 2}}", "class":"{{lorem 1}}"} {{/repeat}}], "classTeacher": {"status":{{boolean}}, "class":"{{lorem 1}}"} } {{/repeat}} ]`;
        const result: any = dummyjson.parse(template);
        // res.json({ status: true, message: "Teachers " + JSON.parse(result).length + " data found", data: JSON.parse(result) });
        schema_teacher.insertMany(JSON.parse(result))
            .then(data => {
                res.json({ status: true })
            })
            .catch(err => {
                res.json({ status: false })
            })
    }

}

async function authorization(authkey: any) {
    if (authkey) {
        await schema_teacher.find({ email: authkey.email })
            .then((data: any) => {
                if (data.length == 0) {
                    return { status: false, roll: null };
                } else if (data[0].roll == "admin") {
                    return { status: true, roll: data[0].roll };
                }
            })
            .catch((error) => {
                return { status: false, roll: null };
            })
    } else {
        return { status: false, roll: null };
    }
}