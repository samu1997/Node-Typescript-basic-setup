import {Request, Response} from "express";
import { mongooseRouter } from '../mongoose-route/mongoose.router';

export class Routes { 

    public sampleController: mongooseRouter = new mongooseRouter() 

    public routes(app:any): void {   
        app.route('/').get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        // Contact 
        app.route('/mongoose')
        .get(this.sampleController.findall)
        .post(this.sampleController.addnewMovie)
        .put(this.sampleController.updateMovie)
        .delete(this.sampleController.deleteMovie);
    }
}