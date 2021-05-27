const { Router } = require('express');
const { getPool } = require('../db/database');

const ordersRouter = Router();

var con = getPool();

ordersRouter.get('/', (req,res) => {
    con.query('SELECT * from orders', (err,rows,fields) => {
        res.json(rows);
    })
})

ordersRouter.post('/', (req,res) => {
    let order = req.body;
    con.query(`INSERT INTO orders (orderDate,
        requiredDate, shippedDate, status, 
        comments, customerNumber)
        VALUES (?,?,?,?,?,?)`,
    [
        order.orderDate,
        order.requiredDate,
        order.shippedDate,
        order.status,
        order.comments,
        order.customerNumber
    ], (error, results, fields) => {
        if(error) res.sendStatus(500);
        res.sendStatus(200);
    });
})

ordersRouter.put('/', (req,res) => {
    let order = req.body;
    con.query(`UPDATE orders SET orderDate = ?,
        requiredDate = ?, shippedDate = ?, status = ?, 
        comments = ?, customerNumber = ? WHERE orderNumber = ?`,
    [
        order.orderDate,
        order.requiredDate,
        order.shippedDate,
        order.status,
        order.comments,
        order.customerNumber,
        order.orderNumber
    ], (error, results, fields) => {
        if(error) res.sendStatus(500);
        res.sendStatus(200);
    });
})

module.exports = {
    ordersRouter
};