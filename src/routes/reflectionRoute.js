const express = require ('express');
const router = express.Router();
const reflectionController = require ('../controllers/reflectionController');




router.post('/new-reflection', reflectionController);

router.get('/new-reflection', reflectionController);

router.get('/reflection-saved', reflectionController);

router.get('/my-reflections', reflectionController);

module.exports = router;