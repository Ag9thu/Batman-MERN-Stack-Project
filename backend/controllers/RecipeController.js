

const Recipe = require("../models/Recipe");
const mongoose = require('mongoose');
const removeFile = require('../helpers/removeFile');

const RecipeController = {
     index : async (req,res) => {
        let limit = 6; 
        let page = req.query.page || 1;


        let recipes = await Recipe
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({createdAt : -1 });

        let totalrecipes = await Recipe.countDocuments();
        let totalPages = Math.ceil(totalrecipes/limit)

        let links = {
            nextPage : page==totalPages ? false : true,
            prevPage : page==1 ? false : true,
            currentPage : page ,
            looplinks : []
            }
        
        for(let i = 0; i <totalPages; i++) {
            let number = i+1
            
            links.looplinks.push({number})
        }
        console.log (links)

        
        

            
        let response = {
            links,
            data : recipes
        }
        return res.json(response);
    },
    store : async (req,res) => {
        const {title,description,ingredients} = req.body;
        const recipe = await Recipe.create({
            title,
            description,
            ingredients
        });
        return res.json(recipe);
    },
    show : async (req,res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'not a valid id'});
            }
            let recipe = await Recipe.findById(id);
            if(!recipe) {
                return res.status(404).json({ msg : 'recipe not found'});
            }
            return res.json(recipe);
        }catch(e) {
            return res.status(500).json({ msg : 'server error'});
        }
    },
    destroy :async (req,res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'not a valid id'});
            }
            let recipe = await Recipe.findByIdAndDelete(id);
            await removeFile(__dirname + '/../public' + recipe.photo)
            if(!recipe) {
                return res.status(404).json({ msg : 'recipe not found'});
            }
            return res.json(recipe);
        }catch(e) {
            return res.status(500).json({ msg : 'server error'});
        }
    },
    update : async (req,res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'not a valid id'});
            }
            let recipe = await Recipe.findByIdAndUpdate(id, {
                ...req.body // title : "updated title value"
            });
            // update and delete photo in recipe
            await removeFile(__dirname + '/../public' + recipe.photo)





            
            if(!recipe) {
                return res.status(404).json({ msg : 'recipe not found'});
            }
            return res.json(recipe);
        }catch(e) {
            return res.status(500).json({ msg : ' server error'});
        }
    },
    upload : async (req,res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'not a valid id'});
            }
            let recipe = await Recipe.findByIdAndUpdate(id, {
                photo : '/'+req.file.filename // title : "updated title value"
            });
            if(!recipe) {
                return res.status(404).json({ msg : 'recipe not found'});
            }
            return res.json(recipe);
            
        }catch(e) {
            console.log(e)
            return res.status(500).json({ msg : 'internet server error'});
        }
    },
};

module.exports = RecipeController;
