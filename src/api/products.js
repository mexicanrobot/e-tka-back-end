const { Router } = require('express');
const { getPool } = require('../db/database');

const productsRouter = Router();

var con = getPool();

productsRouter.get('/', (req,res) => {
    con.query('SELECT * from products', (err,rows,fields) => {
        res.json(rows);
    })
})

productsRouter.get('/lines', (req,res) => {
    con.query('SELECT * from productlines', (err,rows,fields) => {
        res.json(rows);
    })
})

productsRouter.post('/', (req,res) => {
    let product = req.body;
    con.query(`INSERT INTO products (productName,
        productLine, productScale, productVendor, 
        productDescription, quantityInStock, buyPrice, MSRP) 
        VALUES (?,?,?,?,?,?,?,?)`,
    [
        product.productName,
        product.productLine,
        product.productScale,
        product.productVendor,
        product.productDescription,
        product.quantityInStock,
        product.buyPrice,
        product.MSRP
    ], (error, results, fields) => {
        if(error) res.sendStatus(500);
        res.sendStatus(200);
    });
})

productsRouter.put('/', (req,res) => {
    let product = req.body;
    con.query(`UPDATE products SET productName = ?,
        productLine = ?, productScale = ?, productVendor = ?, 
        productDescription = ?, quantityInStock = ?, buyPrice = ?, MSRP = ? WHERE productCode = ?`,
    [
        product.productName,
        product.productLine,
        product.productScale,
        product.productVendor,
        product.productDescription,
        product.quantityInStock,
        product.buyPrice,
        product.MSRP,
        product.productCode
    ], (error, results, fields) => {
        if(error) res.sendStatus(500);
        res.sendStatus(200);
    });
})

module.exports = {
    productsRouter
};