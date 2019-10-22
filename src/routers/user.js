const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const limiter = require('../middleware/rate');
const router = new express.Router();
const restcountries = require('../utils/restcountries');
const fixer = require('../utils/fixer');


router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
})

router.get('/users/data', auth, limiter, async (req, res) => {
  if (!req.query.country) {
    return res.send({
      error: 'You must provide a country!'
    })
  }

  restcountries(req.query.country, (error, { name, population, currencies, currencySign, flag } = {}) => {
    if (error) {
      return res.send({ error });
    }

    fixer(currencies,(error, currencyData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        name,
        population,
        currencies,
        currencySign,
        flag,
        exchangeRate: currencyData
      })
    })
  })
})

module.exports = router;
