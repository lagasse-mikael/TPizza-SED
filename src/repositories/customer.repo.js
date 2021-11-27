import Customer from '../models/customer.model.js';
// import objectToDotNotation from '../libs/objectToDotNotation.js';
// import dayjs from 'dayjs';

class CustomerRepository {

    create(customer) {
        return Customer.create(customer);
    }
}

export default new CustomerRepository()