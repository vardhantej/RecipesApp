import express from 'express'; 
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import recipeRoutes from './routes/recipes.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';

const app= express();

dotenv.config();

app.use(bodyParser.json({limit : "30mb",extended: true}));
app.use(bodyParser.urlencoded({limit : "30mb",extended: true}));
app.use(cors()); //Allows cross origin resource sharing


app.use('/recipes',recipeRoutes);
app.use('/user',userRoutes);


app.get('/',(req,res)=>{
    res.send('Welcome to recipes app');
});

const PORT= process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>app.listen(PORT, ()=> console.log(`Server Running on port: ${PORT}`)).catch((error)=>console.log(error.message)));

