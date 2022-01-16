import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './styles';
import * as api from '../../api/index.js';

export default function Recipe({editClick,setEditClick,editRecipe,setEditRecipe,filteredRecipes,setFilteredRecipes,recipe,deleteClick,setDeleteClick,deleteRecipeName,setDeleteRecipeName}) {
    
    const classes=useStyles();
    
    const deletePost= ()=>{
        setDeleteRecipeName(recipe.name);
        setDeleteClick(!deleteClick);
        setFilteredRecipes(filteredRecipes.filter((filteredRecipe)=> filteredRecipe.name!==recipe.name));
    
        
    }
    
    const updatePost=()=>{
        setEditRecipe(recipe);
        setEditClick(!editClick);
        
    }
    
    return (
        
        <Card className={classes.card}>
            <CardMedia className={classes.media}  title={recipe.name} image={recipe.selectedFile}/>

            <div className={classes.overlay2}>
                    <Button style={{color:'white'}} size="small" onClick={updatePost} >
                        <MoreHorizIcon fontSize="default" />
                    </Button>
            </div>

            <a className='dataItem' href={`/home/${recipe.name}`} target="_blank"><Typography className={classes.title} variant="h5" gutterBottom>{recipe.name}</Typography></a>
            <Typography className={classes.title} variant="h7">Ingredients:</Typography>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{recipe.ingredients.map((ingredient)=>`${ingredient} `)}</Typography>
            </div>

            

            <Typography className={classes.title} variant="h7">Recipe description/steps:</Typography>

            <CardContent>
                <Typography variant="body2" color="textSecondary" componenet="p" gutterBottom>{recipe.description}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={deletePost}>
                        <DeleteIcon fontSize="small" />
                        Delete
                </Button>

            </CardActions>
            


        </Card>
    )
}
