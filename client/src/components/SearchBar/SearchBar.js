import React, {useState} from 'react';
import './styles.css';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Recipe from '../Recipe/Recipe.js';



export default function SearchBar({editClick,setEditClick,editRecipe,setEditRecipe,searchWord,setSearchWord,filteredRecipes,setFilteredRecipes,placeholder,recipes,setRecipes,deleteClick,setDeleteClick,deleteRecipeName,setDeleteRecipeName}) {
    
    

    function filterRecipes(keyWord,recipes){
        var result=recipes.filter((recipe)=>{
            return recipe.name.toLowerCase()===keyWord.toLowerCase() || recipe.ingredients.find((ingredient)=>{return ingredient.toLowerCase()===keyWord.toLowerCase()});
        });

        return result;
    }

    
    const handleFilter=(e)=>{
        const keyWord=e.target.value;
        setSearchWord(keyWord);
        const result=filterRecipes(keyWord,recipes);
        
        if(keyWord===""){
            setFilteredRecipes([]);
        }
        else{
            setFilteredRecipes(result);
        }
        
    }
    
    const clearInput=()=>{
        setSearchWord('');
        setFilteredRecipes([]);
    }

    return (
        <div className='search'>
            <div className='searchInputs'>
                <input type="text" placeholder={placeholder} value={searchWord} onChange={handleFilter}/>
                <div className='searchIcon'>
                    {searchWord.length===0?<ArrowForwardIcon/>:<BackspaceIcon id="clearBtn" onClick={clearInput}/>}
                </div>
            </div>
            
            {!filteredRecipes.length?<div></div>:(
                <div className='dataResult'>
                    
                    {filteredRecipes.map((recipe)=>{
                        return <Recipe editClick={editClick} setEditClick={setEditClick} editRecipe={editRecipe} setEditRecipe={setEditRecipe} filteredRecipes={filteredRecipes} setFilteredRecipes={setFilteredRecipes} recipe={recipe} deleteClick={deleteClick} setDeleteClick={setDeleteClick} deleteRecipeName={deleteRecipeName} setDeleteRecipeName={setDeleteRecipeName}/>
                    })}
                </div>
            )
            }

        </div>
    )
}
