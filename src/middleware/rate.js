const app = require('../app')
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 30, // limit each IP to 30 requests per windowMs
});

module.exports = limiter

