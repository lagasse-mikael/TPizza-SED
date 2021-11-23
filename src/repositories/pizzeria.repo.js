import Pizzeria from '../models/pizzeria.model.js';
// import objectToDotNotation from '../libs/objectToDotNotation.js';
// import dayjs from 'dayjs';

class PizzeriaRepository {
    retrieveByID(id){
        const retrieveResponse = Pizzeria.findById(id)

        return retrieveResponse
    }
}

export default new PizzeriaRepository()
