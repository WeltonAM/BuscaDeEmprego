const express = require('express');
const router  = express.Router();
const Job     = require('../models/Job');


// rota de testes
router.get('/test', (rep, res) => {
    res.send('Deu certo');
});


//detalhe da vaga
router.get('/view/:id', (req, res) => Job.findOne({
    where: {id: req.params.id}
    }).then(job => {
        res.render('view', {
            job
        });
    }).catch(err => console.log(err)));

// form da vaga de envio
router.get('/add', (req, res) => {
    res.render('add');
});

// adicionar Job via Post
router.post('/add', (req, res) => {
    let {title, salary, description, company, email, new_job} = req.body;

    //inserir dados no sistema
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));

});

module.exports = router