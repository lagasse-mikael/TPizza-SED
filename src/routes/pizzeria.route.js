import express from 'express';
import paginate from 'express-paginate'
import HttpError from 'http-errors';
import httpStatus from 'http-status';
import pizzeriaRepo from '../repositories/pizzeria.repo.js'

const router = express.Router()

class PizzeriasRoutes {
    constructor(){
        router.get('/',this.getAll)
        router.get('/:pizzeriaID',this.getOne)
    }

    getAll(req,res,next){
        // Je sais pas c'est qui B , mais c'est a toi lol
        console.log("get all");
        res.status(httpStatus.OK).json("Get All")
    }
    
    async getOne(req,res,next){
        const pizzID = req.params.pizzeriaID
        console.log(`Get One - Pizzeria - ID : ${pizzID}`);
        try{
            const reponse = await pizzeriaRepo.retrieveByID(pizzID)
            if(!reponse){
                return next (HttpError.NotFound("Ca existe pas c'te pizzeria là!"))
            }

            res.status(httpStatus.OK).json(reponse)
        }catch(err){
            return next(err)
        }
    }
}

new PizzeriasRoutes()

export default router