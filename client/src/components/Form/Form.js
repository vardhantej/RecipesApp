import React, {useState,useEffect} from 'react';
import useStyles from './styles';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import * as api from '../../api/index.js';

export default function Form({editRecipe,setEditRecipe,editClick,setEditClick}) {
    
    const [recipeData,setRecipeData]=useState({
        name: '',
        description:'',
        ingredients:[],
        selectedFile:''
    });
    
    const classes=useStyles();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        

        try {
            if(editRecipe.name===''){
                await api.createRecipe(recipeData);
                clear();
            }
            else{
                await api.updateRecipe(editRecipe.name,editRecipe);
                clear();
            }

        } catch (error) {
            console.log(error);
        }

       
    }
    
    const clear =()=>{
       
        setRecipeData({
            name: '',
            description:'',
            ingredients:[],
            selectedFile:''
        });

        setEditRecipe({
            name: '',
            description:'',
            ingredients:[],
            selectedFile:''
        });

        
    }
    
    
    
    
    
    
    
    return (
        
            <Paper className={`${classes.paper}`}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant='h6'>{editRecipe.name!==''?'Edit':'Create'} a Recipe</Typography>
                    <TextField  name="name"  variant="outlined"  label="Name"  fullWidth value={editRecipe.name!==''?editRecipe.name:recipeData.name} onChange={(e)=>{setRecipeData({...recipeData,name: e.target.value})}}/>   
                    <TextField  name="description"  variant="outlined"  label="Description"  fullWidth value={editRecipe.name!==''?editRecipe.description:recipeData.description} onChange={(e)=>{setRecipeData({...recipeData,description: e.target.value});setEditRecipe({...editRecipe,description:e.target.value})}}  />
                    <TextField  name="ingredients"  variant="outlined"  label="Ingredients"  fullWidth value={editRecipe.name!==''?editRecipe.ingredients:recipeData.ingredients} onChange={(e)=>{setRecipeData({...recipeData,ingredients: e.target.value.split(',')});setEditRecipe({...editRecipe,ingredients: e.target.value.split(',')})}}/>
                    <div className={classes.fileInput}>
                        <FileBase type="file" multiple={false} onDone={({base64})=> {setRecipeData({...recipeData,selectedFile:base64});setEditRecipe({...editRecipe,selectedFile:base64})}}/>
                    <div></div>
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                        <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
                    </div>
                </form>
            </Paper>
        
    )
}
