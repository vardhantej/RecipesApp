import axios from 'axios';

const API =axios.create({baseURL: 'http://localhost:5000/'});


API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization =`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const getAllRecipes= () => API.get('/recipes/all');
export const getRecipesByName= () => API.get('/recipes/name');
export const getRecipesByIngredient= () => API.get('/recipes/ingredient');
export const createRecipe= (newRecipe) => API.post('/recipes/create',newRecipe);
export const deleteRecipe= (name) => API.post('/recipes/delete',{keyWord:name});
export const updateRecipe= (name,updatedRecipe) => API.patch(`/recipes/update/${name}`,updatedRecipe);

export const signIn = (formData) => API.post('/user/signin',formData);
export const signUp = (formData) => API.post('/user/signup',formData);