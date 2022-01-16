import  mongoose  from 'mongoose';
import Recipe from '../models/recipe.js';



export const getAllRecipes=async (req,res)=>{

    try {
        const recipes=await Recipe.find({});
        res.status(200).json(recipes);
    } catch (error) {
        res.status(404).json({message: error.message});
    }

}



export const getRecipesByName= async (req,res)=>{
    
    const keyWord=req.body.keyWord;
    
    try {
       
        const recipes= await Recipe.find({name:keyWord});
        res.status(200).json(recipes); // json() sends a JSON response
            
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getRecipesByIngredient=async (req,res)=>{

    const keyWord=req.body.keyWord;

    try {
        
        const recipes=await Recipe.find({ingredients:keyWord});
        res.status(200).json(recipes);

    } catch (error) {
        res.status(404).json({message: error.message});
    }


}

export const createRecipe=async (req,res)=>{

    const recipe=req.body;

    const newRecipe=new Recipe({...recipe});

    try {

        await newRecipe.save();
        res.status(201).json(newRecipe);
        
    } catch (error) {
        res.status(409).json({message: error.message}); //the requested resource is not in the expected state, or the result of processing the request would create a conflict within the resource.
    }


}

export const deleteRecipe=async (req,res)=>{
    
    const keyWord=req.body.keyWord;
    await Recipe.deleteOne({name:keyWord});
    res.json({message: 'Recipe deleted successfully'});
    
}

export const updateRecipe=async (req,res)=>{

    const {keyWord}=req.params;
    const recipe=req.body;


    if(!Recipe.exists({name:keyWord})){
        return res.status(404).send('No recipe with that name');
    }

    const updatedRecipe=await Recipe.findOneAndUpdate({name:keyWord},{...recipe});

    res.json("updated successfully");

}