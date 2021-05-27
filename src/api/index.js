const { Router } = require('express');
const { customersRouter } = require('./customers');
const { ordersRouter } = require('./orders');
const { productsRouter } = require('./products');

const apiRouter = Router();

apiRouter.use('/customers', customersRouter);
apiRouter.use('/orders',ordersRouter);
apiRouter.use('/products',productsRouter);

module.exports = {
    apiRouter
}