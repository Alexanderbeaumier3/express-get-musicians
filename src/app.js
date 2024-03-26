const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 
app.get('/musicians', async (req, res, next) => {
        try {
           const musicians = await Musician.findAll(req.params);
           if (!musicians) {
            throw new Error('No musicians found');
           }
            res.json(musicians);
        } 
        catch (error) {
            next(error);
        }
    });
   
app.get ('/musicians/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const musicians = await Musician.findByPk(id);
        if (!musicians) {
            throw new Error('Musician not found');
        }
        res.json(musicians);
    } catch (error) {
        next(error);
    }
}
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/musicians', async (req, res, next) => {
    try {
        const musician = await Musician.create(req.body);
        res.json(musician);
    } catch (error) {
        next(error);
    }
});

app.put('/musicians/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const musician = await Musician.findByPk(id);
        if (!musician) {
            throw new Error('Musician not found');
        }
        await musician.update(req.body);
        res.json(musician);
    } catch (error) {
        next(error);
    }
});

app.delete('/musicians/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const musician = await Musician.findByPk(id);
        if (!musician) {
            throw new Error('Musician not found');
        }
        await musician.destroy();
        res.json({ message: 'Musician deleted successfully' });
    } catch (error) {
        next(error);
    }
}
);


module.exports = app;