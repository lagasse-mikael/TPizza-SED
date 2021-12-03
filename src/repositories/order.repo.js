import Order from '../models/order.model.js';
// import objectToDotNotation from '../libs/objectToDotNotation.js';
// import dayjs from 'dayjs';

class OrderRepository {

    transform(order, transformOptions = { }) {
        order.customer = { href: `/${order.customer}` }
        order.pizzeria = { href: `/${order.pizzeria}` }
        
        order.pizzas = order.pizzas.map(pizza => {
            delete pizza.id
            delete pizza._id
            
            return pizza
        })
        
        order.href = `/${order.id}`
        
        delete order.id
        delete order._id

        // Calcul du prix de la pizza.
        let total = 0;
        
        order.pizzas.forEach(piz => {
            total += parseFloat(piz.price)
        })
        order.subTotal = parseFloat(total.toFixed(3))
        order.taxRate = process.env.TAX_RATE
        order.taxes = parseFloat((order.subTotal * order.taxRate).toFixed(3))
        order.total = (order.subTotal + order.taxes).toFixed(3)

        return order
    }
}

export default new OrderRepository()