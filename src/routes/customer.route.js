import express from 'express';
import paginate from 'express-paginate'
import HttpError from 'http-errors';
import httpStatus from 'http-status';
//import customerRepo from '../repositories/customer.repo.js'

const router = express.Router()

class CustomersRoutes {
    constructor(){
        router.get('/',this.getAll)
        router.get('/:customerID',this.getOne)
    }

    getAll(req,res,next){
        console.log("get all");
        res.status(httpStatus.OK).json("Get All")
    }
    
    getOne(req,res,next){
        // Je sais pas c'est qui C , mais yeah , c'est a toi de jouer!!!
        console.log("get one");
        res.status(httpStatus.OK).json("Get One")
    }
}

new CustomersRoutes()

export default router