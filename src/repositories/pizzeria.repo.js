import Pizzeria from '../models/pizzeria.model.js';
// import objectToDotNotation from '../libs/objectToDotNotation.js';
// import dayjs from 'dayjs';

class PizzeriaRepository {

    retrieveAllBySpeciality(retrieveOptions) {

        let speci = `${retrieveOptions.speciality}`
        const retrieveQuery = Pizzeria.find()
        .skip(retrieveOptions.skip).limit(retrieveOptions.limit)
        .where('chef.speciality').equals(retrieveOptions.speciality)
        .sort('chef.name')
        const countQuery = Pizzeria.find({'chef.speciality':retrieveOptions.speciality}).count();
        
        return Promise.all([retrieveQuery, countQuery]);


    }

    retrieveAll(retrieveOptions) {

        const retrieveQuery = Pizzeria.find()
            .skip(retrieveOptions.skip).limit(retrieveOptions.limit)
            .sort('chef.name')
        const countQuery = Pizzeria.countDocuments();

        return Promise.all([retrieveQuery, countQuery]);


    }


    retrieveByID(id) {
        const retrieveResponse = Pizzeria.findById(id)

        return retrieveResponse
    }
}

export default new PizzeriaRepository()
