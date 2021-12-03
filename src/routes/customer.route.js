import express from 'express';
import paginate from 'express-paginate'
import HttpError from 'http-errors';
import httpStatus from 'http-status';
import customerRepo from '../repositories/customer.repo.js';
import customerValidator from '../validators/customer.validator.js';
import { PLANET_NAMES } from '../data/constants.js';
import validator from '../middlewares/validator.js';

const router = express.Router()

class CustomersRoutes {
    constructor() {
        router.get('/', this.getAll)
        router.get('/:customerID', this.getOne)
        router.post('/', customerValidator.complete(), validator, this.post);
        router.put('/', customerValidator.complete(), validator, this.put)
    }

    getAll(req, res, next) {
        console.log("get all");
        res.status(httpStatus.OK).json("Get All")
    }

    getOne(req, res, next) {
        // Je sais pas c'est qui C , mais yeah , c'est a toi de jouer!!!
        console.log("get one");
        res.status(httpStatus.OK).json("Get One")
    }

    async post(req, res, next) {
        const newCustomer = req.body;

        let planetExists = false;
        if (Object.keys(newCustomer).length === 0) {
            return next(HttpError.BadRequest('Le client ne peut pas contenir aucune donnée'));
        }

        try {
            PLANET_NAMES.forEach(p => {
                if (p === newCustomer.planet) {
                    planetExists = true;
                }
            });
            if (planetExists) {
                let addClient = await customerRepo.create(newCustomer);
                console.log(newCustomer)
                addClient = addClient.toObject({ getters: false, virtuals: false });
                //addClient = customerRepo.transform(addClient);

                if (req.query._body === 'false') {
                    res.status(201).end()
                } else {
                    res.status(201).json(addClient);
                }
            }
            else {
                return next(HttpError.BadRequest(`La planète n'existe pas`));
            }

        } catch (err) {
            return next(err);
        }


    }

    async put() {
        res.status(httpStatus.IM_A_TEAPOT)
    }
}

new CustomersRoutes()

export default router