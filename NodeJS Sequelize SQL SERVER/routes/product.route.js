const productController = require('../controllers/product.controller');
const isAuth = require('../middleware/is-auth')
var router = require('express').Router();

router.post('/', isAuth, productController.create);

router.get('/', productController.findAll);

router.get('/:id', productController.find);

router.put('/editProduct/:id', isAuth, productController.update);

router.delete('/:id', isAuth, productController.delete);

module.exports = router;