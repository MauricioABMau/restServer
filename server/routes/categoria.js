const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/authentication');

let app = express();

const Categoria = require('../models/categoria');

app.get('/categoria', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Categoria.find({ estado: true }, 'descripcion usuario')
        .skip(desde)
        .limit(limite)
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categoria) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            Categoria.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    categoria,
                    cuantos: conteo
                })
            })
        })
})

app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.param.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no es correcto'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    })
})

app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })
})

app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })
})

app.delete('/categoria', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Categoria Borrada'
        })
    })
})

module.exports = app;