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
        router.get('/', paginate.middleware(20,40),this.getAll)
        router.get('/:customerID', this.getOne)
        router.post('/', customerValidator.complete(), validator, this.post);
        router.put('/', customerValidator.complete(), validator, this.put)
    }

    async getAll(req, res, next) {
        const transformOptions = {}

        const retrieveOptions = {
            skip: req.query.skip,
            limit: req.query.limit,
            page:req.query.page,
            planet: req.query.planet
        }

        try {
            const [customers,documentsCount] = await customerRepo.retrieveAll(retrieveOptions)
            
            if (!customers) { return next(HttpError.ImATeapot('Aucun client trouvé..?')) }
            
            const pageCount = Math.ceil(documentsCount / retrieveOptions.limit)
            const hasNextPage = paginate.hasNextPages(req)(pageCount)
            const pageArray = paginate.getArrayPages(req)(3,pageCount,req.query.page)

            const reponse = {
                _metadata: {
                    hasNextPage: hasNextPage,
                    page: retrieveOptions.page == 0 ? 1 : retrieveOptions.page,
                    skip: retrieveOptions.skip,
                    limit: retrieveOptions.limit,
                    totalPages: pageCount,
                    totalDocumentsCount: documentsCount
                },
                _links:{
                    firstPage:`/explorations?page=0&limit=${req.query.limit}`,
                    beforePage:pageArray[0].url,
                    thisPage:pageArray[1].url,
                    nextPage:pageArray[2].url,
                    lastPage:`/customers?page=${pageCount}&limit=${req.query.limit}`
                },
                data:customers
            }

            if(req.query.page == 1){
                delete reponse._links.beforePage
                reponse._links.thisPage = pageArray[0].url
                reponse._links.nextPage = pageArray[1].url
            }

            if(!hasNextPage){
                delete reponse._links.nextPage
                reponse._links.beforePage = pageArray[1].url
                reponse._links.thisPage = pageArray[2].url
            }

            res.status(httpStatus.OK).json(reponse)
        } catch (err) {
            return next(err)
        }
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