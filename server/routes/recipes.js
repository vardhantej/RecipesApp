import express from 'express';

import {getRecipesByName,getRecipesByIngredient,createRecipe,deleteRecipe,updateRecipe,getAllRecipes} from '../controllers/recipes.js';
import auth from '../middleware/auth.js';

const router=express.Router();

router.get('/all',auth,getAllRecipes);
router.get('/name',auth,getRecipesByName);
router.get('/ingredient',auth,getRecipesByIngredient);
router.post('/create',auth,createRecipe);
router.post('/delete',auth,deleteRecipe);
router.patch('/update/:keyWord',auth,updateRecipe);

export default router;