const request = require('request')
const fixer = require('./fixer')


const restcountries = (countryName, callback) => {
  const url = `https://restcountries.eu/rest/v2/name/${countryName}`
  request({url, json: true}, (error, { body } ) => {
    if (error) {
      callback('Unable to connect to the web service!', undefined)
    } else if (body.status === 404) {
      callback('Unable to find country!', undefined)
    } else {
      callback(undefined, {
        name: body[0].name,
        population: body[0].population,
        currencies: body[0].currencies[0].code
      })
    }
  })
}

module.exports = restcountries
