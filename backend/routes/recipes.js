const express = require('express');
const { body } = require('express-validator');
const RecipeController =  require('../controllers/RecipeController');
const handleErrorMessage = require('../middlewares/handleErrorMessage');
const router = express.Router();
const upload = require('../helpers/upload');


router.get('',RecipeController.index);
router.post('',[
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('ingredients').notEmpty().isArray({ min : 3})
],handleErrorMessage,RecipeController.store);
router.get('/:id',RecipeController.show);
router.post('/:id/upload',
    upload.single('photo'),
    body('photo').custom((value,{req})=>{
        if(!req.file) {
            throw new Error('photo is required');
        }
        // if(req.file.mimetyepe !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg') {
        //     throw new Error('photo must be image type');
        // }
        return true
    }),handleErrorMessage,
    RecipeController.upload);
router.delete('/:id',RecipeController.destroy);
router.patch('/:id',RecipeController.update);

module.exports = router;