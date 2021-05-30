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
        // .post(this.sampleController.addNewContact);

        // Contact detail
        // app.route('/login')
        // .post(this.sampleController.getLogin)
        // .get(this.sampleController.getContactWithID)
        // .put(this.sampleController.updateContact)
        // .delete(this.sampleController.deleteContact)

        // app.route('/FSsearch')
        // .post(this.sampleController.FSsendRequest)
    }
}