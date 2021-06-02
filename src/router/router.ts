import {Request, Response} from "express";
import { CRUDRouter } from '../crud/crud.router';
import { students } from '../more-function/student/student';
import { teachers } from '../more-function/teacher/teacher';
export class Routes { 

    public crudController: CRUDRouter = new CRUDRouter();
    public studentsController: students = new students();
    public teachersController: teachers = new teachers();

    public routes(app:any): void {   
        app.route('/').get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        // CRUD 
        app.route('/crud')
        .get(this.crudController.findall)
        .post(this.crudController.addnewMovie)
        .put(this.crudController.updateMovie)
        .delete(this.crudController.deleteMovie);

        // Student Routes
        // app.route('/student/addMockData').post(this.studentsController.addMockData);
        app.route('/student/getAllStudent').post(this.studentsController.getAllStudentData);
        app.route('/student/getStudentById').post(this.studentsController.getStudentById);
        app.route('/student/getStudentByCustomField').post(this.studentsController.getStudentByCustomField);
        app.route('/student/addStudent').post(this.studentsController.addStudentData);

        // Teachers Routes
        app.route('/teacher/addMockData').post(this.teachersController.addMockData);
        app.route('/teacher/getAllTeachers').post(this.teachersController.getAllteachersData);
    }
}