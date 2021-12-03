import Customer from '../models/customer.model.js';
// import objectToDotNotation from '../libs/objectToDotNotation.js';
// import dayjs from 'dayjs';

class CustomerRepository {

    retrieveAll(retrieveOptions){
        let queryAll

        if(retrieveOptions.planet != undefined)
            queryAll = Customer.find({planet:retrieveOptions.planet}).skip(retrieveOptions.skip).limit(retrieveOptions.limit).sort('-birthday')
        else
            queryAll = Customer.find().skip(retrieveOptions.skip).limit(retrieveOptions.limit).sort('-birthday')

        const estimatedResQuery = Customer.estimatedDocumentCount();

        return Promise.all([queryAll,estimatedResQuery])
    }

    create(customer) {
        return Customer.create(customer);
    }
}

export default new CustomerRepository()