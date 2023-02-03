const express = require('express');
const mysql = require('mysql');
const Joi = require('joi');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    //password: '',
    database: 'meteori'
});

const sema = Joi.object().keys( {
    datum: Joi.date().required(),
    vreme: Joi.required(),
    mesto: Joi.string().trim().min(2).max(20).required(),
    magnituda: Joi.number().max(5).min(-10).required()
});

const  rtr = express.Router();
rtr.use(express.json());

//citanje svih
rtr.get('/meteori',((req, res) => {
    pool.query('select * from meteors',(err, rows)=>{
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
}));

//citanje jednog
rtr.get('/meteor/:id', ((req, res) => {
    let query = 'select * from meteors where id = ?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows) => {
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
}));

//dodavanje novog
rtr.post('/meteori', ((req, res) => {
    let { error } = sema.validate(req.body)

    if(error)
        res.status(400).send(error.details[0].message);
    else {
        let query = 'insert into  meteors (datum, vreme, mesto,magnituda) values (?,?,?,?)';
        let formated = mysql.format(query, [req.body.datum, req.body.vreme, req.body.mesto, req.body.magnituda]);

        pool.query(formated, (err,response)=>{
            if(err)
                res.status(500).messages(err.sqlMessage);
            else {
                query = 'select * from meteors where id = ?';
                formated = mysql.format(query, [response.insertId])

                pool.query(formated, (err,rows) => {
                    if(err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                })
            }
        });
    }
}));

//izmena
rtr.put('/meteor/:id', (req, res) => {
    let {error} = sema.validate(req.body)
    if(error)
        res.status(400).send(error.details[0].message);
    else {
        let query = 'update meteors set datum=?, vreme=?, mesto=?, magnituda=? where id=?';
        let formated = mysql.format(query, [req.body.datum, req.body.vreme, req.body.mesto, req.body.magnituda, req.params.id]);

        pool.query(formated, (err,response)=>{
            if(err)
                res.status(500).messages(err.sqlMessage);
            else {
                query = 'select * from meteors where id = ?';
                formated = mysql.format(query, [req.params.id])

                pool.query(formated, (err,rows) => {
                    if(err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                })
            }
        });
    }
});

//brisanje
rtr.delete('/meteor/:id', ( req,res)=>{
    let query = 'select * from meteors where id = ?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows)=>{
        if(err)
            res.status(500).messages(err.sqlMessage);
        else {
            query = 'delete from meteors where id = ?';
            formated = mysql.format(query, [req.params.id])

            pool.query(formated, (err,resp) => {
                if(err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(rows[0]);
            })
        }
    });
})

module.exports = rtr;