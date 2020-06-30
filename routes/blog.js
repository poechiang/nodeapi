import express from 'express';


const router = express.Router();


router.get('/list', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
