const router = require('express').Router();
const mongoose = require('mongoose');
const Movie = require('../models/Movie.model');

//all movies
router.get('/', (req, res) => {
    Movie.find()
    .then((dbResponse) => {
        console.log('Database response:', dbResponse);
        res.render('movies.hbs', {
            movies: dbResponse,
            css: 'movies.css'
        });
    })
    .catch((e) => console.log(e));
});


//one movie
router.get('/:id', (req, res, next) => {
    console.log(req.params);
    const isValidId = mongoose.isValidObjectId(req.params.id);
    const id = req.params.id;
    if (isValidId) {
        Movie.findById(id)
        .then((movie) => {
            console.log(movie);
            res.render('oneMovie.hbs', {
                movie: movie,
                css: 'movies.css'
            });
        })
        .catch((e) => console.error(e));
    } else {
        next();
    }
});


module.exports = router;