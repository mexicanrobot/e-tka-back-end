const { Router } = require('express');
const { getPool } = require('../db/database');

const customersRouter = Router();

var con = getPool();

customersRouter.get('/', (req,res) => {
    con.query('SELECT * from customers', (err,rows,fields) => {
        res.json(rows);
    })
})

customersRouter.post('/', (req,res) => {
    let customer = req.body;
    con.query(`INSERT INTO customers (customerName,
        contactLastName, contactFirstName, phone, 
        addressLine1, addressLine2, city, state, 
        postalCode, country, salesRepEmployeeNumber, 
        creditLimit) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
        customer.customerName,
        customer.contactLastName,
        customer.contactFirstName,
        customer.phone,
        customer.addressLine1,
        customer.addressLine2,
        customer.city,
        customer.state,
        customer.postalCode,
        customer.country,
        customer.salesRepEmployeeNumber,
        customer.creditLimit
    ], (error, results, fields) => {
        if(error) res.sendStatus(500);
        res.sendStatus(200);
    });
})

customersRouter.put('/', (req,res) => {
    let customer = req.body;
    con.query(`UPDATE customers SET customerName = ?,
        contactLastName = ?, contactFirstName = ?, phone = ?, 
        addressLine1 = ?, addressLine2 = ?, city = ?, state = ?, 
        postalCode = ?, country = ?, salesRepEmployeeNumber = ?, 
        creditLimit = ? WHERE customerNumber = ?`,
    [
        customer.customerName,
        customer.contactLastName,
        customer.contactFirstName,
        customer.phone,
        customer.addressLine1,
        customer.addressLine2,
        customer.city,
        customer.state,
        customer.postalCode,
        customer.country,
        customer.salesRepEmployeeNumber,
        customer.creditLimit,
        customer.customerNumber
    ], (error, results, fields) => {
        if(error) res.sendStatus(500);
        res.sendStatus(200);
    });
})

module.exports = {
    customersRouter
};